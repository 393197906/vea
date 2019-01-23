const {extname} = require('path')
const autoprefixer = require('autoprefixer')

const DEFAULT_BROWSERS = [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie < 9', // React doesn't support IE8 anyway
];

module.exports = function (webpackConfig, opts) {
    const isDev = process.env.NODE_ENV === 'development';
    // const isVue = opts.target === "vue"
    const cssOpts = {
        importLoaders: 1,
        sourceMap: true,
        ...(opts.cssLoaderOptions || {}),
    };
    // should pass down opts.cwd
    const postcssOptions = {
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'), // eslint-disable-line
            autoprefixer({
                browsers: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009',
            }),
            ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []),
            ...(isDev ? [] : [
                require('cssnano')({
                    preset: [
                        'default',
                        opts.cssnano || {
                            mergeRules: false,
                            // ref: https://github.com/umijs/umi/issues/955
                            normalizeUrl: false,
                        },
                    ],
                }),
            ]),
        ],
    };
    const cssModulesConfig = {
        modules: true,
        localIdentName:
            cssOpts.localIdentName ||
            (isDev
                ? '[name]__[local]___[hash:base64:5]'
                : '[local]___[hash:base64:5]'),
    };
    const lessOptions = {
        javascriptEnabled: true,
        ...(opts.lessLoaderOptions || {}),
    };

    let hasSassLoader = true;
    try {
        require.resolve('sass-loader');
    } catch (e) {
        hasSassLoader = false;
    }

    function applyCSSRules(rule, {cssModules, less, sass}) {
        if (isDev) {
            rule.use('css-hot-loader').loader(require.resolve('css-hot-loader'));
            // vue-style-loader
            if (opts.mode.trim().toLowerCase() === "vue") {
            rule
                .use('vue-style-loader')
                .loader(require.resolve('vue-style-loader'))
            }
        } else {
            rule
                .use('extract-css-loader')
                .loader(require('mini-css-extract-plugin').loader)
                .options({
                    // publicPath: isDev ? '/' : opts.cssPublicPath,
                    publicPath: isDev ? '/' : "../",
                });
        }

        rule
            .use('css-loader')
            .loader(require.resolve('css-loader'))
            .options({
                ...cssOpts,
                ...(cssModules ? cssModulesConfig : {}),
            });

        rule
            .use('postcss-loader')
            .loader(require.resolve('postcss-loader'))
            .options(postcssOptions);

        if (less) {
            rule
                .use('less-loader')
                .loader(require.resolve('less-loader'))
                .options(lessOptions);
        }

        if (sass && hasSassLoader) {
            rule
                .use('sass-loader')
                .loader(require.resolve('sass-loader'))
                .options(opts.sassLoaderOptions || {});
        }
    }

    if (opts.cssModulesExcludes) {
        opts.cssModulesExcludes.forEach((exclude, index) => {
            const rule = `cssModulesExcludes_${index}`;
            const config = webpackConfig.module.rule(rule).test(filePath => {
                if (exclude instanceof RegExp) {
                    return exclude.test(filePath);
                } else {
                    return filePath.indexOf(exclude) > -1;
                }
            });
            const ext = extname(exclude).toLowerCase();
            applyCSSRules(config, {
                less: ext === '.less',
                sass: ext === '.sass' || ext === '.scss',
            });
        });
    }


    function cssExclude(filePath) {
        if (/node_modules/.test(filePath)) {
            return true;
        }
        if (opts.cssModulesExcludes) {
            for (const exclude of opts.cssModulesExcludes) {
                if (filePath.indexOf(exclude) > -1) return true;
            }
        }
        return false;
    }

    applyCSSRules(
        webpackConfig.module
            .rule('css')
            .test(/\.css$/)
            .exclude.add(cssExclude)
            .end(),
        {
            cssModules: !opts.disableCSSModules,
        },
    );

    applyCSSRules(
        webpackConfig.module
            .rule('css-in-node_modules')
            .test(/\.css$/)
            .include.add(/node_modules/)
            .end(),
        {},
    );
    applyCSSRules(
        webpackConfig.module
            .rule('less')
            .test(/\.less$/)
            .exclude.add(cssExclude)
            .end(),
        {
            cssModules: !opts.disableCSSModules,
            less: true,
        },
    );
    applyCSSRules(
        webpackConfig.module
            .rule('less-in-node_modules')
            .test(/\.less$/)
            .include.add(/node_modules/)
            .end(),
        {
            less: true,
        },
    );
    applyCSSRules(
        webpackConfig.module
            .rule('sass')
            .test(/\.(sass|scss)$/)
            .exclude.add(cssExclude)
            .end(),
        {
            cssModules: !opts.disableCSSModules,
            sass: true,
        },
    );
    applyCSSRules(
        webpackConfig.module
            .rule('sass-in-node_modules')
            .test(/\.(sass|scss)$/)
            .include.add(/node_modules/)
            .end(),
        {
            sass: true,
        },
    );

    const hash = !isDev && opts.hash ? '.[contenthash:8]' : '';

    webpackConfig.plugin('extract-css').use(require('mini-css-extract-plugin'), [
        {
            filename: `css/[name]${hash}.css`,
            chunkFilename: `css/[name]${hash}.chunk.css`,
        },
    ]);
};
