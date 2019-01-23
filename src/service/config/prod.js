module.exports = function (webpackConfig, opts) {
    webpackConfig.mode('production').devtool(opts.devtool).output.pathinfo(false);
    if (opts.hash) {
        webpackConfig.output
            .filename(`js/[name].[chunkhash:8].js`)
            .chunkFilename(`js/[name].[chunkhash:8].async.js`);
    }

    webpackConfig.performance.hints(false);

    if (opts.manifest) {
        webpackConfig.plugin('manifest').use(require('webpack-manifest-plugin'), [
            {
                fileName: 'asset-manifest.json',
                ...opts.manifest,
            },
        ]);
    }

    webpackConfig
        .plugin('hash-module-ids')
        .use(require('webpack/lib/HashedModuleIdsPlugin'));
    // 压缩
    webpackConfig.optimization.minimizer("js").use(require.resolve("uglifyjs-webpack-plugin"), [
        {
            exclude: /\.min\.js$/,
            sourceMap: !!opts.devtool,
            cache: true,
            parallel: true, //多进程
            extractComments: false, // 移除注释
            uglifyOptions: {
                compress: {
                    unused: true,
                    warnings: false,
                    drop_debugger: true
                },
                output: {
                    comments: false
                }
            }
        }
    ]);
    webpackConfig.optimization.minimizer("css").use(require.resolve("optimize-css-assets-webpack-plugin"), [
        {
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: {
                safe: true,
                autoprefixer: {disable: true},
                mergeLonghand: false,
                discardComments: {
                    removeAll: true // 移除注释
                }
            },
            canPrint: true
        }
    ])
};
