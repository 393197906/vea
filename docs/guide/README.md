# 快速上手
## 环境准备
首先得有 [node](https://nodejs.org/en/)，并确保 node 版本是 8.10 或以上。（mac 下推荐使用 [nvm](https://github.com/creationix/nvm) 来管理 node 版本）

```bash
$ node -v
8.1x
```

推荐使用 yarn 管理 npm 依赖，并[使用国内源](https://github.com/yiminghe/tyarn)（阿里用户使用内网源）。

```bash
# 国内源
$ npm i yarn tyarn -g
# 后面文档里的 yarn 换成 tyarn
$ tyarn -v

# 阿里内网源
$ tnpm i yarn @alipay/yarn -g
# 后面文档里的 yarn 换成 ayarn
$ ayarn -v
```

然后全局安装 vea，并确保版本是 1.0.0 或以上。

```bash
$ yarn global add vea
$ vea -v
1.0.0
```

## 脚手架

先找个地方建个空目录。

```bash
$ mkdir myapp && cd myapp
```

然后通过 `vea init` 初始化项目，

```bash
$ vea init vue
```
> `vea init`是`vea`提供的快速初始化项目的工具，目前支持vue项目的快速初始化。
得到目录结构
```bash
.

└── src
    └── ...
└── public
    └── ...  
└── vea.config    
└── package.json    
└── ...    
```

然后启动本地服务器，

```bash
$ vea dev
```
> 服务默认会在9001端口运行

```bash
$ vea build
```
> 打包项目到dist目录

```bash
$ vea deploy 
```
> 部署
::: tip 部署解释
需要在配置文件内设置`deployGitPath`
:::



