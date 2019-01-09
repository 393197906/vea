const assert = require("assert")
const lib = require("../lib/index")
const _ = require("lodash")
module.exports = class veaCore {
    constructor() {
        this.lib = new lib()
    }
    // 设置入口文件 头部
    setMain(path) {
        this.lib.transformFile(path)
        // this.lib.main.exports = exports
        return this
    }

    // 渲染库入口文件
    render() {
        console.log("render");
        this.lib.renderMain()
    }
};
