import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from './modules/LoginModule'//登陆模块的vuex
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    LoginModule
  }
})
