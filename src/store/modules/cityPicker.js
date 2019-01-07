import {cityList, costList} from '@/api/index';

const state = {
    // 原数据
    rootList:[],
    // 签发城市列表
    cityList: {province_list:{},city_list:{},county_list:{}},
    // 可补换城市列表
    costList: {province_list:{},city_list:{},county_list:{}},
    // 选择的签发城市
    city: [],
    // 选择的补换城市
    cost: [],
    // 需要的费用
    money: ''
}

const mutations = {
    updateState(state, action){
        if (Object.keys(action)[0] == 'cost'){
            console.log('1111');
            let value = Object.values(action)[0];
            let proIndex = state.costList.findIndex(item=>item.name==value[0]),
                cityIndex = state.costList[proIndex].list.findIndex(item=>item.name==value[1]);
            state.money = state.costList[proIndex].list[cityIndex].cost;
        }
        state = Object.assign(state, action);
    }
}

const actions = {
    // 获取签发城市列表
    async getCityList({commit}){
        let res = await cityList();
        let obj = {province_list:{},city_list:{},county_list:{}};
        res.data.forEach(item=>{
            item.list.forEach(value=>{
                value.list.forEach(val=>{
                    obj.county_list[val.id] = val.name;
                })
                obj.city_list[value.id] = value.name;
            })
            obj.province_list[item.id] = item.name;
        })
        commit('updateState', {cityList: obj,rootList:res.data})
    },
    async getCostList({commit,state}, action){
        let proIndex = state.rootList.findIndex(item=>item.name==state.city[0].name);
        let cityIndex = state.rootList[proIndex].list.findIndex(item=>item.name==state.city[1].name);
        let res = await costList(1, state.rootList[proIndex].id, state.rootList[proIndex].list[cityIndex].id);
        // console.log('res...', res);
        let obj = {province_list:{},city_list:{},county_list:{}};
        res.data.forEach(item=>{
            if (item.source_city == 1){
                item.name += '(签发地)'
                item.list.forEach(value=>{
                    if (value.source_city == 1){
                        value.name += '(签发地)'
                    }
                    /* value.list && value.list.forEach(val=>{
                        obj.county_list[val.id] = val.name;
                    }) */
                    // obj.city_list[value.id] = value.name;
                })
            }
            item.list.forEach(value=>{
                // console.log('item...',item.id);
                // console.log('value...',value.id);
                let itmIndex = state.rootList.findIndex(items=>items.id==item.id);
                let valIndex = state.rootList[itmIndex].list.findIndex(vals=>vals.id==value.id);
                // console.log(state.rootList[itmIndex].list[valIndex].list);
                state.rootList[itmIndex].list[valIndex].list.forEach(val=>{
                    obj.county_list[val.id] = val.name;
                })
                obj.city_list[value.id] = value.name;
            })
            obj.province_list[item.id] = item.name;
        })
        // console.log('obj...', obj);
        commit('updateState', {costList: obj})
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}