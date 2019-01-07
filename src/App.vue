<template>
  <div id="box">
    <!-- <button @click="login">
      登录
    </button> -->
    <ul class="topTab">
        <li 
        v-for="(val,ind) in topTab" 
        :class="ind == topCount ? 'active' : ind == (topCount-1) ? 'prevActive' : 'normal'">
            {{val}}
        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
// const JSBridge = require('./utils/JSBridge.js');
// import Index from './pages/index';
export default {
  name: 'app',
  data () {
    return {
      topTab:['订单提交','填写收货地址','正在办理','办理完成'],
      topCount:0
    }
  },
  created () {
    this.getRoute();
  },
  watch:{
    $route(to,from){
      console.log('watch...',this.$route.params.num);
      this.topCount = this.$route.params.num;
    }
  },
  methods: {
    /* login(){
      //登录
      chelunJSBridge.invoke('app', 'login', {
        loginCallBackName: res=>{
          console.log('res...', res);
        }
      });
    }, */
    getRoute(){
      console.log(this.$route.params.num);
      this.topCount = this.$route.params.num;
    }
  },
  components: {
    // Index
  }
}
</script>

<style lang="scss">
$baseline-px:37.5px;
@function rem($px-values) {
    $baseline-rem: $baseline-px / 1rem * 1;
    $px-values: $px-values / $baseline-rem;
    @return $px-values;
}
#app,#box{
  width: 100%;
  height: 100%;
}
#box{
  font-size: rem(16px);
  display: flex;
  flex-direction: column;
}
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
</style>
