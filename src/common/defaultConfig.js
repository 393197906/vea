const _ = require("lodash")
const validateMessage = require("./validateMessage")
const modes = ["vue", "react"]
const veaEnv = process.env.VEA_ENV
module.exports = {
    env: {
        defaultValue: {},
        validate(value) {
            return _.isObject(value)
        },
        onlyConfig: true, // 仅配置文件
        message: `必须是一个对象 且设置过VEA_ENV环境变量`
    },
    mode: {
        defaultValue: "vue",
        validate(value) {
            return _.isString(value) && modes.includes(value.trim().toLowerCase())
        },
        onlyConfig: true, // 仅配置文件
        message: `可用的模式${modes.toString()}`
    },
    // 基础路径
    cwd: {
        defaultValue: process.cwd(),
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge
    },
    // 入口
    entry: {
        defaultValue: undefined,
        validate(value) {
            return _.isString(value) || _.isPlainObject(value)
        },
        message: validateMessage.stringObjectMessage
    },
    // 出口
    outputPath: {
        onlyPlugin: true, // 仅插件文件
        defaultValue: "",
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge
    },
    // 公共路径
    publicPath: {
        defaultValue: "",
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge
    },
    // 复制路径
    copyPath: {
        defaultValue: "",
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge
    },
    // 定义变量
    defined: {
        merge: true,
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    // alias
    alias: {
        merge: true,
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    // 是否启用hash
    hash: {
        defaultValue: false,
        validate(value) {
            return _.isBoolean(value)
        },
        message: validateMessage.booleanMessage
    },
    // 关闭拆包
    disableDynamicImport: {
        defaultValue: false,
        validate(value) {
            return _.isBoolean(value)
        },
        message: validateMessage.booleanMessage
    },
    // babel 设置
    babel: {
        merge: true,
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    // css 公共路径
    cssPublicPath: {
        defaultValue: undefined,
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge
    },
    // css 浏览器列表
    browserslist: {
        defaultValue: undefined,
        validate(value) {
            return _.isArray(value)
        },
        message: validateMessage.arrayMessage
    },
    disableCSSModules: {
        defaultValue: false,
        validate(value) {
            return _.isBoolean(value)
        },
        message: validateMessage.booleanMessage
    },
    // 扩展 post
    extraPostCSSPlugins: {
        defaultValue: undefined,
        validate(value) {
            return _.isArray(value)
        },
        message: validateMessage.arrayMessage
    },
    // 扩展webpack
    extraWebpackPlugins: {
        defaultValue: undefined,
        validate(value) {
            return _.isArray(value)
        },
        message: validateMessage.arrayMessage
    },
    // cssno
    cssnano: {
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    // cssLoader
    cssLoaderOptions: {
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    // lessloader
    lessLoaderOptions: {
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    sassLoaderOptions: {
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    cssModulesExcludes: {
        defaultValue: undefined,
        validate(value) {
            return _.isArray(value)
        },
        message: validateMessage.arrayMessage
    },
    externals: {
        merge: true,
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value) || _.isString(value)
        },
        message: validateMessage.stringObjectMessage
    },
    devtool: {
        defaultValue: "",
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge
    },
    manifest: {
        defaultValue: false,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    devServer: {
        merge: true,
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    htmlTemplate: {
        defaultValue: undefined,
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge
    },
    // eslintoption
    eslintLoaderOptions: {
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    // 部署git 地址
    deployGitPath: {
        defaultValue: "",
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge,
        onlyConfig: true
    },
    // 设置插件
    plugins: {
        onlyConfig: true,
        defaultValue: [],
        validate(value) {
            return _.isArray(value)
        },
        message: validateMessage.arrayMessage
    },
    // 是否清除目录
    clear: {
        onlyPlugin: true,
        defaultValue: true,
        validate(value) {
            return _.isBoolean(value)
        },
        message: validateMessage.booleanMessage
    },
};
