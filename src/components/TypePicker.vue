<template>
    <van-area 
    :area-list="areaList" 
    :columns-num="2" 
    :title="title" 
    @confirm="onConfirm" 
    @change="onChange"
    @cancel="onCancel"
    />
</template>
<script>
import Vue from 'vue';
import { Area } from 'vant';
import areaList from '../utils/area.js';
Vue.use(Area);
export default {
    props:['title'],
    data(){
        return {
            areaList
        }
    },
    methods:{
        onConfirm(values){
            if(this.title === '请选择签发地'){
                this.$emit('enterQf',values,0);
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
