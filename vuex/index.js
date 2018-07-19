import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  age: [1, 2, 3, 4, 5, 6],
  name: 'abc',
  vxcart: []
}
// 主要是用来操控 state里面的数据的
const mutations = {
  addage () {
    state.age++
  },
  jian () {
    state.age--
  },
  vxaddCart (state, value) {
    state.vxcart.push(value)
  },
  vxjian (state, value){
    state.vxcart.forEach( (val, index) =>{
      if (val.title === value.title) {
        state.vxcart.splice(index, 1)
      }
    })
  }
}
// 来调用mutations 里的方法
// 可以进行异步操作
const actions = {
  addagepro (a) {
    // 默认接收了一个参数
    // 可以先做一些其他的东西 再去进行我们上面的操作
    console.log(a)
    console.log(a.commit('jian'))
  }
}
// 相当于 vue里面的computed的作用 作用于state 过滤操作...
const getters = {
  guolv (state) {
    /* return state.age.filter( function (i) {
      return i > 5
    } ) */
    state.name = '123'
  }
}
// 语法检测的时候 new必须进行赋值 下面这一段代码是new的时候不赋值也是可以的
/* eslint-disable no-new */
export default new Vuex.Store({
  // 用来保存数据的
  state,
  mutations,
  actions,
  getters
})
