const event = require("./event/event")
const {extname} = require("path");
const assert = require("assert");
const _ = require("lodash");
const Service = require("../service");

module.exports = class veaBuild extends event {
    constructor(argv) {
        super(argv)
        this.config = {
            cwd: process.cwd(),
            entry: undefined,
            outputPath: "",
            publicPath: "",
            copyPath: "", // copy 目录
            define: undefined, // define
            alias: undefined,
            hash: false,
            disableDynamicImport: false, // 关闭动态引入
            babel: undefined, // babel 配置
            // css 相关
            cssPublicPath: undefined, // cssPublicPath
            browserslist: undefined, // 浏览器列表
            disableCSSModules: false, // 关闭 css modules
            extraPostCSSPlugins: undefined, // 扩展 postcss
            extraWebpackPlugins: undefined, // 扩展webpack 插件
            cssnano: undefined, // 设置cssnono
            cssLoaderOptions: undefined, // cssLoaderOptions
            lessLoaderOptions: undefined, //lessLoaderOptions
            sassLoaderOptions: undefined, //sassLoaderOptions
            cssModulesExcludes: undefined, // cssModulesExcludes
            externals: undefined,
            devtool: "", // devtool
            manifest: false,
            devServer: undefined,
            // html
            htmlTemplate: undefined
        }
    }

    // 设置 html 路径
    setHtmlTemplate(htmlTemplate) {
        assert(_.isString(htmlTemplate), "htmlTemplate 必须是一个布尔值");
        this.config.htmlTemplate = htmlTemplate
    }

    // 设置入口
    setEntry(entry) {
        assert(_.isString(entry) || _.isPlainObject(entry), "entry 必须是一个对象或字符串");
        this.config.entry = entry
    }

    // 设置出口
    setOutputPath(outputPath) {
        assert(_.isString(outputPath), "entry 必须是一个字符串");
        this.config.outputPath = outputPath
    }

    // 设置基础路径
    setCwd(cwd) {
        assert(_.isString(cwd), "cwd 必须是一个字符串");
        this.config.cwd = cwd
    }

    // 设置基础build路径
    setPublicPath(publicPath) {
        assert(_.isString(publicPath), "PublicPath 必须是一个字符串");
        this.config.publicPath = publicPath
    }

    //设置 copyPath
    setCopyPath(copyPath) {
        assert(_.isString(copyPath), "copyPath 必须是一个字符串");
        this.config.copyPath = copyPath
    }

    // 设置 define
    setDefine(define) {
        assert(_.isPlainObject(define), "define 必须是一个对象");
        this.config.define = define
    }

    // 设置 hash
    setHash(hash) {
        assert(_.isBoolean(hash), "hash 必须是一个布尔值");
        this.config.hash = hash
    }

    // 设置 alias
    setAlias(alias) {
        assert(_.isPlainObject(alias), "alias 必须是一个对象");
        this.config.alias = alias
    }


    // 设置 babel
    setBabel(babel) {
        assert(_.isPlainObject(babel), "babel 必须是一个对象");
        this.config.babel = babel
    }

    //disableDynamicImport


    // 设置 browserslist
    setBrowserslist(browserslist) {
        assert(_.isArray(browserslist), "browserslist 必须是一个数组");
        this.config.browserslist = browserslist
    }

    // 设置 ExtraPostCSSPlugins
    setExtraPostCSSPlugins(extraPostCSSPlugins) {
        assert(_.isArray(extraPostCSSPlugins), "extraPostCSSPlugins 必须是一个数组");
        this.config.extraPostCSSPlugins = extraPostCSSPlugins
    }

    // 设置 extraWebpackPlugins // 扩展插件
    setExtraWebpackPlugins(extraWebpackPlugins) {
        assert(_.isArray(extraWebpackPlugins), "extraWebpackPlugins 必须是一个数组");
        this.config.extraWebpackPlugins = extraWebpackPlugins
    }


    // 设置 动态导入
    setDisableDynamicImport(disableDynamicImport) {
        assert(_.isBoolean(disableDynamicImport), "disableDynamicImport 必须是一个布尔值");
        this.config.disableDynamicImport = disableDynamicImport
    }

    //设置 cssPublicPath
    setCssPublicPath(cssPublicPath) {
        assert(_.isString(cssPublicPath), "cssPublicPath 必须是一个对象");
        this.config.cssPublicPath = cssPublicPath
    }

    // 设置 cssnano
    setCssnano(cssnano) {
        assert(_.isPlainObject(cssnano), "cssnano 必须是一个对象");
        this.config.cssnano = cssnano
    }

    // 设置 lessLoaderOptions
    setLessLoaderOptions(lessLoaderOptions) {
        assert(_.isPlainObject(lessLoaderOptions), "lessLoaderOptions 必须是一个对象");
        this.config.lessLoaderOptions = lessLoaderOptions
    }

    // 设置 cssLoaderOptions
    setCssLoaderOptions(cssLoaderOptions) {
        assert(_.isPlainObject(cssLoaderOptions), "cssLoaderOptions 必须是一个对象");
        this.config.cssLoaderOptions = cssLoaderOptions
    }

    // 设置 sassLoaderOptions
    setSassLoaderOptions(sassLoaderOptions) {
        assert(_.isPlainObject(sassLoaderOptions), "sassLoaderOptions 必须是一个对象");
        this.config.sassLoaderOptions = sassLoaderOptions
    }

    // cssModulesExcludes
    setCssModulesExcludes(cssModulesExcludes) {
        assert(_.isArray(cssModulesExcludes), "cssModulesExcludes 必须是一个对象");
        cssModulesExcludes.forEach(file => {
            const ext = extname(file).toLowerCase();
            assert(
                ext === '.css' || ext === '.less',
                `Items in the cssModulesExcludes config must end with .css or .less, but got ${file}`,
            );
        });
        this.config.cssModulesExcludes = cssModulesExcludes
    }

    // 设置 disableCSSModules
    setDisableCSSModules(disableCSSModules) {
        assert(_.isBoolean(disableCSSModules), "disableCSSModules 必须是一个布尔值");
        this.config.disableCSSModules = disableCSSModules
    }

    //设置 externals
    setExternals(externals) {
        assert(_.isPlainObject(externals) || _.isString(externals), "externals 必须是一个对象 或 字符串");
        this.config.externals = externals
    }


    // set devtool
    setDevtool(devtool) {
        assert(_.isString(devtool), "devtool 必须是一个字符串");
        this.config.devtool = devtool
    }

    // set devtool
    setManifest(manifest) {
        assert(_.isPlainObject(manifest), "manifest 必须是一个对象");
        this.config.manifest = manifest
    }

    // set devServer
    setDevServer(devServer) {
        assert(_.isPlainObject(devServer), "devServer 必须是一个对象");
        this.config.devServer = devServer
    }

    // 开启dev
    startDev() {
        const service = new Service({
            config: this.config,
            build: this
        });
        service.startDev()
    }

    startBuild() {
        // return
        const service = new Service({
            config: this.config,
            build: this
        });
        service.startBuild()
    }

};
