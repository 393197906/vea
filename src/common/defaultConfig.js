const _ = require("lodash")
const validateMessage = require("./validateMessage")
module.exports = {

    // 入口
    entry: {
        defaultValue: undefined,
        validate(value) {
            return _.isString(value) || _.isPlainObject(value)
        },
        message: validateMessage.stringObjectMessage
    },
    // 基础路径
    cwd: {
        defaultValue: process.cwd(),
        validate(value) {
            return _.isString(value)
        },
        message: validateMessage.stringMessge
    },
    // 出口
    outputPath: {
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
    define: {
        defaultValue: undefined,
        validate(value) {
            return _.isPlainObject(value)
        },
        message: validateMessage.objectMessage
    },
    // alias
    alias: {
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
        defaultValue: undefined,
        validate(value) {
           return  _.isPlainObject(value) || _.isString(value)
        },
        message: validateMessage.stringObjectMessage
    },
    devtool: {
        defaultValue: "",
        validate(value) {
            return  _.isString(value)
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
};
