import {Vue} from "../main.js"
import Test from "./Test"

new Vue({
    created() {
    },
    components: {Test},
    template: '<Test/>'
}).$mount('#app');
