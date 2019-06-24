import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Mint from 'mint-ui'
import font from './assets/js/font'
import {post,fetch,buildParams} from './assets/js/http'
import './assets/js/default.js'
import 'mint-ui/lib/style.css'
import './assets/css/base.css'
Vue.use(Mint)
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=fetch;
Vue.prototype.$sting=buildParams;
Vue.config.productionTip = false
font()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
