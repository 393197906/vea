const _ = require("lodash");
const veaBuild = require("./veaBuild");
const veaCore = require("./veaCore");
const pluginHelp = require("../plugin/vea-plugin-help")
const pluginVue = require("../../plugin/vea-plugin-vue/index");
const assert = require("assert");

module.exports = class {
    constructor() {
        this.plugins = {};// 插件
        this.commonds = {};// 命令
        this.vea = {
            build: new Proxy(new veaBuild(), {
                get: (target, name) => {
                    if(typeof name !=="string"){
                        return target
                    }
                    // set调度
                    const isSet = name.startsWith("set")
                    if (isSet) {
                        return veaBuild.generateSetMethod.call(target, name)
                    }
                    if(name==="config"){
                        return target._getComplateConfig()
                    }
                    return target[name]
                },
                set: null
            }),
            core: new Proxy(new veaCore(this), {
                get: (target, name) => {
                    if ([
                        "plugins",         // 已注册插件
                        "commonds",        // 已注册命名
                        'registerCommend', // 注册命令
                    ].includes(name)) {
                        if (typeof this[name] === "function") {
                            return this[name].bind(this)
                        }
                        return this[name]
                    }
                    return target[name]
                    // core
                    if (['setEntryExportsHeader', "render"].includes(name)) {
                        return target[name].bind(target)
                    }

                },
                set: null
            })
        };
        // 注册插件
        this.registerPlugins()
    }

    // 注册插件
    registerPlugins() {
        pluginVue(this.vea)
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
