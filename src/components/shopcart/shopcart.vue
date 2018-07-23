<template>
  <div class="shopCart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">
          <span class="price-t">￥{{totalPrice}}</span>
          <span class="text">另需配送费￥{{deliveryPrice}}元</span>
        </div>
      </div>
      <div @click="payMoney" class="content-right" :class="pay">
        <p class="pay">{{payClass}}</p>
      </div>
    </div>
    <!--子路由挂载-->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 1,
              count: 1
            }
          ]
        }
      },
      deliveryPrice: { // 组件之间的通信，通过v-bind:
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    computed: {
      payClass() {
        if (this.minPrice <= this.totalPrice) {
          return `去结算`
        } else if (this.minPrice > this.totalPrice) {
          return `还差￥${this.minPrice - this.totalPrice}起送`
        } else {
          return `￥${this.minPrice}起送`
        }
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach(food => {
          count += food.count
        })
        return count
      },
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(food => {
          total += food.count * food.price
        })
        return total
      },
      pay() {
        if (this.minPrice <= this.totalPrice) {
          return 'enough'
        } else {
          return 'not-enough'
        }
      }
    },
    methods: {
      payMoney() {
        if (this.totalPrice > this.minPrice) {
          this.$router.push({
            path: `/goods/Count`
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .shopCart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background-color: #141d27
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          margin: 0 12px
          width: 56px
          height: 56px
          box-sizing: border-box
          padding: 6px
          border-radius: 50%
          position: relative
          top: -10px
          background-color: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: rgba(255, 255, 255, 0.4)
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          margin: 12px 0
          line-height: 24px
          font-size: 0
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
          .price-t
            line-height: 24px
            font-size: 16px
            font-weight: 700
            border-right: 1px solid rgba(255, 255, 255, 0.1)
            padding-right: 12px
          .text
            line-height: 24px
            font-size: 14px
            padding-left: 12px
            color: rgba(255, 255, 255, 0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        text-align: center
        color: rgba(255, 255, 255, 0.4)
        background: #2b333b
        &.enough
          background: #1b8000
          color: #fff
        &.not-enough
          background: #2b333b
        .pay
          padding: 12px 8px
          line-height: 24px
          font-size: 12px
          font-weight: 700
</style>
