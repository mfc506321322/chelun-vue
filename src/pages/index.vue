<template>
    <div class="wrap">
        <header class="header">
            <!-- <ul class="topTab">
                <li 
                v-for="(val,ind) in topTab" 
                :class="ind == topCount ? 'active' : ind == (topCount-1) ? 'prevActive' : 'normal'">
                    {{val}}
                </li>
            </ul> -->
            <div class="banner">
                <van-swipe :autoplay="3000" indicator-color="white" :show-indicators='false'>
                    <van-swipe-item>
                        <p>已有23333个用户在车轮补换驾照成功</p>
                        <img src="http://localhost:8080/src/assets/banner@3x.png" alt="">
                    </van-swipe-item>
                    <van-swipe-item>
                        <p>已有66666个用户在车轮补换驾照成功</p>
                        <img src="http://localhost:8080/src/assets/banner@3x.png" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
        </header>
        <Upload :serValue="serValue" @changePic="judgeSelect"></Upload>
        <main class="main">
            <ul class="middleList">
                <li class="serType">
                    服务类型
                    <span @click="serShow=true">{{serValue}}</span>
                </li>
                <li>
                    当前驾照签发城市
                    <em @click="fromShow=true">{{qfVal}}</em>
                </li>
                <li>
                    可补换的签发城市
                    <em @click="fromShow2=true">{{bfVal}}</em>
                </li>
                <li>
                    服务费
                    <b>￥399</b>
                </li>
                <li class="serType">
                    优惠
                </li>
            </ul>
        </main>
        <footer class="footer">
            <div class="left">
                实付:<b>￥399</b>
            </div>
            <div :class="pay ? 'right-ready':'right'" @click="payBtn">
                立即支付
            </div>
        </footer>
        <van-popup 
        v-model="serShow" 
        position="bottom">
            <van-picker
            show-toolbar
            title="服务类型"
            :columns="serColumns"
            @cancel="onCancel"
            @confirm="onConfirm"
            />
        </van-popup>
        <van-popup 
        v-model="fromShow" 
        position="bottom">
            <TypePicker @close="onCancel" @enterQf="enterQf" @changeQf="changeQf" title="请选择签发地"></TypePicker>
        </van-popup>
        <van-popup 
        v-model="fromShow2" 
        position="bottom">
            <TypePicker @close="onCancel" @enterQf="enterQf" @changeQf="changeQf" title="请选择补发地"></TypePicker>
        </van-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem,Popup,Picker } from 'vant';
