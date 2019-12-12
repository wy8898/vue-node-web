import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {post,get} from './axios/index'
import '@/assets/css/index.scss'
import {currency} from '@/utils/utils';
import store from '@/store/store';
import VueCookies from 'vue-cookies'

Vue.prototype.$post = post;
Vue.prototype.$get = get;

Vue.use(ElementUI);
Vue.use(VueCookies)

Vue.config.productionTip = false;
Vue.filter("currency",currency)

new Vue({
  // el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
}).$mount("#app");






