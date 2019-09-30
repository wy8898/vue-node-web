import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: resolve => require(['@/views/ProductList'], resolve)
    },
    {
      path: '/cart/:cartId',
      name: 'cart',
      component: resolve => require(['@/views/Cart'], resolve)
    }
  ]
})
