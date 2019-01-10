const event = require("./event/event")
const path = require('path')
const fs = require("fs")
const assert = require("assert");
const _ = require("lodash");
const Service = require("../service");
const defaultConfig = require("../common/defaultConfig")

module.exports = class veaBuild extends event {
    /**
     * 生成配置方法
     * @param name
     * @returns {Function}
     */
    static generateSetMethod(name) {
        let configName = name.substring(3);
        configName = `${configName[0].toLowerCase()}${configName.substring(1)}`; // 转换驼峰
        assert(defaultConfig[configName], `${configName} 是一个无效的配置`);
        const configObject = defaultConfig[configName];
        return (value) => {
            assert(this._config.hasOwnProperty(configName), "不存在的配置");
            this._validateConfig(defaultConfig, {[configName]: value}, configName)
            this._config[configName] = value
            return this
        }
    }

    constructor(argv) {
        super(argv);
        // 默认配置
        this._defaultConfig = Object.keys(defaultConfig).reduce((container, item) => {
            return {...container, [item]: defaultConfig[item].defaultValue}
        }, {});
        // 文件配置
        this._fileConfig = {};
        this._registerConfig(); // 注册配置
        this._config = Object.keys(defaultConfig).reduce((container, key) => {
            if (defaultConfig[key]['onlyConfig']) return container; // 如果只是针对配置文件的配置 跳过
            return {...container, [key]: defaultConfig[key]['defaultValue']}
        }, {});
    }

    // 验证配置
    _validateConfig(defaultConfig, config, key) {
        const veaEnv = process.env.VEA_ENV
        assert(defaultConfig[key], `${key} 是一个无效的配置`)
        assert(defaultConfig[key].validate(config[key]), `${key} ${defaultConfig[key].message}`)
        // 递归验证env配置
        if (key === "env") {
            const envConfig = config[key]["dev"] || {};
            Object.keys(envConfig).forEach(item => {
                this._validateConfig(defaultConfig, envConfig, item)
            });
        }
    }

    // 注册配置
    _registerConfig() {
        const configPath = path.join(process.cwd(), "vea.config.js")
        if (!fs.existsSync(configPath)) return
        const fileConfig = require(configPath)
        assert(_.isPlainObject(fileConfig), "配置必须是一个对象")
        // 验证
        Object.keys(fileConfig).forEach(key => {
            this._validateConfig(defaultConfig, fileConfig, key)
        });
        this._fileConfig = fileConfig
    }

    /**
     * 获取完整配置
     * @returns {ReadonlyArray<any>}
     * @private
     */
    _getComplateConfig() {
        const veaEnv = process.env.VEA_ENV
        const envPluginConfig = this._config["env"] && this._config["env"][veaEnv] ? this._config["env"][veaEnv] : {}
        const envFileConfig = this._fileConfig["env"] && this._fileConfig["env"][veaEnv] ? this._fileConfig["env"][veaEnv] : {}
        // 合并配置
        const mergeConfig = Object.keys(defaultConfig).filter(item => defaultConfig[item].merge).reduce((container, item) => {
            const c1 = this._defaultConfig[item] || {}
            const c2 = this._config[item] || {}
            const c3 = this._fileConfig[item] || {}
            const c4 = envPluginConfig[item] || {}
            const c5 = envFileConfig[item] || {}
            return {...container, [item]: {...c1, ...c2, ...c3, ...c4, ...c5}}
        }, {});
        return Object.freeze(
            Object.assign(
                {},
                this._defaultConfig,
                this._config,
                this._fileConfig,
                envPluginConfig,
                envFileConfig,
                mergeConfig
            )
        )
    }

    // 开启dev
    startDev() {
        const config = this._getComplateConfig()
        const service = new Service({
            config,
            build: this
        });
        service.startDev()
    }

    startBuild() {
        const config = this._getComplateConfig()
        // console.log(config);
        // return
        const service = new Service({
            config,
            build: this
        });
        service.startBuild()
    }
};
