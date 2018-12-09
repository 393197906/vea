import vue from "vue"
import Test from "./Test"

new vue({
    components: {Test},
    template: "<Test/>"
}).$mount("#app")
