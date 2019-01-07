<template>
    <!-- <div class="service">
        <img src="http://localhost:8080/src/assets/IdCard/cc-icon.png" @click="show=true">
        <div class="bottom">
            <button id="cc">跳转客服</button>
            <a href="tel:15623364233">打电话</a>
        </div>
    </div> -->
    <img id="cc" src="http://localhost:8080/src/assets/IdCard/cc-icon.png" @click="show=true">
</template>
<script>
export default {
    name:'cservice',
    data(){
        return {
            show:false
        }
    },
    methods: {
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
.service{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
}
img{
    width: rem(58.6px);
    height: auto;
    position: fixed;
    right: rem(10px);
    bottom: rem(60px);
    z-index: 999;
}
</style>

