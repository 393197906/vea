const printLogo = require("./logo")
const packageJson = require("../package")
const [a, b, script, ...otherScript] = process.argv;
const defaultScripts = {
    '-v': 'version',
    '--version': 'version',
};
printLogo()
if (Object.keys(defaultScripts).find(item => item === script)) {
    console.log();
    console.log(`v${packageJson.version}`);
} else {
    const core = require("../src/core/index");
    new core().run(script, otherScript);
}

