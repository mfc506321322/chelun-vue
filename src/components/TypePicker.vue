<template>
    <van-area 
    :area-list="this.title === '请选择签发地' ? cityColumns : costList" 
    :columns-num="2" 
    :title="title" 
    @confirm="onConfirm" 
    @change="onChange"
    @cancel="onCancel"
    />
</template>
<script>
import Vue from 'vue';
import {mapState, mapActions, mapMutations} from 'vuex';
import { Area } from 'vant';
Vue.use(Area);
export default {
    name: 'TypePicker',
    props:['title'],
    data(){
        return {
            cityColumns:{}
        }
    },
    created () {
        if(this.title === '请选择签发地'){
            this.getCityList().then(res => {
                this.cityColumns = this.cityList;
            });
        }else{
            this.getCostList()
        }
    },
    computed: {
        ...mapState({
            cityList: state=>state.cityPicker.cityList,
            costList: state=>state.cityPicker.costList,
            city: state=>state.cityPicker.city,
            cost: state=>state.cityPicker.cost
        })
    },
    methods:{
        ...mapActions({
            getCityList: 'cityPicker/getCityList',
            getCostList: 'cityPicker/getCostList'
        }),
        ...mapMutations({
            updateState: 'cityPicker/updateState'
        }),
        onConfirm(values){
            if(this.title === '请选择签发地'){
                this.$emit('enterQf',values,0);
                this.updateState({city: values});
                this.getCostList();
            }else{
                this.$emit('enterQf',values,1);
            }
        },
        onChange(pic,vals,ind){
            if(this.title === '请选择签发地'){
                this.$emit('changeQf',pic.getValues(),0);
            }else{
                this.$emit('changeQf',pic.getValues(),1);
            }
        },
        onCancel(){
            this.$emit('close');
        }
    }
}
</script>
<style lang="sass" scoped>

</style>
