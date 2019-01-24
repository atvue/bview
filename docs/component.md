#### 基础说明文档

README.st 中需要对该组件有一个基本描述和应用场景的说明

#### demo

demo 文件夹下可包括多个 md 文件，最终每个 md 文件会生成一个示例插入到文档的`代码示例`章节下

#### API 文档
标题默认最高层次为3级标题，文案说明一般分为组件说明、场景说明、代码示例和API说明。对于三级标题下的分类，可使用makdown语法的无序列表进行分类,3级标题可以作为锚点标题,以{id="input-api"}为例,为了防止id重复，id命名可加上组件前缀

顶部yml配置中，如果ignoreMenu为true，则不会出现在左侧菜单导航栏中，修改st的yml配置之后，需要重新启动npm start
顶部配置为自动生成路由配置，title命名以中文+组件名的形式配置，order为排列顺序。


API 文档会读取组件目录下所有.vue 文件内容，静态解析获得文档内容

每个.vue 文件的 API 文档包括四个部分（章节命名待定）：props, methods, emits, slots。

通用注释规范，请按以下示例编写需要被解析展示的注释内容

如果当前 API 不想对外暴露，可以使用`-@doc`标记

`// @doc xxxxxxxxx`

`// @docbegin xxxxxxxx @docend`

```javascript
export default {
    methods: {
        click() {
            // -@doc 下面的$emit API不会在文档中体现
            this.$emit('click');
        }
    }
};
```

```js
/**
 * @docbegin ccc @docend
 */
```

name：统一使用`PascalCase`命名方式，[组件名为多个单词](https://vuejs.org/v2/style-guide/index.html#Multi-word-component-names-essential)

props：

-   不能使用 `props:[xxx, xxx, xxx]` 简写形式，必须至少指定每个`prop`的类型

-   default 目前支持定义字面量值(`default: 1`)，常量值(`default: TYPE_DEFAULT`，暂未实现，之后会支持解析出常量定义的值再返回)，生成值的函数(`default: ()=>{return [];}`，解析方法会尝试运行该函数，如果报错，则返回该函数体)；不支持依赖其他 prop 的默认值形式

methods:

-   单个下划线`$_`命名的方法 被认为是内部方法，不会被解析返回

-   方法的描述会读取方法名上方的符合注释规范的注释内容，暂时先在注释中写清楚参数和返回

-   之后会改成解析对外方法的标准 jsdoc 格式注释，单独解析出参数和返回（方案待定）

emits:

-   所有 emits 需要写在`<script></script>`标签中，暂不支持`<template></template>`中 emit 的事件

-   统一使用`kebab-case`的事件名，[always use kebab-case for event names](https://vuejs.org/v2/guide/components-custom-events.html#Event-Names)

slots:

-   支持解析具名和匿名 slot，和 slot 上方注释，slot 上绑定的其他属性将会解析出来拼接在注释描述后边
