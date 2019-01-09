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
            <div class="upload">
                <input type="file" @change="fileUpload">
                <img class="uploadImg" :src="src">
                <canvas id="canvas"></canvas>
            </div>
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
                    <button class="share" @click="share">果断分享</button>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import {doShare} from '../api/index.js';
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
            qfVal:'北京 北京市 东城区',
            src:''
        }
    },
    created () {
        window['CHELUN_SHARE_DATA_WXTIMELINE'] = {
            title:'分享一张美图',
            imgUrl:'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E7%BE%8E%E5%9B%BE&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=688823969,1917554187&os=4173102005,2816370139&simid=3958298243,325501998&pn=23&rn=1&di=135851914880&ln=1449&fr=&fmq=1546911346770_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fwww.gapp.gov.cn%2Fupload%2Fimages%2F2015%2F5%2F4161418918.jpeg&rpstart=0&rpnum=0&adpicid=0&force=undefined',
            type:'photo'
        },
        window['CHELUN_SHARE_DATA_WXMESSAGE'] = {
            title:'分享一份感悟',
            desc:'微信分享测试',
            link:'http://123.206.55.50/1605A/mengfancheng/NeteaseCloud/dist/index.html',
            imgUrl:'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg'
        }    
    },
    methods: {
        async fileUpload(e){
            console.log('e.target...', e.target.files)
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = ()=>{
                this.src = reader.result;
                console.log('reader.result...', reader.result);
                var img = new Image();
                img.src = reader.result;
                img.onload = async ()=>{
                    console.log(img.width, img.height);
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // 压缩画布
                    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width/2, img.height/2);

                    // 绘制一张网络图片
                    // var img2 = new Image();
                    // img2.crossOrigin = 'anonymous'
                    // var url = 'http://123.206.55.50:11000/static/9c5ab5222bb94e9beec79ded.jpg';
                    // let data = await imageToBase64(url)
                    // console.log('data...', data);
                    // img2.src = 'data:image/jpeg;base64,'+data;
                    // img2.onload = async ()=>{
                    //     context.drawImage(img2, 0, 0, img2.width, img2.height, 50, 50, img2.width/2, img2.height/2);
                    //     // toDataUrl时，设置为jpeg或者图片质量
                    //     var baseStr1 = canvas.toDataURL('image/jpeg', 0.7);
                    //     var baseStr2 = canvas.toDataURL('image/png', 1);
                    //     // console.log(baseStr1, baseStr2);
                    //     let res1 = await uploadBase64(baseStr1);
                    //     let res2 = await uploadBase64(baseStr2);
                    //     console.log('res1...', res1, 'res2...', res2);
                    // }
                    //  console.log(canvas.toDataURL());
                }
            }
        },
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
        },
        share(){
            doShare()
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
    .upload{
        width: 100%;
        overflow-x: auto;
        .uploadImg{
            width: 100%;
            height: auto;
            display: block;
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

