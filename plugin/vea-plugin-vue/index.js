const path = require("path")
module.exports = ({build, core, deploy}) => {
    build.setDisableCSSModules(true);
    build.setEntry(path.resolve(process.cwd(), "./demo/index.js"));
    build.setOutputPath(path.resolve(process.cwd(), "./dist"));
    build.setHash(true);
    build.setAlias({
        vue: 'vue/dist/vue.js'
    });
    build.setBabel({
        preset: [
            ["vue"]
        ]
    });
    build.setExtraWebpackPlugins([
        ["vue-loader/lib/plugin"],
    ]);


    core.registerCommend("dev", {}, (argv) => {
        build.startDev()
    });
    core.registerCommend("build", {}, (argv) => {
        build.startBuild()
    });
};
