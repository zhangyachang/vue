import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './vuex/index'
Vue.config.productionTip = false
// 引入进来的变量名是定死的 store
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: function (h) {
    return h(App)
  }
})
