/**
 * @description 时间格式化  时间戳转换为时间
 * @param date
 * @param fmt
 * @return {*}
 */
import * as math from 'number-precision'

export const regexp = {
  number: /^[0-9]*\.?[0-9]*$/, // 数字
  float: /^(-?\d+)(\.\d+)?$/, // 浮点数
  zh: /^[\u4e00-\u9fa5]{0,}$/, // 汉字
  mobilePhone: /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, // 手机号
  telPhone: /^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/ //  固定电话
}

export function formatDate (date, fmt) {
  if (!date) {
    return ''
  }
  // if (typeof date !== 'string') {
  //   return ''
  // }
  date *= (date.toString().length === 10 ? 1000 : 1)
  let _date = new Date(date)
  let _fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  let o = {
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds()
  }
  if (/(y+)/.test(_fmt)) {
    _fmt = _fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(_fmt)) {
      _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return _fmt
}

/**
 * @description 时间格式化  时间字符串转换为时间戳
 * @param date
 * @param len     默认时间戳长度为10位
 * @return {*}
 */
export function dateToStamp (str, len = 10) {
  let date = new Date(str)
  return parseInt(date.getTime() / (len === 13 ? 1 : 1000))
}

/**
 * @description 数组去重
 * @param arr
 * @return {[*]}
 */
export function unique (arr) {
  return [...new Set(arr)]
}

/**
 * @description 获取对象数组某些项
 * @param arr
 * @param keys
 * @return {*}
 */
export function getOptionArray (arr, keys) {
  let newArr = []
  if (!keys) {
    return arr
  }
  let _keys = keys.split(',')
  let newArrOne = {}
  // 是否只是需要获取某一项的值
  if (_keys.length === 1) {
    for (let i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i][keys])
    }
    return newArr
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    newArrOne = {}
    for (let j = 0, len1 = _keys.length; j < len1; j++) {
      newArrOne[_keys[j]] = arr[i][_keys[j]]
    }
    newArr.push(newArrOne)
  }
  return newArr
}

/**
 * @description 深拷贝
 * @param source
 * @return {*}
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object' && !(source[keys] instanceof Date)) {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 字符串截取
 * @param value
 * @param length
 * @returns {string}
 */
export const sublen = (value, length = 8) => {
  if (!value) return ''
  return value.length > length ? `${value.substr(0, length)}...` : value
}

/**
 * 去除对象数组中某一属性重复的对象
 * @param obj
 * @param target
 * @returns {string}
 */
export const uniqueObj = (obj, target) => {
  let hash = {}
  let temp = []
  temp = obj.reduce(function (item, next) {
    const targetVal = next[target]
    if (!hash[targetVal]) {
      hash[targetVal] = true && item.push(next)
    }
    return item
  }, [])
  return temp
}

/**
 * 不四舍五入保留n位小数
 * @param val
 * @param len 默认保留两位小数
 * @returns {string}
 */
export function formatNub (val, len = 2) {
  return Math.floor(val * Math.pow(10, len)) / Math.pow(10, len)
}

/**
 * 四舍五入保留n位小数
 * @param val
 * @param len 默认保留两位小数
 * @returns {string}
 */
export function fixedTo (val, len = 4) {
  const temp = parseFloat(val).toFixed(len)
  if (!isNaN(temp)) {
    return temp
  }
  if (val === '') {
    return ''
  }
  return 0
}

/**
 * 判断元素是否在数组内
 * @param val
 * @param arr {Array}
 * @returns {*}
 */
export const inArray = (val, arr) => {
  for (var i = 0; i < arr.length; i++) {
    if (val === arr[i]) {
      return i
    }
  }
  return -1
}

/**
 * 函数节流
 * @param fn 需要被节流的函数
 * @param delay 触发执行的时间间隔
 * @param mustDelay 必然触发执行的间隔时间
 * @returns {*}
 */
export function delayFn (fn, delay, mustDelay) {
  let timer = null
  let tStart
  return function () {
    let context = this
    let args = arguments
    let tCur = +new Date()
    // 先清理上一次的调用触发（上一次调用触发事件不执行）
    clearTimeout(timer)
    // 如果不存触发时间，那么当前的时间就是触发时间
    if (!tStart) {
      tStart = tCur
    }
    // 如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
    if (tCur - tStart >= mustDelay) {
      fn.apply(context, args)
      tStart = tCur
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}

// /**
//  * 函数节流
//  * @param fn 需要被节流的函数
//  * @param delay 触发执行的时间间隔
//  * @param mustDelay 必然触发执行的间隔时间
//  * @returns {*}
//  */
// export function test (fn, delay, mustDelay) {
//   let now
//   let count = 0
//   let time
//   return function () {
//     let applyNow = Date.now()
//     now = now || applyNow
//     count++
//     if (!time) {
//       time = setInterval(() => {
//         if (applyNow - now > 500) {
//
//         }
//       })
//     }
//     let context = this
//     let args = arguments
//   }
// }

// 设置localStorage
export function setStorage (key, value) {
  if (typeof key !== 'string') {
    return
  }
  let setValue = JSON.stringify(value)
  localStorage.setItem(key, setValue)
}

// 获得localStorage
export function getStorage (key) {
  if (typeof key !== 'string') {
    return
  }
  let getValue = localStorage.getItem(key)

  if (!getValue) {
    return null
  } else {
    return JSON.parse(getValue)
  }
}

// 递归函数处理传入层级选择器的函数
export function recursion (list, map) {
  const result = []
  // 遍历 list
  list.forEach((item) => {
    // 读取 map 的键值映射
    const value = item[ map.value ].toString()
    const label = item[ map.label ]
    let children = item[ map.children ]
    let selected = false

    // 如果有子节点，递归
    if (children) {
      children = recursion(children, map)
    }
    result.push({
      value,
      label,
      children,
      selected
    })
  })
  return result
}

// 递归函数处理传入层级树形控件的函数
export function recursionTree (list, map) {
  const result = []
  // 遍历 list
  list.forEach((item) => {
    // 读取 map 的键值映射
    const value = item[ map.value ]
    const title = item[ map.title ]
    let children = item[ map.children ]

    // 如果有子节点，递归
    if (children) {
      children = recursionTree(children, map)
    }
    result.push({
      value,
      title,
      children
    })
  })
  return result
}

/**
 * @description 清除对象中值为空的属性
 * @param obj
 * @return {{}}
 */
export function filterParams (obj) {
  let _newPar = {}
  for (let key in obj) {
    if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
      _newPar[key] = obj[key].map(item => {
        return filterParams(item)
      })
    } else if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
      _newPar[key] = obj[key]
    }
  }
  return _newPar
}

/**
 * @description reduce
 * @param obj
 * @return {{}}
 */
export function reduceItem (data, key, len = 4) {
  return Array.from(data).reduce(function (prev, cur) {
    let temp = cur[key] ? cur[key] : 0
    return (math.plus(temp, prev)).toFixed(len)
  }, 0)
}

export function getToken (tokenKey = 'user_info') {
  return JSON.parse(sessionStorage.getItem(tokenKey)).token
}

export function setToken (tokenKey = 'user_info', token) {
  return sessionStorage.setItem(tokenKey, token)
}

export function removeToken (tokenKey = 'user_info') {
  return sessionStorage.removeItem(tokenKey)
}

/**
 * 合计数量
 * @param items
 * @param key
 * @returns {number}
 */
export function totalNumber (items, key) {
  if (!key) return
  return items.reduce((container, item) => {
    const value = item[key] || 0
    return math.plus(container, value)
  }, 0)
}
