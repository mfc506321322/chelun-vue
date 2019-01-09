import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '../pages/index'
import Address from '../pages/address'
import Canvas from '../pages/canvas'
Vue.use(Router)

// const Indexs = ()=>import('@/pages/index');
// const Address = ()=>import('@/pages/address');

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
            path: '/canvas/:num',
            name: 'canvas',
            component: Canvas
        },
        {
            path: '/',
            redirect:'/index/0'
        }
    ]
})