const UglifyPlugin = require('uglifyjs-webpack-plugin')
const {isPlainObject} = require('lodash')

function mergeConfig(config, userConfig) {
    if (typeof userConfig === 'function') {
        return userConfig(config);
    } else if (isPlainObject(userConfig)) {
        return {
            ...config,
            ...userConfig,
        };
    } else {
        return config;
    }
}

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
    /*  webpackConfig.optimization.minimizer([
          new UglifyPlugin(
              // mergeConfig(
              //     {
              //         ...uglifyOptions,
              //         sourceMap: !!opts.devtool,
              //     },
              //     opts.uglifyJSOptions,
              // ),
          ),
      ]);*/
}
