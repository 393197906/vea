const path = require("path")
module.exports = ({build, core, deploy}) => {
    build.setEntry(path.resolve(process.cwd(), "./demo/index.js"));
    build.setOutputPath(path.resolve(process.cwd(), "./dist"));
    build.setHash(true);
    build.on("beforeDevServer", (server) => {

    });
    core.registerCommend("dev", {}, (argv) => {
        build.startDev()
    });
};
