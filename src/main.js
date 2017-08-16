/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App'
import router from './router'
import store from './store'
import { setDPR, remChange } from './js/remChange'

Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

setDPR()
remChange()

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
