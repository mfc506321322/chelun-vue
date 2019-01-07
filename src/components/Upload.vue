<template>
    <div class="upload">
        <img
        :class="list[count].src.indexOf('localhost') > -1 ? 'title' : 'news'" 
        :src="list[count].src" 
        v-show="show">
        <ul :class="serValue === '换驾照' ? 'upList' : 'upList2'">
            <li v-for="(val,ind) in list" :key="ind"
            @click="showDig(ind)" v-if="serValue === '换驾照' || val.type">
                <div class="pic">
                    <img :src="val.pic" 
                    :class="val.pic.indexOf('localhost') > -1 ? '' : 'opens'"
                    >
                </div>
                <span>{{val.desc}}</span>
            </li>
        </ul>
        <van-actionsheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        />
    </div>
</template>
<script>
import Vue from 'vue';
import {mapState, mapMutations} from 'vuex';
import { Actionsheet } from 'vant';
import {uploadImg} from '@/api/index';
Vue.use(Actionsheet);
export default {
    name:'upload',
    props:['serValue'],
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
                    name: '拍照',
                    id: 1
                },
                {
                    name: '相册',
                    id: 2
                }
            ],
            count:0
        }
    },
    methods: {
        ...mapMutations({
            updataList: 'upload/updataList'
        }),
        judgePic(){
            let flag = this.list.every(item => {
                return item.pic.indexOf('add.png') === -1;
            })
            this.$emit('changePic',flag);
        },
        async onSelect(item) {
            // 点击选项时默认不会关闭菜单，可以手动关闭
            let res = await uploadImg(item.id);
            if (res.result == 1){
                this.updataList({
                    src:res.data.url,
                    index: this.count
                })
                this.judgePic();
                this.show = false;
            }else{
                alert('上传图片失败');
            }
            /* uploadImg(item.id).then(res=>{
                console.log('res...',res);
                this.updataList({
                    src:res.data.url,
                    index: this.count
                })
                this.judgePic();
                // if (res.code == 1){
                //     let src = '';
                //     if (/picture.eclicks.cn/.test(res.data.image01)) {
                //         src = res.data.image01.replace('http://', '//');
                //     } else {
                //         src = '//picture.eclicks.cn/' + res.data.image01;
                //     }
                //     console.log('111');
                //     this.updataList({
                //         src,
                //         index: this.count
                //     })
                // }else{
                //     alert(res.msg);
                // }
            }) */
        },
        showDig(ind){
            this.show = true;
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
.news{
    width: auto;
    height: 50%;
    position: fixed;
    z-index: 9999;
    left:50%;
    transform: translate3d(-50%,0,0);
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
            overflow: hidden;
            img{
                width: rem(25px);
                height: auto;
                &.opens{
                    width: 100%;
                    height: 100%;
                }
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
.upList2{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: rem(17px) rem(12.5px);
    li{
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
            overflow: hidden;
            img{
                width: rem(25px);
                height: auto;
                &.opens{
                    width: 100%;
                    height: 100%;
                }
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


