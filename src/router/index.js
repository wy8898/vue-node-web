import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: resolve => require(['@/views/ProductList'], resolve)
    },
    {
      path: '/cart',
      name: 'cart',
      component: resolve => require(['@/views/Cart'], resolve)
    },
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['@/views/Address'], resolve)
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: resolve => require(['@/views/OrderConfirm'], resolve)
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: resolve => require(['@/views/orderSuccess'], resolve)
    }
  ]
});
