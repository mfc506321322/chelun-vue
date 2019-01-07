import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '../pages/index'
import Address from '../pages/address'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/index/:num',
            name: 'index',
            component: Indexs
        },
        {
            path: '/address/:num',
            name: 'address',
            component: Address
        },
        {
            path: '/',
            redirect:'/index/0'
        }
    ]
})