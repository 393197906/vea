const path = require("path");
const chalk = require("chalk");
const assert = require('assert')
const builder = require('electron-builder')
const os = require('os')

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
        process.env.NODE_ENV = 'production'
        assert(core.commonds.build, "模块build命令不存在")
        core.run("build", argv, {
            before: (fbuild) => fbuild
                .setTarget("electron-renderer")
                .setLibraryTarget("commonjs2")
                .setNode({
                    __dirname: process.env.NODE_ENV !== 'production',
                    __filename: process.env.NODE_ENV !== 'production'
                }),
            after: () => {
                console.log(chalk.green("render编译完成"));
                // 设置main babel
                (() => {
                    const babel = build.config.babel
                    const index = babel.presets.findIndex(item => {
                        const [presetPath = ""] = item
                        return presetPath.indexOf("preset-env") > -1
                    });
                    babel.presets[index][1] = {
                        targets: {
                            node: "7"
                        }
                    };
                    build.setBabel(babel)
                })();
                build
                    .setTarget("electron-main")
                    .setEntry({"main": path.resolve(process.cwd(), `./src/electron/index.js`)})
                    .setClear(false)// 不清除目标目录
                    .setHtmlTemplate("@vea-no-template")// 设置不使用html文件
                    .setHash(false) // 不启用hash
                    .startBuild();
                build.once("onBuildSuccess", () => {
                    console.log(chalk.green("main编译完成"));
                    console.log(process.env.NODE_ENV);
                    (() => {
                        const Platform = builder.Platform
                        const platform = os.platform() === 'win32' ? 'WINDOWS' : os.platform() === 'LINUX' ? 'Linux' : 'MAC'
                        const config = require(path.resolve(process.cwd(), "./package.json")).build
                        builder.build({
                            targets: Platform[platform].createTarget(),
                            config
                        })
                            .then(result => {
                                console.log(result)
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    })()
                })
            }
        })
    });
};
