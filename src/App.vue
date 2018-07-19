<template>
  <div id="app">
    <vHeader :seller="datas.seller"></vHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 把加载过的组件缓存起来 -->
    <keep-alive>
      <router-view :datas="datas" ref="abc"></router-view>
    </keep-alive>
  </div>
</template>
<script>

import header from './components/mods/header'
import axios from 'axios'
export default {
  data () {
    return {
      datas: {
        seller: {},
        goods: [],
        ratinds: []
      }
    }
  },
  mounted () {
    axios.get('/static/data.json').then(res => {
      this.datas.seller = res.data.seller
      this.datas.goods = res.data.goods
      this.datas.ratinds = res.data.ratinds
      // console.log(this.$refs['abc'])
      /* this.$nextTick( () => {
        this.$refs['abc'].scroll()
      }) */
    })
  },
  name: 'app',
  components: {
    vHeader: header
  }
}
</script>

<style scoped>
  /* scoped 这个写上之后 当前这个模板和当前模板下所有的子模板都应用这个样式 */
.tab .tab-item a.router-link-active{
  color:red;
}
</style>
