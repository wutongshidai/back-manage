import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/core/Home'
import goodsManage from '@/components/core/goodsManage/GoodsManages'
import shopManage from '@/components/core/shopManage/ShopManage'
import login from '@/components/loginView/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      // redirect: '/goodsManage',
      children: [
        {
          path: '/goodsManage',
          name: 'goodsManage',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true
          },
          component: goodsManage
        },
        {
          path: '/shopManage',
          name: 'shopManage',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true
          },
          component: shopManage
        }

      ]
    }
  ]
})
