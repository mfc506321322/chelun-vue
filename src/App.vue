<template>
  <div id="box">
    <!-- <button @click="login">
      登录
    </button> -->
    <Index></Index>
  </div>
</template>

<script>
const JSBridge = require('./utils/JSBridge.js');
import Index from './pages/index';
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    login(){
      //登录
      chelunJSBridge.invoke('app', 'login', {
        loginCallBackName: res=>{
          console.log('res...', res);
        }
      });
    }
  },
  components: {
    Index
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
}
</style>
