// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import VueCookie from 'vue-cookie'
import { store } from './store/Store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  var token = sessionStorage.getItem('SET_TOKEN')
  var adminState = sessionStorage.getItem('adminState')
  // var a = window.localStorage.getItem('VuexStore')
  if (token) {
    store.state.login.token = 'true'
    store.state.login.adminState = JSON.parse(adminState)
  }
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.login.token) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
