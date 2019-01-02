import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import 'vant/lib/index.css';
import './css/common.css'
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
