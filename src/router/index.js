import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods'
import ratings from '../components/rating'
import seller from '../components/seller'
// @是webpack规定的 @代表src这个目录
// 后缀名写不写都可以
// 机制如果没有后缀名的话 会自动去寻找Hello.vue Hello.js
Vue.use(Router)
export default new Router({
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ]
})
