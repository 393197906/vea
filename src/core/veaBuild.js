const event = require("./event/event")
const {extname} = require("path");
const assert = require("assert");
const _ = require("lodash");
const Service = require("../service");
const defaultConfig = require("../common/defaultConfig")

module.exports = class veaBuild extends event {
    /**
     * 生成设置方法
     * @param name
     * @returns {Function}
     */
    static generateSetMethod(name){
        let configName = name.substring(3);
        configName = `${configName[0].toLowerCase()}${configName.substring(1)}`; // 转换驼峰
        assert(defaultConfig[configName],"无效的设置");
        const configObject = defaultConfig[configName];
        return  (value)=> {
            assert(configObject.validate(value),configObject.message);
            this.config[configName] = value
        }
    }
    constructor(argv) {
        super(argv);
        this.config = Object.keys(defaultConfig).reduce((container, key) => {
            return {...container, [key]: defaultConfig[key]['defaultValue']}
        },{});
    }
    // 开启dev
    startDev() {
        const service = new Service({
            config: this.config,
            build: this
        });
        service.startDev()
    }

    startBuild() {
        // return
        const service = new Service({
            config: this.config,
            build: this
        });
        service.startBuild()
    }
};
