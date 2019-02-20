const fs = require("fs");
const openBrowser = require('react-dev-utils/openBrowser');
const webpack = require('webpack');
const assert = require('assert');
var portfinder = require('portfinder');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
// const clearConsole = require('./clearConsole');
// const errorOverlayMiddleware = require('./errorOverlayMiddleware');
// const {send, STARTING, DONE} = require('./send');

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9001;
const HOST = process.env.HOST || '127.0.0.1';
const PROTOCOL = 'http';

process.env.NODE_ENV = 'development';

module.exports = async function dev({
                                        webpackConfig = {},
                                        config = {},
                                        _beforeServerWithApp,
                                        beforeMiddlewares, // server beforeMiddlewares
                                        afterMiddlewares,  // server afterMiddlewares
                                        beforeServer,
                                        afterServer,
                                        contentBase,
                                        onCompileDone = () => {
                                        },
                                        proxy,
                                        port = DEFAULT_PORT,
                                        base = '',
                                        serverConfig: serverConfigFromOpts = {},
                                    } = {}) {
    assert(webpackConfig, 'webpackConfig must be supplied');
    // console.log(webpackConfig.plugins[3]);
    // return
    // 获取port
    port = await (async () => {
        return await portfinder.getPortPromise({port})
    })();
    const serverConfig = {
        disableHostCheck: true,
        compress: true,
        clientLogLevel: 'warning',
        hot: true,
        quiet: true,
        headers: {
            'access-control-allow-origin': '*',
        },
        publicPath: webpackConfig.output.publicPath,
        watchOptions: {
            ignored: /node_modules/,
        },
        historyApiFallback: false,
        overlay: false,
        host: HOST,
        proxy,
        contentBase: contentBase,
        before(app) {
            (beforeMiddlewares || []).forEach(middleware => {
                app.use(middleware);
            });
            // internal usage for proxy
            if (_beforeServerWithApp) {
                _beforeServerWithApp(app);
            }
            // app.use(errorOverlayMiddleware());
        },
        after(app) {
            (afterMiddlewares || []).forEach(middleware => {
                app.use(middleware);
            });
        },
        ...serverConfigFromOpts,
        ...(webpackConfig.devServer || {}),
    };
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, serverConfig)
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, serverConfig);
    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
            server.close(() => {
                process.exit(0);
            });
        });
    });

    if (beforeServer) {
        beforeServer(server);
    }

    server.listen(port, HOST, err => {
        if (err) {
            console.log(err);
            return;
        }

        // if (isInteractive) {
        //     clearConsole();
        // }
        console.log(chalk.cyan('Starting the development server...\n'));
        // send({type: STARTING});
        if (afterServer) {
            afterServer(server);
        }
    });
    let isFirstCompile = true;
    base = webpackConfig.output.publicPath || ""
    const urls = `${PROTOCOL}://${HOST}:${port}${base}`;
    compiler.hooks.done.tap('@vea/build dev', stats => {
        if (stats.hasErrors()) {
            process.stdout.write('\x07');
            return;
        }
        let copied = '';
        if (isFirstCompile) {
            require('clipboardy').write(urls);
            copied = chalk.dim('(copied to clipboard)');
            console.log(
                [
                    `  App running at:`,
                    `  - Local:   ${chalk.cyan(urls)} ${copied}`,
                    `  - Network: ${chalk.cyan(urls)}`,
                ].join('\n'),
            );
        }

        // 编译完成
        onCompileDone({
            isFirstCompile,
            stats,
            server: {
                url: urls,
                host: HOST,
                port
            }
        });

        if (isFirstCompile) {
            isFirstCompile = false;
            if (config.isOpenBrowser) openBrowser(urls);
        }
    });

}

