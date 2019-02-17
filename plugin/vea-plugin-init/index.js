const path = require("path");
const chalk = require("chalk");
const download = require('download-git-repo');
const exists = require('fs').existsSync;
const ora = require('ora');
const inquirer = require('inquirer');
const logger = require('./lib/logger');

module.exports = ({build, core, deploy}) => {
    // 注册init命令
    core.registerCommend("init", {
        description: "项目初始化",
        usage: "vea init [template] [dir]",
        detail: `
            Examples:
                ${chalk.gray('# vea init vue')}
                初始化vue项目
                ${chalk.gray('# vea init vue-static')}
                初始化可静态化的vue项目
                 ${chalk.gray('# vea init react')}
                 初始化react项目
                `.trim()
    }, (argv) => {
        const [template, rawName] = argv;
        if (!template) {
            core.run("help", ['init'])
            return
        }
        const hasSlash = template.indexOf('/') > -1;
        const inPlace = !rawName || rawName === '.';
        const name = inPlace ? path.relative('../', process.cwd()) : rawName;
        const to = path.resolve(rawName || '.');
        const clone = false;


        if (inPlace || exists(to)) {
            inquirer.prompt([{
                type: 'confirm',
                message: inPlace
                    ? '是否在当前目录初始化项目?'
                    : '目标路径已存在,继续可能会覆盖原有文件，是否继续?',
                name: 'ok'
            }]).then(answers => {
                if (answers.ok) {
                    run()
                }
            }).catch(logger.fatal)
        } else {
            run()
        }


        function run() {
            if (!hasSlash) {
                const officialTemplate = '393197906/vea-template-' + template
                downloadAndGenerate(officialTemplate)
            } else {
                downloadAndGenerate(template)
            }
        }

        function downloadAndGenerate(template) {
            const spinner = ora('项目摸板下载中')
            spinner.start()
            download(template, to, {clone}, err => {
                spinner.stop()
                if (err) logger.fatal('下载失败:' + template + ': ' + err.message.trim())
                logger.success("项目初始化成功")
            })
        }
    });
};