import Upload from '../components/Upload';
import TypePicker from '../components/TypePicker';
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Swipe).use(SwipeItem);
export default {
    name:'app',
    data(){
        return{
            topTab:['订单提交','填写收货地址','正在办理','办理完成'],
            topCount:0,
            serValue:'换驾照',
            serShow: false,
            fromShow:false,
            fromShow2:false,
            serColumns: ['换驾照','补驾照'],
            qfVal:'请选择签发地',
            bfVal:'请选择补发地',
            picFlag:false
        }
    },
    computed: {
        pay(){
            // return this.qfVal!='请选择签发地' && this.bfVal!='请选择补发地' && this.picFlag;
            return this.qfVal!='请选择签发地' && this.bfVal!='请选择补发地';
        }  
    },
    methods: {
        onConfirm(value, index) {
            this.serValue = value;
            this.serShow=false;
            this.fromShow=false;
        },
        onCancel() {
            this.serShow=false;
            this.fromShow=false;
            this.fromShow2=false;
        },
        enterQf(arr,type){
            let str = '';
            arr.forEach(item => {
                str += item.name + ' ';
            })
            type ? this.bfVal = str : this.qfVal = str;
            this.onCancel();
        },
        changeQf(arr,type){
            let str = '';
            arr.forEach(item => {
                str += item.name + ' ';
            })
            type ? this.bfVal = str : this.qfVal = str;
        },
        payBtn(){
            console.log(this.pay);
            if(this.pay){
                this.$router.push({path:'/address/1'}); 
            }
        },
        judgeSelect(flag){
            console.log('flag...',flag);
            if(flag){
                this.picFlag = flag
            }
        }
    },
    components: {
        Upload,
        TypePicker
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
.wrap{
    flex:1;
    overflow: hidden;
    display:flex;
    flex-direction: column;
}
.header{
    width: 100%;
    .topTab{
        width: 100%;
        height: rem(47px);
        display: flex;
        li{
            flex:1;
            display:flex;
            align-items: center;
            justify-content: center;
            // flex-shrink: 1;
            flex-wrap: nowrap;
            white-space: nowrap;
            flex-basis: auto;
            // padding: 0 rem(10px);
            color: #3aaffd;
            position: relative;
            &:last-child{
                &::before{
                    content: '';
                    display: none !important;
                }
                &::after{
                    content: '';
                    display: none !important;
                }
            }
            &.normal{
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    border-top: rem(24px) solid #eee;
                    border-bottom: rem(24px) solid #eee;
                    border-left: rem(8.8px) solid #fff;
                    border-right: rem(1.1px) solid #eee;
                    height: 0;
                    top: rem(-1px);
                    right: 0;
                    z-index: 1;
                    font-size: 0;
                }
                &::after{
                    content: '';
                    display: block;
                    position: absolute;
                    border-top: rem(24px) solid #fff;
                    border-bottom: rem(24px) solid #fff;
                    border-left: rem(8.8px) solid transparent;
                    border-right: rem(1.1px) solid #fff;
                    top: rem(-1px);
                    right: -1px;
                    z-index: 2;
                }
            }
            &.prevActive{
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    border-top: rem(24px) solid #eee;
                    border-bottom: rem(24px) solid #eee;
                    border-left: rem(8.8px) solid #fff;
                    border-right: rem(1.1px) solid #eee;
                    height: 0;
                    top: rem(-1px);
                    right: 0;
                    z-index: 1;
                    font-size: 0;
                }
                &::after{
                    content: '';
                    display: block;
                    position: absolute;
                    border-top: rem(24px) solid #3aaffd;
                    border-bottom: rem(24px) solid #3aaffd;
                    border-left: rem(8.8px) solid transparent;
                    border-right: rem(1.1px) solid #3aaffd;
                    top: rem(-1px);
                    right: -1px;
                    z-index: 2;
                }
            }
            &.active{
                background: #3aaffd;
                color: #fff;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    border-top: rem(23.5px) solid #fff;
                    border-bottom: rem(23.5px) solid #fff;
                    border-left: rem(8.8px) solid #3aaffd;
                    top: 0;
                    right: rem(-8px);
                    z-index: 1;
                }
            }
        }
    }
    .banner{
        width: 100%;
        position: relative;
        p{
            color: #fb611f;
            text-align: center;
            position: absolute;
            width: 100%;
            left: 0;
            top: rem(24px);
            z-index: 999;
        }
        img{
            width: 100%;
            height: auto;
            display: block;
        }
    }
}
.main{
    flex: 1;
    overflow-y: auto;
    background: #eee;
    .middleList{
        width: 100%;
        li{
            background: #fff;
            width: 100%;
            height: rem(53.7px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 rem(11.7px);
            font-size: rem(17.5px);
            position: relative;
            border-bottom: 1px solid #e8e8e8;
            &.serType{
                margin-top: rem(11px);
                &::after{
                    content: '';
                    width: rem(9.4px);
                    height: rem(9.4px);
                    display: inline-block;
                    border-top: 2px solid #dcdcdc;
                    border-right: 2px solid #dcdcdc;
                    -webkit-transform: rotate(45deg);
                    position: absolute;
                    right: rem(11.8px);
                    top: rem(20px);
                }
                span{
                    font-size: rem(16px);
                    padding-right:rem(11.7px); 
                }
            }
            em{
                font-size: rem(16px);
                color: #999;
            }
            b{
                font-size: rem(16px);
                color: red;
            }
        }
    }
}
.footer{
    width: 100%;
    height: rem(50px);
    display: flex;
    justify-content: space-between;
    padding-left: rem(15px);
    align-items: center;
    font-size: rem(17.5px);
    b{
        color: red;
    }
    .right{
        padding: 0 rem(15px);
        background: #999;
        color: #fff;
        height: 100%;
        line-height: rem(50px);
    }
    .right-ready{
        padding: 0 rem(15px);
        background: rgb(35, 250, 71);
        color: #fff;
        height: 100%;
        line-height: rem(50px);
    }
}
</style>

