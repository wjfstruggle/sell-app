import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import ShopCartCount from 'components/ShopCartCount'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      component: Goods,
      children: [
        {
          path: 'Count',
          component: ShopCartCount
        }
      ]
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active' // router-link-active的配置
})
