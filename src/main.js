import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from './api'
import eventbus from './utils/event-bus'
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.use(eventbus)
if(localStorage.getItem('token') && localStorage.getItem('nickName')){
  store.commit('LoginModule/setToken', localStorage.getItem('token'));
  store.commit('LoginModule/setNickName', localStorage.getItem('nickName'));
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
