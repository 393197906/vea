const Config = require("webpack-chain");
const {join, resolve, relative,isAbsolute} = require('path');
const resolveDefine = require("./resolveDefine")
const {existsSync} = require('fs');
const {EOL} = require('os');
const assert = require('assert');

function makeArray(item) {
    if (Array.isArray(item)) return item;
    return [item];
}

module.exports = getBaseConfig = (opts) => {
    const {cwd} = opts
    const isDev = process.env.NODE_ENV === 'development';
    const webpackConfig = new Config();
    // entry
    if (opts.entry) {
        if (typeof opts.entry === 'string') {
            webpackConfig.entry('vea').add(opts.entry).end()
        } else {
            for (const key in opts.entry) {
                const entry = webpackConfig.entry(key);
                makeArray(opts.entry[key]).forEach(file => {
                    entry.add(file);
                });
            }
        }
    }
    // output
    const absOutputPath = resolve(cwd, opts.outputPath || 'dist');
    webpackConfig.output
        .path(absOutputPath)
        .filename(`[name].js`)
        .chunkFilename(`vea.[name].async.js`)
        .publicPath(opts.publicPath || undefined)
        .devtoolModuleFilenameTemplate(info => {
            return relative(opts.cwd, info.absoluteResourcePath).replace(/\\/g, '/');
        });

    // 挂载自定义插件
    if (opts.extraWebpackPlugins) {
        opts.extraWebpackPlugins.forEach((item, index) => {
            const [path = "", opts = []] = item
            webpackConfig.plugin(`extraWebpackPlugins${index}`).use(require(path), opts);
        })
    }

    // plugins -> html
    if (existsSync(join(process.cwd(), "public/index.html")) || existsSync(join(process.cwd(), "public/index.ejs"))|| opts.htmlTemplate) {
        const template = opts.htmlTemplate ? isAbsolute(opts.htmlTemplate)?opts.htmlTemplate:join(cwd, opts.htmlTemplate) :existsSync(join(process.cwd(), "public/index.html"))? join(process.cwd(), "public/index.html"):join(process.cwd(), "public/index.ejs");
        webpackConfig.plugin('index.html').use(require('html-webpack-plugin'), [
            {
                template
            }
        ]);
    }

    webpackConfig.resolve
    // 不能设为 false，因为 tnpm 是通过 link 处理依赖，设为 false tnpm 下会有大量的冗余模块
        .set('symlinks', true)
        .modules.add('node_modules')
        .add(join(__dirname, '../../node_modules'))
        // Fix yarn global resolve problem
        // ref: https://github.com/umijs/umi/issues/872
        .add(join(__dirname, '../../../'))
        .end()
        .extensions.merge([
        '.web.js',
        '.wasm',
        '.mjs',
        '.js',
        '.web.jsx',
        '.jsx',
        '.web.ts',
        '.ts',
        '.web.tsx',
        '.tsx',
        '.json',
        ".vue"
    ]);

    // alias
    if (opts.alias) {
        for (const key in opts.alias) {
            webpackConfig.resolve.alias.set(key, opts.alias[key]);
        }
    }
    // resolveLoader
    webpackConfig.resolveLoader.modules
        .add('node_modules')
        .add(join(__dirname, '../../node_modules'))
        .end();

    // 按需引入
    if (!opts.disableDynamicImport) {
        webpackConfig.optimization
            .splitChunks({
                chunks: 'async',
                name: 'vea.vendors',
            })
            .runtimeChunk(false);
    }

    // module -> exclude
    const rule = webpackConfig.module
        .rule('exclude')
        .test(/\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|mp3|mp4)(\?.*)?$/)
        .exclude.add(/\.json$/)
        .add(/\.(js|jsx|ts|tsx|mjs|wasm|vue)$/)
        .add(/\.(css|less|scss|sass)$/);

    rule
        .end()
        .use('url-loader')
        .loader(require.resolve('umi-url-pnp-loader'))
        .options({
            limit: 10000,
            name: 'static/[name].[hash:8].[ext]',
        });


    // module -> eslint
    if(opts.eslintLoaderOptions){
        webpackConfig.module
            .rule('eslint')
            .test(/\.(js|jsx|vue)$/)
            .enforce('pre')
            .include.add(cwd)
            .end()
            .use('eslint-loader')
            .loader(require.resolve('eslint-loader'))
            .options(opts.eslintLoaderOptions);
    }



    // babel
    const babelOptsCommon = {
        cacheDirectory: true, // enable by default
        babelrc: false, // disable by default
    };
    const babel = opts.babel || {};
    const babelOpts = {
        presets: [...(babel.presets || [])],
        plugins: [
            ...(babel.plugins || []),
        ],
        ...babelOptsCommon,
    };
    // babel-plugin-dynamic-import-node 实现打包为一个包
    if (opts.disableDynamicImport) {
        babelOpts.plugins = [
            ...(babelOpts.plugins || []),
            require.resolve('babel-plugin-dynamic-import-node'),
        ];
    }

    // Avoid "require is not defined" errors
    webpackConfig.module
        .rule('mjs-require')
        .test(/\.mjs$/)
        .type('javascript/auto')
        .include.add(cwd);

    // module -> mjs
    webpackConfig.module
        .rule('mjs')
        .test(/\.mjs$/)
        .include.add(cwd)
        .end()
        .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options(babelOpts);

    // module -> js
    webpackConfig.module
        .rule('js')
        .test(/\.js$/)
        .include.add(cwd)
        .end()
        .exclude.add(/node_modules/)
        .end()
        .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options(babelOpts);

    // module -> vue
    webpackConfig.module
        .rule('vue')
        .test(/\.vue$/)
        .include.add(cwd)
        .end()
        // .exclude.add(/node_modules/)
        // .end()
        .use('vue-loader')
        .loader(require.resolve('vue-loader'))

    // module -> jsx
    // jsx 不 exclude node_modules
    webpackConfig.module
        .rule('jsx')
        .test(/\.jsx$/)
        .include.add(opts.cwd)
        .end()
        .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options(babelOpts);

    // module -> css
    require('./css')(webpackConfig, opts);

    // plugins -> define
    webpackConfig
        .plugin('define')
        .use(require('webpack/lib/DefinePlugin'), [resolveDefine(opts)]);

    // plugins -> progress bar
    webpackConfig.plugin('progress').use(require('webpackbar'), [
        {
            name: "@vea/build",
            color: 'blue',
            reporters: ['fancy'],
        },
    ]);


    // plugins -> copy
    if (existsSync(join(opts.cwd, 'public'))) {
        webpackConfig.plugin('copy-public').use(require('copy-webpack-plugin'), [
            [
                {
                    from: join(opts.cwd, 'public'),
                    to: absOutputPath,
                    toType: 'dir',
                    ignore: [ 'index.html',"index.ejs" ]
                },
            ],
        ]);
    }

    if (opts.copyPath) {
        const copy = {
            from: join(opts.cwd, copyPath),
            to: absOutputPath,
        };
        webpackConfig
            .plugin(`copy-${index}`)
            .use(require('copy-webpack-plugin'), [[copy]]);
    }

// filter `Conflicting order between` warning
    webpackConfig
        .plugin('filter-css-conflicting-warnings')
        .use(require('./FilterCSSConflictingWarning'));

    // plugins -> friendly-errors
    webpackConfig
        .plugin('friendly-errors')
        .use(require('friendly-errors-webpack-plugin'), [
            {
                clearConsole: true,
            },
        ]);
    // externals
    if (opts.externals) {
        webpackConfig.externals(opts.externals);
    }
    // node
    webpackConfig.node.merge({
        setImmediate: false,
        process: 'mock',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    });


    if (isDev) {
        require('./dev')(webpackConfig, opts);
    } else {
        require('./prod')(webpackConfig, opts);
    }

    return webpackConfig.toConfig();

};
