import Vue from 'vue'

import {post,get} from './axios/index'

Vue.prototype.$post = post;
Vue.prototype.$get = get;

import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import '@/assets/css/index.scss'

Vue.config.productionTip = false;

new Vue({
  // el: '#app',
  router,
  components: {App},
  template: '<App/>'
}).$mount("#app");






