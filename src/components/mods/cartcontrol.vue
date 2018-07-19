<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart()">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop="addCart()">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
export default {
  props: ['food'],
  methods: {
    ...mapMutations([
      'vxaddCart',
      'vxdecreaseCart'
    ]),
    addCart () {
      if (typeof this.food.count === 'undefined') {
        Vue.set(this.food, 'count', 0)
        Vue.set(this.food, 'active', true)
      }
      this.food.count++
      if (this.food.active) {
        this.vxaddCart(this.food)
        this.food.active = false
      }
    },
    decreaseCart () {
      this.food.count--
      if (this.food.count === 0) {
        this.vxdecreaseCart(this.food)
      }
    }
  },
  computed: {
    ...mapState([
      'vxfood'
    ])
  }
}
</script>
