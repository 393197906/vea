const fs = require('fs')
const path = require('path')
const assert = require('assert')
const mainTemplatePath = path.resolve(__dirname, './template.js')
const mainCssTemplatePath = path.resolve(__dirname, './template.less')
let mainTargetPath = path.resolve(process.cwd(), './src/')
const Mustache = require('mustache')

module.exports = async (rpath = '', cssExtraname) => {
  const extraName = rpath.split(path.sep)[rpath.split(path.sep).length - 1]
  assert(/^[A-Z]{1}[a-zA-Z0-9]+$/.test(extraName), `组件名称 '${extraName}' 不符合首字母大写规则`)
  mainTargetPath = path.join(mainTargetPath, rpath)
  const mainTemplate = fs.readFileSync(mainTemplatePath, 'utf-8')
  const renderMainTemplate = Mustache.render(mainTemplate,
    { extraName, cssExtraname }
  )
  await dirExists(path.resolve(mainTargetPath, './index.js'))
  fs.writeFileSync(path.resolve(mainTargetPath, './index.js'), renderMainTemplate)
  const mainCssTemplate = fs.readFileSync(mainCssTemplatePath, 'utf-8')
  const colors = ['#009999', '#0099CC', '#336699','#33FF99','#33FFCC','#663399','#993399','#CC6699']
  const renderCssMainTemplate = Mustache.render(mainCssTemplate,
    { background: colors[randomNum(0, colors.length - 1)] }
  )
  await dirExists(path.resolve(mainTargetPath, `./index.${cssExtraname}`))
  fs.writeFileSync(path.resolve(mainTargetPath, `./index.${cssExtraname}`), renderCssMainTemplate)
}

/**
 * 生成随机数
 * @param minNum
 * @param maxNum
 * @returns {number}
 */
function randomNum (minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
      break
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      break
    default:
      return 0
      break
  }
}


/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        resolve(stats)
      }
    })
  })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir (dir) {
  return new Promise((resolve, reject) => {
    if (path.extname(dir).trim()) {
      fs.open(dir, 'w', err => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    } else {
      fs.mkdir(dir, err => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    }
  })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists (dir) {
  let isExists = await getStat(dir)
  if (isExists) return isExists
  //如果该路径不存在
  let tempDir = path.parse(dir).dir      //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir)
  let mkdirStatus
  if (status) {
    mkdirStatus = await mkdir(dir)
  }
  return mkdirStatus
}

