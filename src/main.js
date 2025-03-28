import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/global.less'
import '@/style/element.less'
import 'lib-flexible/flexible.js'
import './globalComponents'
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
