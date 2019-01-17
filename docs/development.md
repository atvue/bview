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

### 仓库配置

代码 clone 到本地后，需要配置本地仓库的用户名和邮箱（建议配置为 gitHub 上邮箱账号和昵称），否则会使用默认全局配置

进入到本地目录下运行

```shell
➜  git config -add user.name <your_name>
➜  git config -add user.email <your_email>
```

再运行`git config -l`查看并确认修改结果

### 统一格式化配置

为了统一项目下格式和编码规范，建议使用[Visual Studio Code](https://code.visualstudio.com/)编辑器，并安装以下插件和配置：

-   插件安装（必要）：Vetur、ESLint、Prettier - Code formatter。注意 Beautify 插件和 Prettier 存在热键冲突，建议禁用。

-   工作区下 setting.json 配置， 复制以下配置，VsCode 中顶部工具栏 Code->首选项->设置 切换至工作区设置，并粘贴；也可以在本项目下创建.vscode 文件夹并增加 setting.json 文件，并粘贴。

```

{
  // .vue文件template格式化支持，并使用js-beautify-html插件
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "files.associations": {
    "*.vue": "vue"
  },
  // 配置 ESLint 检查的文件类型
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    }
  ],
  // 配置 ESLint 保存时自动修复
  "eslint.autoFixOnSave": true,
  // 编辑器保存时自动格式化
  "editor.formatOnSave": true,
  "vetur.format.options.tabSize": 4
}

```
