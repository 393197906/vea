const {existsSync, writeFileSync} = require('fs')
const {join} = require('path')

module.exports = function (webpackConfig, opts) {
    webpackConfig
        .mode('development')
        .devtool(opts.devtool || 'cheap-module-eval-source-map')
        .output.pathinfo(true);

    webpackConfig
        .plugin('hmr')
        .use(require('webpack/lib/HotModuleReplacementPlugin'));

    webpackConfig.when(!!opts.devServer, webpackConfig =>
        webpackConfig.merge({devServer: opts.devServer}),
    );

    if (process.env.HARD_SOURCE) {
        const pkgPath = join(opts.cwd, 'package.json');
        if (!existsSync(pkgPath)) {
            writeFileSync(pkgPath, '{}', 'utf-8');
        }
        webpackConfig
            .plugin('hard-source')
            .use(require('hard-source-webpack-plugin'), [{
                environmentHash: {
                    root: process.cwd(),
                    directories: ['config'],
                    files: ['package-lock.json', 'yarn.lock'],
                },
            },
            ]);
    }
}
