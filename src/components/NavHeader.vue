// 主页头部
<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>购物车({{cartCnt}})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a :href="'/#/detail/'+item.productId" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.img" alt="">
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in redmiList" :key="index">
                  <a :href="'/#/detail/'+item.productId" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.img" alt="">
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in TVList" :key="index">
                  <a :href="'/#/detail/'+item.productId" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.img" alt="">
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'nav-header',
  data(){
    return{
      phoneList:[],
      redmiList:[],
      TVList:[]
    }
  },
  created(){
    this.getProductList();
  },
  computed:{
    //页面先有vuex数据但不显示，原因是先执行了navHeaader后再执行app.vue，顺序下不显示，此时
    // 则需要使用computed方法了
    /**
    username(){
      return this.$store.state.username
    },
    cartCnt(){
      return this.$store.state.cartCnt
    }
    */
  //  要先引入vuex
    ...mapState(['username','cartCnt'])
  },
  methods:{
    // 登录跳转
    login(){
      this.$router.push('/login')
    },
    // 获取导航栏数据请求
     getnavItem(){
      return this.axios.get('navItem')
     },
    //  获取导航栏产品数据
    async getProductList(){
      const data = await this.getnavItem()
        data.forEach(element => {
          element.children.forEach(product => {
            product.img += '?thumb=1&w=160&h=110&f=webp&q=90'
          })
        })
        this.phoneList = data[0].children.slice(0,6)
        this.redmiList = data[1].children.slice(0,6)
        this.TVList = data[2].children.slice(0,6)
    },
    // 跳转购物车
    goToCart(){
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
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
            @include bgImg(55px,55px,'/imgs/mi-logo.png',55px)
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
      .header-menu{
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu{
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span{
            cursor: pointer;
          }
          &:hover{
            color: $colorA;
            .children{
              height: 220px;
              opacity: 1;
            } 
          }
          .children{
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            transition: height .5s;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
            z-index: 10;
            background-color: #fff;
            .product{
             position: relative; 
             float: left;
             width: 16.6%;
             height: 220px;
             font-size: 12px;
             line-height: 12px;
             text-align: center;
             a{
               display: inline-block;
             }
             img{
               height: 111px;
               width: auto;
               margin-top: 26px;
             }
             .pro-img{
               height: 139px;
             }
             .pro-name{
               font-weight: bold;
               margin-top: 19px;
               margin-bottom: 8px;
               color: $colorB;
             }
             .pro-price{
               color: $colorA;
             }
             &:before{
               content: ' ';
               position: absolute;
               top:28px;
               right:0;
               border-left:1px solid $colorF;
               height: 100px;
               width: 1px;
             }
             &:last-child:before{
               display: none;
             }
            }
          }
        }
      }
      .header-search{
         width: 319px;
         .wrapper{
           height: 50px;
           border: 1px solid #e0e0e0;
           display: flex;
           align-items: center;
           input{
             border:none;
             box-sizing: border-box;
             border-right: 1px solid #e0e0e0;
             width: 264px;
             height: 50px;
             padding-left: 14px;
           }
           a{
             @include bgImg(18px,18px,'/imgs/icon-search.png');
             margin-left: 17px;
           }
         }
      }
    }
  }
}
</style>