const chalk = require("chalk")
module.exports = ({core}) => {
    core.registerCommend("help", {
        description: "vea 帮助",
        usage: "vea help [name]",
        detail: `
            Examples:
                ${chalk.gray('# vea help build')}
                获取buid命令的详细信息
                `.trim()
    }, (argv) => {
        const [helpTarget] = argv
        // 第二个参数哦
        if (helpTarget) {
            const item = core.commonds[helpTarget] || {opts: {}}
            console.log(item.opts.usage || "");
            console.log(item.opts.detail || "");
            return
        }
        console.log(
            `\n  Usage: vea <command> [options]\n` +
            `\n  Commands:\n`
        );
        Object.keys(core.commonds).forEach(item => {
            console.log(
                `    ${chalk.yellow(item)}  ${core.commonds[item].opts.description ||
                ""}`
            );
        });
        console.log(
            `\n  run ${chalk.blue(
                `vea help [command]`
            )} for usage of a specific command.\n`
        );
    })
}
