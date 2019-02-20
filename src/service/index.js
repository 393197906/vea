const getWebpackConfig = require("./config/index")
const dev = require("./dev")
const build = require("./build")

module.exports = class {
    constructor({config, build}) {
        this.config = config // build config
        this.build = build // build api
    }

    // 开启dev服务
    startDev() {
        const webpackConfig = getWebpackConfig(this.config)
        dev({
            webpackConfig,
            config: this.config,
            _beforeServerWithApp(app) {

            },
            beforeMiddlewares: [],
            afterMiddlewares: [],
            beforeServer: (devServer) => {
                this.build.emit(this.build.events.beforeDevServer, devServer)
            },
            afterServer: (devServer) => {
                this.build.emit(this.build.events.afterDevServer, devServer)
            },
            onCompileDone: ({isFirstCompile, stats, server}) => {
                this.build.emit(this.build.events.onDevCompileDone, {isFirstCompile, stats, server})
            },
        })
    }

    // 开启build 服务
    startBuild() {
        const webpackConfig = getWebpackConfig(this.config);
        build({
            webpackConfig,
            config: this.config,
            cwd: this.config.cwd,
            onSuccess: (state) => {
                this.build.emit(this.build.events.onBuildSuccess, state)
            },
            onFail: (state) => {
                this.build.emit(this.build.events.onBuildFail, state)
            }
        })
    }
}
