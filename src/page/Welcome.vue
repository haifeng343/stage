<template>
    <div class="container">
        <div class="main">
            <div class="wave"></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.main,.wave{
        width: 200px;
        height: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 100%;
}
    .main{
        border: 1px solid darkturquoise;
        padding: 10px;
    }
    .wave{
        background: darkturquoise;
        overflow: hidden;
    }
    .wave::after{
        content: '';
        width: 300px;
        height: 300px;
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%,-60%);
        background: rgba(255, 255, 255, 0.8);
        border-radius: 40%;
        animation: move 7s infinite linear;
    }
    .wave::before{
        contain: '网络波动';
        font-size: 18px;
        color: darkturquoise;
        position: absolute;
        left: 50%;
        top: 0;
        text-transform: uppercase;
        transform: translate(-50%,30px);
        z-index: 99999;
    }
    @keyframes move{
        to{
            transform: translate(-50%,-60%) rotate(360deg);
            /* top: 35%; */
        }
    }
</style>