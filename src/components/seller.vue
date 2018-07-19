<template>
  <div ref="seller-wrapper" class="seller-wrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="text">{{datas.seller.name}}</div>
          <div class="star-wrapper">
            <star :size="36" :score="datas.score"></star>
            <div class="rate-count">({{datas.seller.ratingCount}})</div>
            <div class="sell-count">月售{{datas.seller.sellCount}}单</div>
          </div>
          <div @click="show = !show" class="collect">
            <span class="icon-favorite" :class="{'active':show}"></span>
            <span class="text">{{show?'已收藏':'收藏'}}</span>
          </div>
          <div class="remark">
            <div class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="num">{{datas.seller.minPrice}}</span>
                元
              </div>
            </div>
            <div class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="num">{{datas.seller.deliveryPrice}}</span>
                元
              </div>
            </div>
            <div class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="num">{{datas.seller.sellCount}}</span>
                分钟
              </div>
            </div>
          </div>
          <div class="activities">
            <div class="bulletin">
              <h1>公告与活动</h1>
              <div class="content">
                {{datas.seller.bulletin}}
              </div>
            </div>
          </div>
          <div class="supports">
            <ul>
              <li class="item" v-for="item in datas.seller.supports">
                <span class="iconMap" :class="icon[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import star from './mods/star'
import icon from './mods/icon'
import Scroll from 'better-scroll'
export default {
  props: ['datas'],
  data () {
    return {
      show: false,
      icon: icon
    }
  },
  components: {
    star
  },
  mounted () {
    /* eslint-disable no-new */
    // 因为ajax已经获取完了 并且这个组件里面并没有计算属性什么的修改dom结构
    new Scroll(this.$refs['seller-wrapper'], {
      click: true
    })
  }
}
</script>
