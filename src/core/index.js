const _ = require("lodash");
const path = require('path')
const veaBuild = require("./veaBuild");
const veaCore = require("./veaCore");
const veaDeploy = require("./veaDeploy");
const pluginHelp = require("../../plugin/vea-plugin-help/index");
const pluginVue = require("../../plugin/vea-plugin-vue/index");
const pluginReact = require("../../plugin/vea-plugin-react/index");
const pluginInit = require("../../plugin/vea-plugin-init/index");
const plugin = require("../../packages/vea-plugin-electron/index")
const assert = require("assert");

module.exports = class {
    constructor() {
        this.plugins = {};// 插件
        this.commonds = {};// 命令
        const build = new Proxy(new veaBuild(), {
            get: (target, name) => {
                if (typeof name !== "string") {
                    return target
                }
                // set调度
                const isSet = name.startsWith("set")
                if (isSet) {
                    return veaBuild.generateSetMethod.call(build, name)
                }
                if (name === "config") {
                    return target._getComplateConfig()
                }
                return target[name]
            },
            set: null
        });
        this.vea = {
            build,
            core: new Proxy(new veaCore(this), {
                get: (target, name) => {
                    if ([
                        "run",
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
            }),
            deploy: new Proxy(new veaDeploy(), {
                set: null
            })
        };
        // 注册插件
        this.registerPlugins(build.config)
    }

    // 注册自定义插件
    registerCustomizePlugins() {
        const {plugins = []} = this.vea.build.config;
        plugins.forEach(plugin => {
            assert(_.isArray(plugin), `$插件必须是一个数组`)
            let [pluginPath = "", pluginOption = {}] = plugin
            assert(_.isString(pluginPath), `${pluginPath} 必须是一个字符串`)
            assert(_.isPlainObject(pluginOption), `${pluginOption} 必须是一个对象`)
            pluginPath = (() => {
                if (pluginPath.indexOf("/") < 0) {
                    return require.resolve(path.resolve(process.cwd(), 'node_modules', pluginPath))
                }
                return path.isAbsolute(pluginPath) ? pluginPath : path.resolve(process.cwd(), pluginPath)
            })();
            const pluginInstance = require(pluginPath)
            assert(_.isFunction(pluginInstance), "插件实体必须返回一个函数")
            pluginInstance(this.vea, pluginOption)
        })
    }

    // 注册插件
    registerPlugins({mode}) {
        pluginHelp(this.vea)
        pluginInit(this.vea)
        mode === 'vue' ?
            pluginVue(this.vea)
            : mode === 'react' ?
            pluginReact(this.vea)
            : ""
        plugin(this.vea)
        this.registerCustomizePlugins()
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
    run(name, argv, cbObject) {
        assert(_.isPlainObject(this.commonds[name]), "无效的命令")
        const {fn, opts} = this.commonds[name]
        fn(argv, cbObject)
    }
};
