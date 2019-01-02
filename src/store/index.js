import Vue from 'vue';
import Vuex from 'vuex';
import upload from './modules/upload.js';
import createLogger from 'vuex/dist/logger';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        upload
    },
    plugins:[createLogger()]
})