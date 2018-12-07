const veaBuild = require("./veaBuild");
const veaCore = require("./veaCore");
const pluginHelp = require("../plugin/vea-plugin-help")
const plugin = require("../../plugin/vea-plugin-vue/plugindemo");
const assert = require("assert");
const _ = require("lodash");

module.exports = class {
    constructor() {
        this.plugins = {}
        this.commonds = {}
        this.vea = {
            build: new veaBuild(),
            core: new Proxy(new veaCore(this), {
                get: (target, name) => {
                    if ([
                        "plugins",
                        "commonds",
                        'registerCommend'
                    ].includes(name)) {
                        if (typeof this[name] === "function") {
                            return this[name].bind(this)
                        }
                        return this[name]
                    }
                },
                set: null
            })
        }
        // 注册插件
        this.registerPlugins()
    }

    // 注册插件
    registerPlugins() {
        plugin(this.vea)
        pluginHelp(this.vea)
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

    // 执行命令
    run(name, argv) {
        assert(_.isPlainObject(this.commonds[name]), "无效的命令")
        const {fn, opts} = this.commonds[name]
        fn(argv)
    }
};
