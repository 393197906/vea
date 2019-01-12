const matchCatch = (keys, caches) => {
    return Object.keys(caches).reduce((container, item) => {
        const index = keys.findIndex(key => key === item)
        if (index > -1) {
            return {...container, [item]: caches[item]}
        }
        return container
    }, {})
};

let enduringCache = [] // 持久化cache
export default {
    name: 'Cache',
    props: {
        keys: { // 缓存路径
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            cache: enduringCache
        }
    },
    created() {
        this.$watch('keys', val => {
            this.cache = matchCatch(val, this.cache)
        }, {
            immediate: true
        })
    },
    destroyed() {
        enduringCache = this.cache
    },
    render() {
        const vnode = this.$slots.default[0]
        const componentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
            const {cache} = this
            const key = vnode.key == null
                ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key
            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance
            } else {
                cache[key] = vnode
            }
            vnode.data.keepAlive = true
        }
        // console.log('2', this.cache)
        return vnode
    }
}
