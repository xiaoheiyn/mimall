// 购物车组件
<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{'checked':this.isChecked == 1}" @click="allSelected"></span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list" v-for="(item,index) in list" :key="index">
            <!-- <loading ></loading> -->
            <li class="cart-item">
              <div class="item-check">
                <span class="checkbox" :class="{'checked':item.selected == 1}" @click="updateCart(item,'selected')"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.img+'?thumb=1&w=320&h=320'" alt />
                <span>{{item.name}}</span>
              </div>
              <div class="item-price">{{item.price}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'decrNum')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item,'incrNum')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.price*item.quantity}}元</div>
              <div class="item-del">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteCart(item.id)"></el-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="order-wrap">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共
            <span>{{list.length}}</span>件商品，已选择
            <span>{{selectedCartCnt}}</span>件
          </div>
          <div class="total fr">
            合计：
            <span>{{amount}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "../components/orderHeader";
import NavFooter from "../components/NavFooter";
import ServiceBar from "../components/SeviceBar";
export default {
  name: "cart",
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar,
  },
  data() {
    return {
      isChecked: -1, //1全选0半选-1未选
      list: [],
      selectedCartCnt: 0,
      amount: 0, //总金额
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    //获取购物车列表
    async getCartList() {
      const data = await this.axios.get(`cart/list`);
      this.renderg(data);
    },
    //渲染数据
    renderg(data) {
      if (data) {
        let { amount, selectedCartCnt, CartProducts } = data;
        if (selectedCartCnt == CartProducts.length) {
          this.isChecked = 1;
        } else if (selectedCartCnt == 0) {
          this.isChecked = -1;
        } else {
          this.isChecked = 0;
        }
        this.amount = amount;
        this.list = CartProducts;
        this.selectedCartCnt = selectedCartCnt;
      } else {
        this.amount = 0;
        this.list = [];
        this.selectedCartCnt = 0;
        this.isChecked = -1;
      }
    },
    //全选按钮
    async allSelected() {
      if(this.list.length === 0){
          return this.$message.error('购物车没有一件商品')
        }
      let allSelect = this.isChecked==1 ? 0 : 1
      let data = await this.axios.put(`cart/selectAll/${allSelect}`)
      this.renderg(data)
    },
    //删除
    async deleteCart(id){
      let data = await this.axios.delete(`cart/${id}`)
      this.renderg(data)
    },
    //更新购物车
    async updateCart(item,type){
      let selected = item.selected==1 ? 1 : 0
      let quantity = item.quantity
      if(type !== 'selected' && item.selected == 0){
        item.selected == 1
      }else if(type === 'selected'){
        selected = item.selected==1 ? 0 : 1
      }else if(type === 'decrNum'){
        if(item.quantity<=1){
          return this.$message.error('商品至少保留一件')
        }
        quantity = --item.quantity //++放前面先加后赋值
      }else if(type === 'incrNum'){
        if(item.quantity>=item.stock){
          return this.$message.error('商品数量超出商店库存')
        }
        quantity = ++item.quantity
      }
      let data = await this.axios.put(`cart/${item.id}`, { quantity,selected })
      this.renderg(data)
    },
    //结算跳转
    order(){
      if(this.isChecked==-1){
        this.$message.error('至少选择一件商品')
      }
      this.$router.push('/order/confirm')
    }
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.cart {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 114px;
    .cart-box {
      background-color: $colorG;
      font-size: $fontJ;
      color: $colorD;
      text-align: center;
      .checkbox {
        display: inline-block;
        @include wh(22px, 22px);
        @include bd();
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") $colorA no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        @include hl(79px, 79px);
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: $fontI;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: $fontH;
            color: $colorB;
            display: flex;
            align-items: center;
            img {
              @include wh(80px, 80px);
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: $colorB;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              @include wh(150px, 40px);
              @include bd();
              line-height: 40px;
              font-size: $fontJ;
              a {
                display: inline-block;
                width: 50px;
                color: $colorB;
              }
              span {
                display: inline-block;
                width: 50px;
                color: $colorB;
              }
            }
          }
          .item-total {
            flex: 1;
            color: $colorA;
          }
          .item-del {
            flex: 1;
            .el-button {
              text-align: center;
              cursor: pointer;
            }
          }
        }
      }
    }

    .order-wrap {
      @include hl(50px, 50px);
      display: flex;
      justify-content: space-between;
      font-size: $fontJ;
      color: $colorC;
      margin-top: 20px;

      .cart-tip {
        margin-left: 29px;
        a {
          color: $colorC;
          margin-right: 37px;
        }
        span {
          color: $colorA;
          margin: 0 5px;
        }
      }
      .total {
        font-size: $fontJ;
        color: $colorA;
        span {
          font-size: 24px;
        }
        a {
          @include wh(202px, 50px);
          line-height: 50px;
          font-size: $fontH;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>