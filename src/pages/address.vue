<template>
    <div class="wrap">
        <header class="header">
            收货地址
        </header>
        <main class="main">
            <ul class="middleList">
                <li>
                    联系省市
                    <em @click="fromShow=true">{{qfVal}}</em>
                </li>
                <li>
                    详细地址
                    <input type="text" maxlength="20" placeholder="请输入联系地址">
                </li>
                <li>
                    联系电话
                    <input type="text" maxlength="11" placeholder="请输入联系电话">
                </li>
                <li>
                    联系人
                    <input type="text" maxlength="5" placeholder="请输入联系人">
                </li>
            </ul>
        </main>
        <footer class="footer">
            确认
        </footer>
        <van-popup 
        v-model="fromShow" 
        position="bottom">
            <AddressType @close="onCancel" @enterQf="enterQf" @changeQf="changeQf" title="请选择联系省市"></AddressType>
        </van-popup>
        <CService></CService>
        <img class="redPacket" src="http://localhost:8080/src/assets/IdCard/ee-icon.png" @click="hbShow=true">
        <van-popup v-model="hbShow">
            <div class="hbBox">
                <p>分享后自己能够获得优惠券</p>
                <span>自己和好友都能得</span>
                <img src="http://localhost:8080/src/assets/IdCard/coupon.png" alt="">
                <div class="hbBtn">
                    <button class="close" @click="onCancel">给钱都不要</button>
                    <button class="share">果断分享</button>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import { Popup,Picker } from 'vant';
import AddressType from '../components/AddressType';
import CService from '../components/CService';
Vue.use(Popup);
Vue.use(Picker);
export default {
    name:'app',
    data(){
        return {
            hbShow:false,
            fromShow:false,
            qfVal:'北京 北京市 东城区'
        }
    },
    methods: {
        onCancel() {
            this.fromShow=false;
            this.hbShow=false;
        },
        enterQf(arr){
            let str = '';
            arr.forEach(item => {
                str += item.name + ' ';
            });
            this.qfVal = str;
            this.onCancel();
        },
        changeQf(arr){
            let str = '';
            arr.forEach(item => {
                str += item.name + ' ';
            });
            this.qfVal = str;
        }
    },
    components: {
        AddressType,
        CService
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
.redPacket{
    width: rem(58.6px);
    height: auto;
    position: fixed;
    right: rem(10px);
    bottom: rem(140px);
    z-index: 999;
}
.hbBox{
    width: rem(290px);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    p{
        font-size: rem(21px);
        margin-top: rem(24px);
        color: #333;
        font-weight: 500;
    }
    span{
        padding: rem(5.8px) 0;
        font-size: rem(14px);
        color: #999;
        font-weight: 400;
    }
    img{
        width: rem(217px);
        padding: rem(7px) 0;
    }
    .hbBtn{
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 0 rem(17px);
        margin: rem(17px) 0;
        button{
            width: rem(124px);
            height: rem(40px);
            border: none;
            font-size: rem(19px);
            color: #fff;
            border-radius: 3px;
            &.close{
                background: #c8c8c8;
            }
            &.share{
                background: #17b0fe;
            }
        }
    }
}
.wrap{
    flex:1;
    overflow: hidden;
    display:flex;
    flex-direction: column;
    background: #f4f4f4;
}
.header{
    font-size: rem(13px);
    color: #818181;
    padding: rem(12px) rem(12px) rem(6px);
    text-align: center;
}
.main{
    flex: 1;
    overflow-y: auto;
    .middleList{
        width: 100%;
        background: #fff;
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
            input{
                font-size: rem(16px);
                float: right;
                outline: 0;
                height: 100%;
                border: none;
                text-align: right;
                color: #333;
                width: 70%;
            }
            em{
                font-size: rem(16px);
                color: #333;
                font-weight: 400;
            }
        }
    }
}
.footer{
    background: #999;
    width: 100%;
    font-size: rem(17.5px);
    color: #fff;
    text-align: center;
    line-height: rem(50px);
}
</style>

