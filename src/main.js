import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import 'vant/lib/index.css';
import './css/common.css'
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
