import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies'
import {post,get} from '../axios/index'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    userInfo:VueCookies.get("userId"),
    cartCount:0
  },
  mutations:{
    updataUserInfo(state,userInfo){
      state.userInfo = userInfo;
      VueCookies.set("userId",userInfo)
    },
    updataCartCount(state){

      get("/cart/count", {
        userId:state.userInfo.userId
      }).then(res => {
        if (res.status === 0) {
          state.cartCount = res.result.count
        }
      })

    }
  }
})


export default store;
