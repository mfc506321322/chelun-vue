<template>
    <van-area 
    :area-list="aresList" 
    :columns-num="3" 
    :title="title" 
    @confirm="onConfirm" 
    @change="onChange"
    @cancel="onCancel"
    />
</template>
<script>
import Vue from 'vue';
import { Area } from 'vant';
import aresList from '../utils/area.js';
Vue.use(Area);
export default {
    name: 'AddressPicker',
    props:['title'],
    data(){
        return {
            aresList
        }
    },
    created () {
        this.getList()
    },
    methods:{
        getList(){
            this.aresList = aresList;
        },
        onConfirm(values){
            this.$emit('enterQf',values);
        },
        onChange(pic,vals,ind){
            this.$emit('changeQf',pic.getValues());
        },
        onCancel(){
            this.$emit('close');
        }
    }
}
</script>
<style lang="sass" scoped>

</style>
