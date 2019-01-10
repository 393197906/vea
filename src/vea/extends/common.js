// import service from '@/service/service'
import * as filters from './filters'
import fetch from './utils/fetch'
import * as utils from './utils'
import { pagination } from './mixin/page'
import * as math from 'number-precision'
import Cache from './components/Cache.js'
export default {
  install: (Vue, options) => {
    Vue.$_util = Vue.prototype.$_util = utils
    Vue.$_math = Vue.prototype.$_math = math // 精度数学库
    Vue.$_createFetch = Vue.prototype.$_createFetch = fetch
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    });
    Vue.mixin(pagination)
    Vue.component('Cache', Cache)
  }
}
