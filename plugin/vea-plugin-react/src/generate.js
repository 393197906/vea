const path = require("path");
const chalk = require("chalk");
const templateGenerate = require("./template/index")
module.exports = core => {
    //  注册组件生成命令
    core.registerCommend("page", {
        description: "生成page类组件",
        usage: "vea page [component_name]",
        detail: `
            Examples:
                ${chalk.gray('# vea page Index')}
                生成视图Index组件
                `.trim()
    }, (argv) => {
        main(core, argv)
    });
    core.registerCommend("component", {
        description: "生成component类组件",
        usage: "vea component [component_name]",
        detail: `
            Examples:
                ${chalk.gray('# vea component Index')}
                生成Index组件
                `.trim()
    }, (argv) => {
        main(core, argv, "component")
    });
}

function main(core, argv, dir = "page") {
    const [target = "", cssMode = "--css"] = argv;
    if (!target) {
        core.run("help", [dir])
        return
    }
    let cssExtraname = "css"
    switch (cssMode) {
        case "--less":
            cssExtraname = "less"
            break
        case "--scss":
            cssExtraname = "scss"
            break
    }
    templateGenerate(path.join(dir+"s", target), cssExtraname).then(() => {
        console.log(chalk.green(`'${target}' 组件创建成功`));
    })
}
