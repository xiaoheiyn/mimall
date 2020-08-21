// 主页
<template>
  <div class="index">
    <div class="container">
      <!-- 轮播图与分类栏 -->
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li
              class="menu-item"
              v-for="(item1,index) in allMenuList"
              :key="index"
              @mouseover="selectItem(index)"
            >
              <a href="javascript:;">{{ item1.cateName }}</a>
              <div class="children">
                <ul>
                  <li v-for="(item2,index) in menuList" :key="index">
                    <a :href="'/#/product/'+item2.id">
                      <img v-lazy="item2.img" />
                      {{item2.name}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/#/product/' + item.productId" target="_blank">
              <img v-lazy="item.img" />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 广告位 -->
      <div class="ads-box">
        <a :href="'/#/product'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" alt />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt />
        </a>
      </div>
    </div>
    <!-- 产品站 -->
    <div class="product-box">
      <div class="container" v-for="(arr,index) in productList" :key="index">
        <h2>{{ arr.cateType }}</h2>
        <div class="wrapper">
          <div class="banner-left">
            <div v-for="(banner,index) in arr.advert" :key="index">
              <a href>
                <img v-lazy="banner" :key="banner" />
              </a>
            </div>
          </div>
          <div class="list-box">
            <div class="list" v-for="(list,listIndex) in arr.content" :key="listIndex">
              <div class="item" v-for="(item,itemIndex) in list.children" :key="itemIndex">
                <a :href="'/#/detail/'+item.productId">
                  <div class="item-img">
                    <img v-lazy="item.img" />
                  </div>
                </a>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <h4>{{item.brief}}</h4>
                  <p @click="addCart()">{{item.price}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车详情"
      btnType="1"
      modalType="middle"
      :showModal="showModals"
      @submit="goToCart"
      @cancel="showModals=false"
    >
      <template v-slot:body>
        <p>商品添加成功</p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from '../components/SeviceBar'
import Modal from '../components/Modal'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
import 'swiper/css/swiper.css'
export default {
  name: 'index',
  components: {
    Swiper,
    SwiperSlide,
    ServiceBar,
    Modal,
  },
  data() {
    return {
      swiperOptions: {
        loop: true, // 循环
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false, // 触摸滑动后是否继续轮播
        },
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // 前后按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      slideList: [],
      allMenuList: [],
      menuList: [],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png',
        },
        {
          id: 48,
          img: '/imgs/ads/ads-2.jpg',
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png',
        },
        {
          id: 47,
          img: '/imgs/ads/ads-4.jpg',
        },
      ],
      productList: [],
      showModals: false,
    }
  },
  created() {
    this.getbanner()
    this.getCateList()
    this.getHomeProductList()
  },
  methods: {
    // 获取轮播图数据
    async getbanner() {
      const data = await this.axios.get('banners')
      this.slideList = data
      // console.log(this.slideList)
    },
    // 获取菜单栏数据
    async getCateList() {
      const data = await this.axios.get('leftCategory')
      data.forEach((cate) => {
        cate.children.forEach((product) => {
          product.id = cate.cateId
        })
      })
      this.allMenuList = data
      this.menuList = data[0].children
    },
    // 选择菜单数据
    selectItem(index) {
      this.menuList = this.allMenuList[index].children
    },
    // 获取产品数据
    async getHomeProductList() {
      const data = await this.axios.get('homeProduct')
      this.productList = data
    },
    //点击购物车小图标跳转事件
    addCart() {
      this.showModals = true
    },
    goToCart() {
      //无接口所以就不加入跳转了
      //此页面小购物车按钮属于特别添加，实际只能显示一个弹框，五其他作用
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 99;
      padding: 20px 0;
      background-color: #55585a7a; //背景颜色调透明一点
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 42px;
          line-height: 42px;
          a {
            display: block;
            position: relative;
            font-size: 16px;
            color: #fff;
            padding-left: 30px;
            &:after {
              position: absolute;
              right: 30px;
              top: 13.5px;
              content: ' ';
              @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
            }
          }
          &:hover {
            background-color: #ff6600;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: #ffffff;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid #e5e5e5;
            writing-mode: vertical-lr;
            ul {
              // display: flex;
              // justify-content: space-between;
              // height: 75px;
              li {
                display: inline-block;
                width: 240px;
                height: 75px;
                line-height: 75px;
                // flex: 1;
                // padding-left: 23px;
                writing-mode: horizontal-tb; //书写属性，从上到下
              }
              a {
                display: flex;
                align-items: center;
                height: 40px;
                color: #333333;
                font-size: 14px;
                padding: 18px 20px;
              }
              img {
                width: 23px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: #f5f5f5;
    padding: 30px 0 0;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
    }
    .wrapper {
      display: flex;
      justify-content: space-between;
      .banner-left {
        display: flex;
        flex-flow: column nowrap;
        margin-bottom: 14px;
        height: 614px;
        a{
          display: block;
        }
        img {
          width: 234px;
          margin-bottom: 11px;
        }
      }
      .list-box {
        width: 992px;
        height: 614px;
        margin-left: 12px;
        overflow: hidden;
        .list {
          @include flex();
          flex-flow: row wrap;
          width: 986px;
          margin-bottom: 14px;
          .item {
            width: 234px;
            height: 300px;
            margin-bottom: 14px;
            background-color: $colorG;
            text-align: center;
            transition: all 0.8s;
            //设置浮起动画
            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }
            .item-img {
              img {
                height: 160px;
                width: 160px;
                margin: 18px 0;
              }
            }
          }
          .item-info {
            h3 {
              font-size: $fontJ;
              color: #333;
              line-height: $fontJ;
              font-weight: bold;
            }
            h4 {
              color: $colorD;
              line-height: 13px;
              margin: 6px auto 13px;
            }
            p {
              color: #f20a0a;
              font-size: $fontJ;
              font-weight: bold;
              // 购物车图标点击响应
              cursor: pointer; //加小手
              &:after {
                @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                content: ' ';
                margin-left: 5px;
                vertical-align: middle; //图标居中对齐
              }
            }
          }
        }
      }
    }
  }
}
</style>