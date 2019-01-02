
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

