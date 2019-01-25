const path = require("path");
const chalk = require("chalk");
module.exports = ({build, core, deploy}, options) => {
    const registerBuild = () => {
        build
            .setExtraWebpackPlugins([
                [
                    require.resolve("vue-loader/lib/plugin")
                ],
                () => {
                    if (process.env.NODE_ENV === "production") {
                        const target = process.env.VEA_ENV || "";
                        return [
                            require.resolve("prerender-spa-plugin"), [
                                {
                                    ...options,
                                    staticDir: path.resolve(process.cwd(), `./dist/${target}`),

                                }
                            ]
                        ]
                    }
                }
            ]);
    }
    //  注册build命令
    core.registerCommend("build-render", {
        description: "项目静态化打包",
        usage: "vea build-render [target]",
        detail: `
            Examples:
                ${chalk.gray('# vea build-render dev')}
                静态打包到dev环境
                `.trim()
    }, (argv) => {
        registerBuild()
        const [target = ""] = argv
        process.env.VEA_ENV = target // 全局变量
        build.setOutputPath(path.resolve(process.cwd(), `./dist/${target}`));
        build.startBuild()
    });
};
