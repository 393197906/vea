const fs = require("fs")
const path = require('path')
const mainTemplatePath = path.resolve(__dirname, "./template/main.template.js");
const mainTargetPath = path.resolve(__dirname, "./runtime/main.js");
const Mustache = require("mustache")
module.exports = class {
    constructor() {
        this.main = {
            exports: ""
        }
    }

    // 转换文件
    transformFile(path){
        this.main.exports  = `module.exports = require("${path}")`
    }

    renderMain() {
        const mainTemplate = fs.readFileSync(mainTemplatePath, 'utf-8');
        const renderMainTemplate = Mustache.render(mainTemplate,
            {
                exports: this.main.exports,
            }
        );
        fs.writeFileSync(mainTargetPath, renderMainTemplate)
    }
};
