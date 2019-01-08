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
    static generateSetMethod(name){
        let configName = name.substring(3);
        configName = `${configName[0].toLowerCase()}${configName.substring(1)}`; // 转换驼峰
        assert(defaultConfig[configName],`${configName} 是一个无效的配置`);
        const configObject = defaultConfig[configName];
        return  (value)=> {
            assert(this._config.hasOwnProperty(configName),"不存在的配置");
            assert(configObject.validate(value),`${configName} ${configObject.message}`);
            this._config[configName] = value
        }
    }
    constructor(argv) {
        super(argv);
        // 默认配置
        this._defaultConfig =Object.keys(defaultConfig).reduce((container,item)=>{
            return {...container,[item]:defaultConfig[item].defaultValue}
        },{});
        // 文件配置
        this._fileConfig = {};
        this._registerConfig(); // 注册配置
        this._config = Object.keys(defaultConfig).reduce((container, key) => {
            if(defaultConfig[key]['onlyConfig']) return container; // 如果只是针对配置文件的配置 跳过
            return {...container, [key]: defaultConfig[key]['defaultValue']}
        },{});
    }
    // 注册配置
    _registerConfig() {
        const configPath = path.join(process.cwd(), "vea.config.js")
        if (!fs.existsSync(configPath)) return
        const fileConfig = require(configPath)
        assert(_.isPlainObject(fileConfig), "配置必须是一个对象")
        // 验证
        Object.keys(fileConfig).forEach(key=>{
            assert(defaultConfig[key],`${key} 是一个无效的配置`)
            assert(defaultConfig[key].validate(fileConfig[key]),`${key} ${defaultConfig[key].message}`)
        });
        this._fileConfig = fileConfig
    }

    /**
     * 获取完整配置
     * @returns {ReadonlyArray<any>}
     * @private
     */
    _getComplateConfig(){
        return Object.freeze(Object.assign({},this._defaultConfig,this._config,this._fileConfig))
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
        // return
        const config = this._getComplateConfig()
        const service = new Service({
            config,
            build: this
        });
        service.startBuild()
    }
};
