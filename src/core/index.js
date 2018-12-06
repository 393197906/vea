const veaBuild = require("./veaBuild")
const veaCore = require("./veaCore")
const plugin = require("./plugindemo")
const assert = require("assert")
const _ = require("lodash")

module.exports = class {
    constructor() {
        this.vea = {
            build: new veaBuild(),
            core: new Proxy(new veaCore(this), {})
        }
        this.plugins = {}
        this.commonds = {}
        // 注册插件
        this.registerPlugins()
    }

    // 注册插件
    registerPlugins() {
        plugin(this.vea)
    }

    // 注册命令行
    registerCommend(name, opts, fn) {
        this.commonds = {
            ...this.commonds,
            [name]: {
                opts,
                fn
            }
        }
    }

    // 注册命令

    run(name, params) {
        assert(_.isPlainObject(this.commonds[name]), "无效的命令")
        const {fn, opts} = this.commonds[name]
        fn(params)
    }
}
