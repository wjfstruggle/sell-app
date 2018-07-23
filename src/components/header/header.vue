<template>
  <div>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img width="64" height="64" :src="seller.avatar">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="num" v-if="seller.supports" @click="detailShow">
          <em class="len">{{seller.supports.length}}个</em>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin" @click="detailShow">
        <i class="icon-bulletin"></i><span class="title">{{seller.bulletin}}</span><i
        class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="" width="100%" height="100%">
      </div>
      <transition name="fade">
        <div class="detail" v-show="ShowDetail">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score">
                </star>
              </div>
              <div class="info-wrapper">
                <div class="info">
                  <i class="line"></i>
                  <h2 class="info-name">优惠信息</h2>
                  <i class="line"></i>
                </div>
                <ul v-if="seller.supports" class="supports">
                  <li v-for=" (item, index) in seller.supports" :key="index" class="support-item">
                    <i class="icon" :class="classMap[seller.supports[index].type]"></i>
                    <span class="description">{{seller.supports[index].description}}</span>
                  </li>
                </ul>
              </div>
              <div class="info-wrapper">
                <div class="info">
                  <i class="line"></i>
                  <h2 class="info-name">商家公告</h2>
                  <i class="line"></i>
                </div>
                <p class="bulletins">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="closeShow">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'components/star/star'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ShowDetail: false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      detailShow() {
        this.ShowDetail = true
      },
      closeShow() {
        this.ShowDetail = false
      }
    },
    components: {
      Star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px
      .num
        position: absolute
        right: 12px
        bottom: 18px
        height: 24px
        line-height: 24px
        text-align: center
        padding: 0 8px
        border-radius: 14px
        color: rgb(255, 255, 255)
        background: rgba(0, 0, 0, 0.2)
        .len
          vertical-align: top
          font-size: 10px
          height: 24px
        .icon-keyboard_arrow_right
          vertical-align: top
          line-height: 24px
          margin-left: 2px
          font-size: 10px
    .bulletin
      position: relative
      height: 28px
      padding: 0 12px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      line-height: 28px
      background-color: rgba(7, 17, 27, 0.2)
      .icon-bulletin
        display: inline-block
        vertical-align: top
        position: relative
        top: 7px
        bg-image('bulletin')
        width: 22px
        height: 12px
        background-size: 22px 12px
        background-repeat: no-repeat
      .title
        vertical-align: top
        font-size: 10px
        margin: 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        bottom: 8px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 100
      background: rgba(7, 17, 27, 0.8)
      overflow: auto
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            font-size: 16px
            text-align: center
          .info-wrapper
            margin: 28px 36px
            .info
              display: flex
              text-align: center
              .line
                flex: 1
                position: relative
                top: -6px
                border-1px(rgba(255, 255, 255, 0.2))
              .info-name
                line-height: 14px
                font-size: 14px
                font-weight: 700
                margin: 0 12px
                color: #fff
            .bulletins
              margin-top: 24px
              padding: 0 12px
              line-height: 24px
              font-size: 12px
            .supports
              padding: 24px 24px 0 24px
              font-size: 0
              .support-item
                margin-bottom: 12px
                &:last-child
                  margin-bottom: 0
                .icon
                  display: inline-block
                  vertical-align: middle
                  width: 16px
                  height: 16px
                  margin-right: 6px
                  background-size: 16px 16px
                  background-repeat: no-repeat
                  &.decrease
                    bg-image('decrease_1')
                  &.discount
                    bg-image('discount_1')
                  &.guarantee
                    bg-image('guarantee_1')
                  &.invoice
                    bg-image('invoice_1')
                  &.special
                    bg-image('special_1')
                .description
                  display: inline-block
                  vertical-align: middle
                  line-height: 12px
                  font-size: 12px
                  color: #fff
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
        color: rgba(255, 255, 255, 0.5)
    .fade-enter, .fade-leave-to
      opacity: 0
      background: rgba(7, 17, 27, 0.8)
    .fade-enter-active, .fade-leave-active
      transition: all 0.5s
</style>
