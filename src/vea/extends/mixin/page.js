export const pagination = {
  data () {
    return {
      page: 1,
      pre_page: 20,
      total_count: 0,
      export_total: 100000,
      modal: {
        page: 1,
        pre_page: 13,
        total_count: 0
      }
    }
  }
  // created () {
  //   this.initList()
  // },
  // watch: {
  //   page: 'getData'
  // },
  // methods: {
  //   /**
  //    * 获取请求参数 默认只传递page(页码) pre_page(每页条数) 可以传递指定对象合并或覆盖原参数
  //    * @param params
  //    * @returns {*}
  //    */
  //   getParams (params) {
  //     return Object.assign({
  //       page: this.page,
  //       pre_page: this.pre_page
  //     }, params)
  //   },
  //   /**
  //    * 推送数据到list中 如需特殊处理,通过传递一个filter来过滤数据
  //    * @param list
  //    * @param filter
  //    */
  //   pushToList (list, filter) {
  //     list.forEach(item => {
  //       if (typeof filter === 'function') {
  //         this.list.push(filter(item))
  //       } else {
  //         this.list.push(item)
  //       }
  //     })
  //   },
  //   /**
  //    * 初始化列表
  //    */
  //   initList () {
  //     this.page = 1
  //     this.list = []
  //     this.getData()
  //   },
  //   /**
  //    * @overwrite
  //    *请求列表数据方法 用此mixin的需要重写该方法
  //    */
  //   getData () {
  //     console.log(1)
  //     // 每个列表自己的获取数据的方法需要重写
  //   }
  // }
}
