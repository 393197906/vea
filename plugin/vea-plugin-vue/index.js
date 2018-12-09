const path = require("path")
module.exports = ({build, core, deploy}) => {
    build.setDisableCSSModules(true);
    build.setEntry(path.resolve(process.cwd(), "./src/index.js"));
    // build.setEntry(path.resolve(__dirname, './entry.js'));
    build.setOutputPath(path.resolve(process.cwd(), "./dist"));
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

    core.registerCommend("dev", {}, (argv) => {
        // 设置入口文件
        core.setMainExports(`
        import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"
export {Vue,VueRouter,Vuex}
        `);
        core.render();
        build.startDev()
    });
    core.registerCommend("build", {}, (argv) => {
        // core.setEntryExportsHeader();
        // core.render();
        build.startBuild()
    });
};
