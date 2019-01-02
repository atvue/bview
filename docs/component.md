
#### 基础说明文档

README.st 中需要对该组件有一个基本描述和应用场景的说明

#### demo

demo 文件夹下可包括多个 md 文件，最终每个 md 文件会生成一个示例插入到文档的`代码示例`章节下

#### API 文档

API 文档会读取组件目录下所有.vue 文件内容，静态解析获得文档内容，如果某个.vue 文件不需要对外暴露 api，文件内使用特殊 ignore 标记（暂未实现，实现后再补充）

每个.vue 文件的 API 文档包括四个部分（章节命名待定）：props, methods, emits, slots。

通用注释规范，请按以下示例编写需要被解析展示的注释内容

`// @doc xxxxxxxxx`

`// @docbegin xxxxxxxx @docend`

```js
/**
 * @docbegin ccc @docend
 */
```

props：

-   不能使用 `props:[xxx, xxx, xxx]` 简写形式，必须至少指定每个`prop`的类型

-   default 目前支持定义字面量值(`default: 1`)，常量值(`default: TYPE_DEFAULT`，暂未实现，之后会支持解析出常量定义的值再返回)，生成值的函数(`default: ()=>{return [];}`，解析方法会尝试运行该函数，如果报错，则返回该函数体)；不支持依赖其他 prop 的默认值形式

methods:

-   单个下划线`_`命名的方法 被认为是内部方法，不会被解析返回

-   方法的描述会读取方法名上方的符合注释规范的注释内容，暂时先在注释中写清楚参数和返回

-   之后会改成解析对外方法的标准 jsdoc 格式注释，单独解析出参数和返回（方案待定）

emits:

-   所有 emits 需要写在`<script></script>`标签中，暂不支持`<template></template>`中 emit 的事件

slots:

-   支持解析具名和匿名 slot，和 slot 上方注释，slot 上绑定的其他属性将会解析出来拼接在注释描述后边