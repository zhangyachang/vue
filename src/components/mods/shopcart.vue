<template>
  <div class="shopCart">
    <div @click="showa" class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo active">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="badge" v-show="totalPrice>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active':totalPrice}">¥{{totalPrice}}</div>
        <div class="desc" v-show="totalPrice<99">灵虚加配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough': totalPrice>=minPrice}">
        <div class="pay" >{{payDesc}}</div>
      </div>
    </div  >
    <transition name="transHeight">
      <div class="shopcart-list" v-show="totalPrice>0 && show">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div ref="listcontent" class="list-content">
          <ul>
            <li class="food" v-for="item in food">
              <span class="name">{{item.name}}</span>
              <div class="price">
                <span>¥{{item.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcountrol :food="item"></cartcountrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Scroll from 'better-scroll'
import cartcountrol from './cartcontrol'
// 滚动插件必须要等dom更新之后再new才可以
export default {
  // 配送费  起步价  数量大于0的商品
  props: ['deliveryPrice', 'minPrice', 'food'],
  data () {
    return {
      show: false
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.food.forEach(food => {
        total += food.count * food.price
      })
      return total
    },
    totalCount () {
      let count = 0
      this.food.forEach(food => {
        count += food.count
      })
      return count
    },
    // 还差多少元起送
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥${this.minPrice - this.totalPrice}元起送`
      } else {
        return `去结算`
      }
    }
  },
  methods: {
    empty () {
      this.food.forEach(val => {
        val.count = 0
      })
    },
    showa () {
      this.show = !this.show
      // 等待dom更新完之后
      this.$nextTick(() => {
        if (!this.sc) {
          this.sc = new Scroll(this.$refs['listcontent'], {
            click: true
          })
        }
        // 强制重新计算高度  this.sc.refresh()
      })
    }
  },
  components: {
    cartcountrol
  }
}
</script>
