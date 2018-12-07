import Vue from "vue"
import Test from "./Test"

new Vue({
    created() {
        alert(11)
    },
    components: {Test},
    template: '<Test/>'
}).$mount('#app')
