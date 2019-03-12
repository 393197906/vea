const path = require("path");
const chalk = require("chalk");
module.exports = ({build, core, deploy}) => {
    build
        .setDevServer({
            overlay: true
        })
        .setDisableCSSModules(true)
        .setEntry(path.resolve(process.cwd(), "./src/index.js"))
        .setHash(true)
        .setAlias({
            'vue$': require.resolve('vue/dist/vue.esm.js')
        })
        .setBabel({
            presets: [
                [require.resolve('@babel/preset-env'), {
                    "modules": false,
                    "targets": {
                        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                    },
                    "useBuiltIns": "usage"
                }]
            ],
            plugins: [
                [require.resolve("@babel/plugin-syntax-dynamic-import")],
                [require.resolve("@babel/plugin-proposal-decorators"), { "legacy": true }],
                [require.resolve("@babel/plugin-proposal-class-properties")],
                [require.resolve("babel-plugin-transform-vue-jsx")],
                [require.resolve("@babel/plugin-transform-runtime"), {
                    "regenerator": false,
                    "useESModules": true,
                }],
            ]
        })
        .setExtraWebpackPlugins([
            [
                require.resolve("vue-loader/lib/plugin")
            ]
        ]);
    // 注册dev命令
    core.registerCommend("dev", {
        description: "项目开发",
        usage: "vea dev [target]",
        detail: `
            Examples:
                ${chalk.gray('# vea dev dev')}
                打开dev开发环境
                
                  ${chalk.gray('# vea dev beta')}
                打开beta开发环境
                
                  ${chalk.gray('# vea dev master')}
                打开master开发环境
                
                `.trim()
    }, (argv, cbObject = {}) => {
        const [target = ""] = argv;
        process.env.VEA_ENV = target || "dev"; // 全局变量
        // 执行before钩子
        if (cbObject.before && typeof cbObject.before === "function") {
            cbObject.before(build)
        }
        build.startDev()
        if (cbObject.after && typeof cbObject.after === "function") {
            build.once("onDevCompileDone", cbObject.after)
        }
    });

    //  注册build命令
    core.registerCommend("build", {
        description: "项目打包",
        usage: "vea build [target]",
        detail: `
            Examples:
                ${chalk.gray('# vea build dev')}
                打包到dev环境
                
                  ${chalk.gray('# vea build beta')}
                打包到beta环境
                
                  ${chalk.gray('# vea build master')}
                打包到master环境
                
                `.trim()
    }, (argv, cbObject = {}) => {
        const [target = ""] = argv
        process.env.VEA_ENV = target // 全局变量
        build.setOutputPath(path.resolve(process.cwd(), `./dist/${target}`));
        // 执行before钩子
        if (cbObject.before && typeof cbObject.before === "function") {
            cbObject.before(build)
        }
        build.startBuild()
        if (cbObject.after && typeof cbObject.after === "function") {
            build.once("onBuildSuccess", cbObject.after)
        }
    });

    //  注册deploy命令
    core.registerCommend("deploy", {
        description: "项目部署",
        usage: "vea deploy [target]",
        detail: `
            Examples:
                ${chalk.gray('# vea deploy dev')}
                部署到dev环境
                
                  ${chalk.gray('# vea deploy beta')}
                部署到beta环境
                
                  ${chalk.gray('# vea deploy master')}
                部署到master环境
                
                  ${chalk.gray('# vea deploy [target]')}
                部署到[target](自定义)环境
                
                `.trim()
    }, (argv) => {
        const [target = ""] = argv;
        if (!target) {
            core.run("help", ['deploy'])
            return
        }
        process.env.VEA_ENV = target;// 全局变量
        const {deployGitPath = ""} = build.config;
        const dirPathArray = deployGitPath.split("/")
        const dirPath = dirPathArray[dirPathArray.length - 1].replace(".git", "")
        deploy
            .setBranch(target)
            .setDistPath(path.resolve(process.cwd(), `./dist/${target}`))
            .setDirPath(path.resolve(process.cwd(), `../gitDeploy/.${dirPath}AutoGit/`))
            .setGitPath(deployGitPath)
            .upload()
    });
};
