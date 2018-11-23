# bView 组件库

## 环境准备

-   [Node.js](https://nodejs.org/en/) ，使用最新 LTS 版本
-   [Yarn](https://yarnpkg.com/zh-Hans/docs/install)，安装最新版即可

进入`bview`项目，安装依赖，执行：

```shell
➜  bview git:(dev) yarn
```

执行完毕，通过命令，启动项目：

```shell
➜  bview git:(dev) yarn start
```

文档系统服务默认端口 8022，运行后自行打开浏览器访问根目录即可看到当前组件生成的文档效果

## 开发规范

### 仓库配置

代码 clone 到本地后，需要配置本地仓库的用户名和邮箱（建议配置为 gitHub 上邮箱账号和昵称），否则会使用默认全局配置

进入到本地目录下运行

```shell
➜  git config -add user.name <your_name>
➜  git config -add user.email <your_email>
```

再运行`git config -l`查看并确认修改结果

### 组件录入

组件录入到`components`目录下，每个对外暴露使用的独立组件一个文件夹（如需组合使用的组件可放置在一个文件夹下），文件夹下必须包括以下目录文件结构：

```dir

├── __tests__
│   ├── <component_name>.test  //  测试文件
├── demo
│   ├── basic.md  //  基础demo
├── style  // 组件样式
│   ├── index.js
│   ├── index.less
├── <component_name>.vue  // 单文件组件
├── index.js
├── README.st   // 基础说明文档

```

### 组件编写规范

录入组件基础目录结构后，就可以开始愉快的开发之旅了，组件编写中有以下几点规范需要遵循：

-   组件.vue 文件中不可加入样式，所有样式必须写在`index.less`或它`@import`的 less 文件中。

-   组件.vue 文件中 methods 属性下，内部 api 命名需要以单个下划线开头`_`，可暴露给外部调用的 api 命名以字母开头

-   组件.vue 文件中 name 属性为必填项，命名规则使用首字母大写，和.vue 文件名称相同即可

-   \$emit 事件命名规范：不要使用 on 开头，驼峰命名还是-连接符？

### 文档&Demo 编写规范

components 目录下每个组件目录会生成一份文档说明，文档内容包括：README.st 内对该组件的基本说明，demo 目录下的示例，组件.vue 文件中被解析出来的 api 说明。为了规范文档输出标题层级，有以下规范需要遵守：

-   README.st 中使用最高层级的标题为 h3，即`###`
-   demo 下的示例文件中使用最高层级的标题为 h4，即`####`

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

-   default 目前支持定义字面量值(`default: 1`)，常量值(`default: TYPE_DEFAULT`，暂未实现，之后会支持解析出常量定义的值再返回)，生成值的函数(`default: ()=>{return [];}`，解析方法会尝试运行改函数，如果报错，则返回该函数体)；不支持依赖其他 prop 的默认值形式

methods:

-   单个下划线`_`命名的方法 被认为是内部方法，不会被解析返回

-   方法的描述会读取方法名上方的符合注释规范的注释内容，暂时先在注释中写清楚参数和返回

-   之后会改成解析对外方法的标准 jsdoc 格式注释，单独解析出参数和返回（方案待定）

emits:

-   所有 emits 需要写在`<script></script>`标签中，暂不支持`<template></template>`中 emit 的事件

slots:

-   支持解析具名和匿名 slot，和 slot 上方注释，slot 上绑定的其他属性将会解析出来拼接在注释描述后边

### 文档生成

文档资源在`site`目录下，基于单页应用，主要分为两个部分：

-   组件库的说明文档，统一放在 `site/modules` 目录下，之后会改成.md 格式文件，每个 md 文件生成一个单独路由和左侧一级根目录

-   组件库组件的说明文档，从`components`目录下解析`README.st`，顺序和是否引入暂时配置在`site/router/index` 中，之后改成自动读取加入和配置顺序的方式，方案待定
