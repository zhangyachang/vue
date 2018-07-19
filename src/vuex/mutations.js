export default {
  vxaddCart (state, val) {
    // 默认接收的第一个参数是vuex里所定义的数据
    state.vxfood.push(val)
    console.log(state.vxfood)
  },
  vxdecreaseCart (state, food) {
    this.vxfood.forEach((value, index) => {
      if (value.name === food.name) {
        state.vxfood.splice(index, 1)
      }
    })
    console.log(state.vxfood)
  }
}
