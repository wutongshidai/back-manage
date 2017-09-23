import Vue from 'vue'
import Vuex from 'vuex'
import goodsManage from './moudles/goods/GoodsManage'
import login from './moudles/login/Login'
import shopManage from './moudles/shop/shopManage'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    goodsManage,
    login,
    shopManage
  }
})
