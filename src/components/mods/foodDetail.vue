<template>
  <transition name="move">
    <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
      <div class="foodDetail">
        <div @click="showDetail = !showDetail" class="back">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="foodDetails.image" width="100%" height="425" alt="">
        <div class="info">
          <div class="title">{{foodDetails.title}}</div>
          <div class="desc">
            <span class="">月售{{foodDetails.sellCount}}</span>
            <span>好评率{{foodDetails.rating}}%</span>
          </div>
          <div class="price">¥{{foodDetails.price}}</div>
          <transition name="fade">
            <div v-show="foodDetails.count === 0 ||foodDetails.count === undefined" class="shopCart">
              <div @click="add" class="text">加入购物车</div>
            </div>
          </transition>
          <cartcontrol ref="cartcontrol" :food="foodDetails"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{foodDetails.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">商品评价</div>
          <div class="classify">
            <span v-for="(item,index) in classify" class="item" :class="{'active':item.active,'bad':index === 2 ,'badActive':item.active && index===2}" @click="classifyclick(item)">{{item.name}}{{item.count}}</span>
          </div>
          <div class="switch">
            <span class="icon-check_circle" :class="{'on':flag}" @click="flag = !flag"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="item in computed_commonts">
                <div class="userInfo">
                  <div class="time">{{item.rateTime}}</div>
                  <div class="user">
                    <span>{{item.rateTime}}</span>
                    <img :src="item.avatar" width="12" height="12" alt="">
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="text">{{item.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Scroll from 'better-scroll'
import cartcontrol from './cartcontrol'
export default {
  props: ['foodDetails'],
  data () {
    return {
      showDetail: false,
      classify: [
        {name: '全部', count: 0, commont: [], active: true},
        {name: '推荐', count: 0, commont: [], active: false},
        {name: '吐槽', count: 0, commont: [], active: false}
      ],
      commonts: [],
      flag: true
    }
  },
  methods: {
    add () {
      this.$refs['cartcontrol'].addCart()
      console.log(this.foodDetails)
    },
    foodShow () {
      // 这里才是数据传递过来
      this.showDetail = true
      this.$nextTick(() => {
        this.commonts = this.foodDetails.ratings
        this.foodDetails.ratings.forEach(val => {
          this.classify[0].count++
          this.classify[0].commont.push(val)
          if (val.rateType) {
            this.classify[2].count++
            this.classify[2].commont.push(val)
          } else {
            this.classify[1].count++
            this.classify[1].commont.push(val)
          }
        })
      })
      this.$nextTick(() => {
        // 解决每一次进入详情页都会初始化一次
        if (!this.sc) {
          /* eslint-disable no-new */
          this.sc = new Scroll(this.$refs['detailWrapper'], {
            click: true
          })
        }
      })
    },
    classifyclick (item) {
      this.commonts = item.commont
      this.classify.forEach(val => {
        val.active = false
      })
      item.active = true
    }
  },
  components: {
    cartcontrol
  },
  computed: {
    computed_commonts () {
      let arr = []
      if (this.flag) {
        // 只看有内容评价
        this.commonts.forEach(val => {
          if (val.text.length > 0) {
            arr.push(val)
          }
        })
      } else {
        // 看全部评价
        return this.commonts
      }
      return arr
    }
  },
  mounted () {

  }
}
</script>
