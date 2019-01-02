<template>
    <div class="upload">
        <img class="title" :src="list[count].src" alt="" v-show="show">
        <ul class="upList">
            <li v-for="(val,ind) in list" :key="ind"
            @click="showDig(ind)">
                <div class="pic">
                    <img src="http://localhost:8080/src/assets/IdCard/add.png" alt="">
                </div>
                <span>{{val.desc}}</span>
            </li>
        </ul>
        <van-actionsheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        />
    </div>
</template>
<script>
import Vue from 'vue';
import {mapState, mapMutations} from 'vuex';
import { Actionsheet } from 'vant';
import {uploadImg} from '../api/index';
Vue.use(Actionsheet);
export default {
    name:'upload',
    computed: {
        ...mapState({
            list: state=>state.upload.list
        }),
    },
    data(){
        return {
            show: false,
            actions: [
                {
                    name: '拍照'
                },
                {
                    name: '相册'
                },
                {
                    name: '取消'
                }
            ],
            count:0
        }
    },
    methods: {
        ...mapMutations({
            updataList: 'upload/upadteList'
        }),
        onSelect(item) {
            // 点击选项时默认不会关闭菜单，可以手动关闭
            this.show = false;
            console.log(item);
        },
        showDig(ind){
            this.show = true;
            console.log(ind);
            this.count = ind;
        }
    }
}
</script>
<style lang="scss" scoped>
$baseline-px:37.5px;
@function rem($px-values) {
    $baseline-rem: $baseline-px / 1rem * 1;
    $px-values: $px-values / $baseline-rem;
    @return $px-values;
}
.upload{
    width: 100%;
}
.title{
    width: 90%;
    height: auto;
    position: fixed;
    z-index: 9999;
    margin: 0 5%;
    top: 100px;
}
.upList{
    width: 100%;
    display: flex;
    padding: rem(17px) 0;
    li{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .pic{
            width: rem(50px);
            height: rem(40px);
            border:1px solid #ccc;
            border-radius: rem(8px);
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: rem(25px);
                height: auto;
            }
        }
        span{
            margin-top: rem(5px);
            width: rem(50px);
            font-size: rem(14px);
            text-align: center;
        }
    }
}
.van-actionsheet__item{
    background: red;
}
</style>


