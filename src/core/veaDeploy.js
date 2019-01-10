const autoGitFactory = require("yt-auto-git");
const path = require('path');
const fs = require("fs")
const assert = require('assert')
const _ = require("lodash")
module.exports = class veaDeploy{
    constructor(){
        this.branch = "" ;
        this.distPath = "";
        this.dirPath = "";
        this.gitPath = "";
        this.doneCallBack = ()=>{}
    }
    // 设置分支
    setBranch(value){
        assert(_.isString(value),"分支名称必须是一个字符串")
        this.branch = value
        return this
    }
    // 设置需要上传的文件夹路径
    setDistPath(value){
        assert(_.isString(value),"需要上传的文件夹路径必须是一个字符串")
        this.distPath = value
        return this
    }
    // 设置git文件路径
    setDirPath(value){
        assert(_.isString(value),"git文件路径必须是一个字符串")
        this.dirPath = value
        return this
    }
    // 设置gitpath
    setGitPath(value){
        assert(_.isString(value),"分支名称必须是一个字符串")
        this.gitPath = value
        return this
    }
    // 设置上传完成回调
    setDoneCallBack(value){
        assert(_.isFunction(value),"分支名称必须是一个函数")
        this.doneCallBack = value
        return this
    }
    // 验证
    validate(){
        assert(this.branch,"请设置分支名称")
        assert(this.distPath && fs.existsSync(this.distPath),"需要上传的文件夹路径不能为空且真实存在")
        assert(this.dirPath,"请设置git文件夹路径")
        assert(this.gitPath,"请设置git地址")
    }
    // 上传
    upload(){
        // const branch = process.env.VEA_ENV || "dev";
        // const distPath = path.resolve(process.cwd(), `dist/${branch}/`);
        // const dirPath = path.resolve(process.cwd(), `../gitDeploy/.youxianManagementAutoGit/`);
        // const gitPath = 'git@gitee.com:sdyituo/youxian_front.git';
        this.validate()
        const autoGit = autoGitFactory({
            branch:this.branch,
            gitPath:this.gitPath,
            distPath:this.distPath,
            dirPath:this.dirPath
        });
        autoGit.on("done", async () => {
            console.log("部署文件上传成功");
            this.doneCallBack()
        });
        autoGit.emit('start');
    }
};
