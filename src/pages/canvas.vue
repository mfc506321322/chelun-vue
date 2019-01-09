<template>
    <div class="canvasBox">
        <canvas id="canvas" width="350" height="243"></canvas>
    </div>    
</template>
<script>
import axios from 'axios';
export default {
    name:'app',
    mounted () {
        this.drawImg();
    },
    methods: {
        drawImg(){
            let canvas = document.getElementById('canvas');
            let context = canvas.getContext('2d');
            let img1 = new Image();
            img1.src = 'http://localhost:8080/src/assets/che.jpg';
            img1.onload = function(){
                context.drawImage(img1,0,0,350,243);
            }
            axios({
                method: 'post',
                url: 'http://123.206.55.50:11000/tobase64',
                data: {url: 'http://wx.qlogo.cn/mmhead/ver_1/ibSOOeianA8eHGEup190nkYbGKHicSHI7usxJlEAmY3iaxta8T9mvOxgp3GCQtwllpXtjgoic51ZJ24uq5XVOs1TWItuOuPALFrOQ7knA9frrmqg/0'}
            }).then(body=>{
                console.log('body...', body.data.data.base64);
                let img2 = new Image();
                img2.src = body.data.data.base64;
                img2.onload = function(){
                    context.drawImage(img2,142,147,77,26);
                }
            }).catch(e=>{
                console.log('e..', e);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .canvasBox{
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
</style>
