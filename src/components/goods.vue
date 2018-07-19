<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="item in datas.goods">
          <span class="text">
            <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in datas.goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="detailPage(food)">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}</span>
                  <div class="price">
                    <span class="newPrice">¥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :food="food" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice"></shopcart>
    <foodDetail :foodDetails="foodDetails" ref="foodDetail"></foodDetail>
    <!-- <div class="shopCart"></div>
    <div class="detailWrapper"></div> -->
  </div>
</template>
<script>
import icon from './mods/icon'
import Scroll from 'better-scroll'
import shopcart from './mods/shopcart'
import cartcontrol from './mods/cartcontrol'
import foodDetail from './mods/foodDetail'
export default {
  props: ['datas'],
  data () {
    return {
      icon,
      foodDetails: {}
    }
  },
  computed: {
    food () {
      let arr = []
      this.datas.goods.forEach(goods => {
        goods.foods.forEach(foods => {
          if (foods.count > 0) {
            arr.push(foods)
          }
        })
      })
      return arr
    }
  },
  mounted () {
    // dom更新好之后 执行 === window.onload
    // dom 更新完 ==> new Scroll()  => ajax获取到数据 => dom
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new Scroll(this.$refs['menuWrapper'], {
        click: true
      })
      /* eslint-disable no-new */
      new Scroll(this.$refs['foodsWrapper'], {
        click: true
      })
    })
  },
  methods: {
    scroll () {
      /* eslint-disable no-new */
      new Scroll(this.$refs['foodsWrapper'])
    },
    detailPage (value) {
      this.foodDetails = value
      this.$refs['foodDetail'].foodShow()
    }
  },
  components: {
    shopcart,
    cartcontrol,
    foodDetail
  }
}
</script>
