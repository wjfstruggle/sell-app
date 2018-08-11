<!--购物车-->
<template>
  <div>
    <div class="shopCart">
      <div class="content">
        <div class="content-left" @click="toggleList">
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
      <!--购物车详细信息-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods" :key="food.id">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.count*food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food">
                  </cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <!--子路由挂载-->
      <router-view>
      </router-view>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import CartControl from 'components/cartcontrol/cartcontrol'

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
        detailShow: false,
        fold: true
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
      // 计算总数量
      totalCount() {
        let count = 0
        this.selectFoods.forEach(food => {
          count += food.count
        })
        return count
      },
      // 计算总价格
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(food => {
          total += food.count * food.price
        })
        return total
      },
      // 判断价格起步价，给定active样式
      pay() {
        if (this.minPrice <= this.totalPrice) {
          return 'enough'
        } else {
          return 'not-enough'
        }
      },
      listShow() {
        let _this = this
        if (!this.totalCount) {
          _this.fold = true
          return false
        }
        let show = !this.fold
        // 购物车栏商品超过max-height，实现滚动
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              _this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      // 支付提示信息
      payMoney() {
        if (this.totalPrice > this.minPrice) {
          alert(`已支付${this.totalPrice}元`)
        }
      },
      // 购物车详细订单
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      hideList() {
        this.fold = true
      },
      // 清空购物车
      empty() {
        this.selectFoods.forEach(food => {
          food.count = 0
        })
      }
    },
    components: {
      CartControl
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

    /*购物车详细信息.css*/
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        background: #f3f5f7
        padding: 0 18px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          display: inline-block
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .empty
          font-size: 12px
          color: rgb(0, 160, 220)
          float: right
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          -webkit-box-sizing: border-box
          -moz-box-sizing: border-box
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 24px
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  /*模糊背景*/
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)

  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s

  &.fade-enter, &.fade-leave-active
    opacity: 0
    background: rgba(7, 17, 27, 0)
</style>
