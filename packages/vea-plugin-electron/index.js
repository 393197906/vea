const path = require("path");
const chalk = require("chalk");
const assert = require('assert')
module.exports = ({build, core, deploy}, options) => {
    //  注册build命令
    core.registerCommend("build-cs", {
        description: "项目打包到客户端",
        usage: "vea build-cs [target]",
        detail: `
            Examples:
                ${chalk.gray('# vea build-cs dev')}
                打包dev环境客户端
                `.trim()
    }, (argv) => {
        const [target = ""] = argv
        process.env.VEA_ENV = target // 全局变量
        assert(core.commonds.build, "模块build命令不存在")
        core.run("build", argv, function () {
            console.log(chalk.green("render编译完成"));
            build.setEntry({"electron": path.resolve(process.cwd(), `./src/electron/index.js`)});
            build.setClear(false); // 不清除目标目录
            build.setHtmlTemplate("@vea-no-template"); // 设置不使用html文件
            build.setHash(false); // 不启用hash
            build.startBuild()
            build.once("onBuildSuccess", () => {
                console.log(chalk.green("main编译完成"));
            })
        })
    });
};
