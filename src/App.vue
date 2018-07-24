<template>
  <div>
    <v-header :seller="seller"></v-header>
    <ul class="tab border-1px">
      <li class="tab-item">
        <router-link to="goods">商品</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </li>
      <li class="tab-item">
        <router-link to="seller">商家</router-link>
      </li>
      <li class="tab-item">
        <router-link to="login">登录</router-link>
      </li>
    </ul>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/header/header'
  import Login from 'views/login/login'
  import 'vue-resource'
  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {
          type: Object
        }
      }
    },
    created() {
      this.$http.get('api/seller').then(response => {
        response = response.body // 拿到本地数据seller
        // 判断接口code是否为0
        if (response.errno === ERR_OK) {
          this.seller = response.data
          // console.log(this.seller)
        }
      })
    },
    components: {
      VHeader,
      Login
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .tab
    display: flex
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    text-align: center
    .tab-item
      flex: 1
      font-size: 14px
      color: rgb(77, 85, 93)
      a
       &.active
        color: rgb(240,20,20)
</style>
