# 配置文件
## vea.config.js
项目目录下的`vea.config.js`为vea的配置文件（唯一配置文件）,示例如下
```js
const path = require("path")
module.exports = {
    publicPath "/back/",
    alias: {
        "@": path.resolve(__dirname, "./src/")
    },
    externals: {
        'AMap': 'AMap',
        'AMapUI': 'AMapUI',
        'dat': 'dat'
    },
    deployGitPath: "git@gitee.com:sdyituo/youxian_front.git",
    env: {
        dev: {
            defined: {
        }
    }
}
```

