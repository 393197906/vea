const path = require("path")
const chalk = require("chalk")
module.exports = ({build, core, deploy}) => {
    build.setDisableCSSModules(true);
    build.setEntry(path.resolve(process.cwd(), "./src/index.js"));
    // build.setEntry(path.resolve(__dirname, './entry.js'));
    // build.setOutputPath(path.resolve(process.cwd(), "./dist"));
    build.setHash(true);
    build.setAlias({
        vue: require.resolve('vue/dist/vue.js')
    });
    build.setBabel({
        presets: [
            [require.resolve('babel-preset-vue')]
        ]
    });
    build.setExtraWebpackPlugins([
        [require.resolve("vue-loader/lib/plugin")],
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
    }, (argv) => {
        // 设置入口文件
//         core.setMainExports(`
//         import Vue from "vue"
// import Vuex from "vuex"
// import VueRouter from "vue-router"
// export {Vue,VueRouter,Vuex}
//         `);
//         core.render();
        build.startDev()
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
    }, (argv) => {
        const [target = "dev"] = argv
        build.setOutputPath(path.resolve(process.cwd(), `./dist/${target}`));
        build.startBuild()
    });
};
