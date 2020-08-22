<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
          小米8
      </div>
      <div class="pro-param">
        <a href class="param-item">概述</a>
        <span class="param-line">|</span>
        <a href class="param-item">参数</a>
        <span class="param-line">|</span>
        <a href class="param-item">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  data(){
      return{
        isFixed: false,
      }
  },
  mounted(){
      //监听滚动事件
      window.addEventListener('scroll',this.initHeight)
  },
  methods:{
      initHeight(){
         let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
         this.isFixed = scrollTop > 152 ? true:false
      }
  },
  destroyed(){
      window.removeEventListener('scroll',this.initHeight)
  }
};
</script>

<style lang="scss" >
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

.nav-bar {
  @include hl(70px, 70px);
  border-top: 1px solid #e5e5e5;
  background-color: $colorG;
  margin-bottom: 2px;
  z-index: 10;
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      .param-item {
        color: $colorC;
        &:last-of-type {
        margin-right: 10px;
        }
      }
      .param-line {
        margin: 0 10px;
      }
    }

  }
//定义吸顶的类
  &.is_fixed {
    @include position(fixed, 0);
    width: 100%;
    height: 63px;
    box-shadow: 0 3px 3px rgba(0,0,0,.1);;
  }
  
}


</style>