import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
// import ShopCartCount from 'components/ShopCartCount'
// import Login from 'views/login/login'
// import Home from 'views/home/home'
// import Main from 'views/main/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      component: Goods
      // children: [
      //   {
      //     path: 'Count',
      //     component: ShopCartCount
      //   }
      // ]
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
    // {
    //   path: '/login',
    //   component: Login
    // },
    // {
    //   path: '/home',
    //   component: Home
    // },
    // {
    //   path: '/main',
    //   component: Main
    // }
  ],
  linkActiveClass: 'active' // router-link-active的配置
})
