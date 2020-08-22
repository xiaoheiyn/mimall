// 购物车头部
<template>
  <div class="order-header">
    <div class="container">
        <div class="header-logo">
          <a href="/#/index" class="logo-icon"></a>
        </div>
        <div class="title">
          <!-- 插槽定义名称，因为后面这个组件引用上面的名称会变化 -->
          <h2>{{title}}<slot name="tip"></slot></h2>
        </div>
        <div class="fr">
          <a href="javascript:;" class="username">{{username}}</a>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order-header',
  data() {
    return {
      
    }
  },
  props: {
    title:String
  },
  computed: {
    ...mapState(['username'])
  },
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
  .order-header {
    padding: 30px 0;
    border-bottom: 2px solid $colorA;
    @include hl(55px, 55px);
    .container {
      display: flex;
      justify-content: space-between; 
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: #ff6600;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &:before {
            content: ' ';
            @include bgImg(55px,55px,'/imgs/mi-logo.png',55px);
            transition: margin .2s;
          }
          &:after {
            content: ' ';
            @include bgImg(55px,55px,'/imgs/mi-home.png',55px)
          }
          &:hover:before{
            margin-left:-55px;
            transition: margin .2s;
          }
        }
      }
      .title {
        flex: 3;
        margin-left: 54px;
        h2 {
          font-size: 28px;
          color: #333;

          span {
            font-size: 14px;
            margin-left: 17px;
            color: #999;
            font-weight: 200;
          }
        }
      }

      .username {
        color: #666;
        font-size: 16px;
      }
    }
  }
</style>