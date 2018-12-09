const assert = require("assert")
const lib = require("../lib/index")
const _ = require("lodash")
module.exports = class veaCore {
    constructor() {
        this.lib = new lib()
    }

    // 设置入口文件 头部
    setMainExports(exports) {
        this.lib.main.exports = exports
    }

    render() {
        this.lib.renderMain()
    }


    //
    // // 注册命令
    // registerCommend(name, opts, fn) {
    //     assert(_.isString(name), "name 必须是一个字符串")
    //     assert(_.isPlainObject(opts), "opts 必须是一个对象")
    //     assert(_.isFunction(fn), "opts 必须是一个函数")
    //     this.Core.registerCommend(name, opts, fn)
    // }
};
