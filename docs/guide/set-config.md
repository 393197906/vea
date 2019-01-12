---
sidebarDepth: 2
---
# 配置
## 基础配置
### mode
* 类型：`String`
* 默认值：`[]`
* 可选值 `['vue']`

指定项目模式，默认为`vue`
::: tip 解释
不通的模式会加载不同的`插件`

例如`vue`模式会自动加载插件`vea-plugin-vue`

`React`模式会自动加载插件`vea-plugin-react`
:::


## 打包配置
### env
* 类型：`Object`
* 默认值：`{}`

根据`process.env.VEA_ENV`的值进行配置
::: tip 解释
`env`配置拥有最高的优先级
:::

### cwd
* 类型：`String`
* 默认值：`process.cwd()`

项目的基础路径，一般不用配置
### entry
* 类型：`String || Object`
* 默认值：``

项目入口配置，同webpack entry

::: tip 解释
启用模式后（即加载`vea-plugin-vue`等类似插件）会将`entry`设置为`src/index.js`，可在配置文件内覆盖
:::

### outputPath
* 类型：`String`
* 默认值：`dist`

项目出口配置，同webpack outputPath

### publicPath
* 类型：`String`
* 默认值：`/`

项目publicPath


### copyPath
* 类型：`String`
* 默认值：`public`

拷贝目录 vea会将copyPath 拷贝到打包目录

### defined
* 类型：`Object`
* 默认值：`{}`

定义项目内全局变量

### alias
* 类型：`Object`
* 默认值：`{}`

定义项目内alias

### hash
* 类型：`Boolean`
* 默认值：`true`

项目打包开启`hash`文件名

### disableDynamicImport
* 类型：`Boolean`
* 默认值：`false`

是否禁用`拆包`,开启后会将所有动态导入的文件打包成一个文件，默认`关闭`

### babel
* 类型：`Object`
* 默认值：`{}`

babel配置
::: tip 解释
`vea-plugin-vue`会提供vue的配置，也可在配置文件内覆盖其配置
:::

### cssPublicPath
* 类型：`String`
* 默认值：``

暂时没用

### browserslist
* 类型：`Array`

css 需要兼容的浏览器配置

### disableCSSModules
* 类型：`Boolean`
* 默认值：`false`

是否禁用`css modules`,默认`关闭`

### extraPostCSSPlugins
* 类型：`Array`
* 默认值：`[]`

`postCSS`插件扩展

### extraWebpackPlugins
* 类型：`Array`
* 默认值：`[]`

`webpack`插件扩展

### cssnano
* 类型：`Object`
* 默认值：`{}`

`cssnano`扩展

### cssLoaderOptions
* 类型：`Object`
* 默认值：`{}`

`cssLoaderOptions`配置

### lessLoaderOptions
* 类型：`Object`
* 默认值：`{}`

`lessLoaderOptions`配置

### sassLoaderOptions
* 类型：`Object`
* 默认值：`{}`

`sassLoaderOptions`配置

### cssModulesExcludes
* 类型：`Array`
* 默认值：`[]`

`cssModules`排除目录数组

### externals
* 类型：`String || Object`
* 默认值：`undefined`

`webpack` `externals`设置

### devtool
* 类型：`String`
* 默认值：``

`webpack` `devtool`设置

### manifest
* 类型：`Object`
* 默认值：`{}`

`webpack` `manifest`设置

### devServer
* 类型：`Object`
* 默认值：`{}`

`webpack` `devServer`设置

### eslintLoaderOptions
* 类型：`Object`
* 默认值：`null`
`eslintLoaderOptions`配置
::: tip 解释
不配置则不启用eslint检查，配置后开启
:::

### htmlTemplate
* 类型：`String`
* 默认值：``

设置`html`摸板路径

## 部署配置
### deployGitPath
* 类型：`String`
* 默认值：``

部署`git地址`设置








