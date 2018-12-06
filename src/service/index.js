const getWebpackConfig = require("./config/index")
const dev = require("./dev")
const build = require("./build")

module.exports = class {
    constructor(config) {
        this.config = config
    }

    // 开启dev服务
    startDev() {
        process.env.NODE_ENV = 'development'
        const webpackConfig = getWebpackConfig(this.config)
        dev({
            webpackConfig
        })
    }

    // 开启build 服务
    startBuild() {
        process.env.NODE_ENV = 'production'
        const webpackConfig = getWebpackConfig(this.config)
        // console.log(webpackConfig.module.rules[0]);
        build({
            webpackConfig,
            cwd: this.config.cwd,
            onSuccess: () => {

            },
            onFail: () => {

            }
        })
    }
}
