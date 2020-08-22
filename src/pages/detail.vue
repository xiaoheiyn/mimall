// 商品详情组件
<template>
  <div class="detail">
    <product-param :title="productInfo.name"></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper fl">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in goodsInfo.imgs" :key="index">
              <img :src="item" alt />
            </swiper-slide>
            <!-- 分页器 -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="content fr">
          <h2 class="item-title">{{productInfo.name}}</h2>
          <p class="item-info" v-html="productInfo.desc"></p>
          <div class="delivery">小米自营</div>
          <div class="item-price">
            {{goodsInfo.price}}
            <span class="del">{{goodsInfo.price}}元</span>
          </div>
          <div class="line"></div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <div class="item-attr-info">
            <div
              class="item-version clearfix"
              v-for="(item,index) in productInfo.productAttrList"
              :key="index"
            >
              <h2>选择{{ item.attrName }}</h2>
              <ul class="phoneBoss">
                <li
                  class="phone fl"
                  :class="{checked: attrIds.includes(attr.propId)}"
                  v-for="(attr,attrIndex) in item.attrVals"
                  :key="attrIndex"
                  @click="selectAttr(item.attrName,attr.propId)"
                >{{attr.attrVal}}</li>
              </ul>
            </div>
          </div>
          <div class="item-total">
            <div class="phone-info clearfix">
              <div class="fl">{{goodsInfo.name}}</div>
            </div>
            <div class="phone-total">总计：{{goodsInfo.price}}元</div>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn btn-huge fl" @click="addCart">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg" alt />
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal title="提示" sureText="查看购物车" btnType="1" modalType="middle">
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ProductParam from "../components/ProductParam";
import ServiceBar from "../components/SeviceBar";
import Modal from "../components/Modal";
export default {
  name: "detail",
  components: {
    Swiper,
    SwiperSlide,
    ProductParam,
    ServiceBar,
    Modal,
  },
  data() {
    return {
      id: this.$route.params.id, // 商品id
      productInfo: {}, // 产品信息
      goodsInfo: [], //选择后手机的信息，这里需要筛选
      goodsAttrs: [],
      attrIds: [],
      illegalClick: false,
      showModal: false, // 购物车面板
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  mounted() {
    this.getProductInfo();
  },
  methods: {
    // 获取产品信息
    async getProductInfo() {
      const data = await this.axios.get(`product/${this.id}`);
      // console.log(data);
      this.productInfo = data;
      this.goodsInfo = data.goodsList[0];
      this.goodsAttrs = this.goodsInfo.goodsAttrs;
      this.goodsAttrs.forEach((e) => {
        this.attrIds.push(e.attrId);
      });
    },
    // 选择产品属性匹配具体商品
    selectAttr(attrName, propId) {
      if (this.illegalClick || this.attrIds.includes(propId)) {
        return false;
      }
      // 构建新商品属性
      let newGoodsAttrs = [];
      this.goodsAttrs.forEach((e) => {
        let goodsAttr = {};
        goodsAttr.attrName = e.attrName;
        goodsAttr.attrId = e.attrId;
        if (e.attrName === attrName) {
          goodsAttr.attrId = propId;
        }
        newGoodsAttrs.push(goodsAttr);
      });
      let notMatch = true;
      this.productInfo.goodsList.forEach((goods) => {
        // 遍历商品属性
        let cnt = 0;
        goods.goodsAttrs.forEach((attr) => {
          newGoodsAttrs.forEach((newAttr) => {
            if (
              attr.attrName === newAttr.attrName &&
              attr.attrId === newAttr.attrId
            ) {
              cnt = cnt + 1;
            }
          });
        });
        // 匹配成功替换具体商品
        if (cnt === newGoodsAttrs.length) {
          this.goodsInfo = goods;
          this.goodsAttrs = this.goodsInfo.goodsAttrs;
          this.attrIds.splice(0, this.attrIds.length);
          this.goodsAttrs.forEach((e) => {
            this.attrIds.push(e.attrId);
          });
          notMatch = false;
          return false;
        }
      });
      if (notMatch) {
        this.illegalClick = true;
        this.$message.warning({
          message: "抱歉，没货了",
          center: true,
          duration: 800,
          onClose: () => {
            this.illegalClick = false;
          },
        });
      }
    },

    // 添加到购物车
    async addCart(id) {
      await this.axios.post(`cart?goodsId=${this.goodsInfo.goodsId}`)
      this.$router.push('/cart')
    },
    
  },
};
</script>

<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";

.detail {
  .wrapper {
    .container {
      display: flex;
      flex-wrap: nowrap;
      .swiper {
        @include wh(643px, 617px);
        margin-top: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .content {
        width: 583px;
        margin-bottom: 40px;
        .item-title {
          font-size: $fontC;
          padding-top: 30px;
          padding-bottom: 16px;
          height: 26px;
        }
        .item-info {
          @include hf(36px, $fontJ);
        }
        .delivery {
          @include hf(15px, $fontI);
          color: $colorA;
          margin-top: 26px;
          margin-bottom: 14px;
        }

        .item-price {
          @include hf(19px, $fontG);
          color: $colorA;
          .del {
            font-size: $fontI;
            color: $colorD;
            margin-left: 10px;
            text-decoration: line-through;
          }
        }
        .line {
          height: 0;
          margin-top: 25px;
          margin-bottom: 28px;
          @include bd();
        }
        .item-addr {
          position: relative;
          @include bd();
          @include hl(108px, 14px);
          background-color: #fafafa;
          font-size: $fontJ;
          box-sizing: border-box;
          padding-top: 31px;
          padding-left: 64px;
          .addr {
            color: $colorC;
          }
          .stock {
            margin-top: 15px;
            color: $colorA;
          }
          .icon-loc {
            display: inline-block;
            @include positionImgLeft(
              absolute,
              27px,
              34px,
              20px,
              20px,
              "/imgs/detail/icon-loc.png"
            );
          }
        }
        .phoneBoss {
          display: flex;
          justify-content: space-between;
          flex-flow: row wrap;
          .phone {
            @include bd();
            @include wh(287px, 50px);
            line-height: 50px;
            font-size: $fontI;
            color: $colorB;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.6s, color 0.6s;
            &:hover {
              background-color: $colorA;
              color: $colorG;
            }
            &.checked {
              @include bd(1px, solid, $colorA);
              color: $colorA;
            }
          }
        }
        .item-version {
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .item-color {
          .color {
            display: inline-block;
            @include wh(14px, 14px);
            background-color: #666;
          }
        }
        .item-total {
          @include hf(108px, $fontJ);
          background: #fafafa;
          padding: 24px 33px 29px 30px;
          margin-top: 50px;
          margin-bottom: 30px;
          box-sizing: border-box;
        }
        .phone-total {
          font-size: 24px;
          color: $colorA;
          margin-top: 18px;
        }
      }
    }
  }
  .price-info {
    background-color: #f3f3f3;
    height: 340px;
    h2 {
      font-size: $fontE;
      color: $colorB;
      padding-top: 38px;
      margin-bottom: 30px;
    }
  }
}
</style>
