// 支付组件
<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container w">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！请前去付款~</h2>
              <p>请在<span>30分钟</span>内完成支付，超时将取消订单</p>
              <p>收货信息：{{orderInfo.receiverName}} {{orderInfo.receiveMobile}} {{orderInfo.receiverAddress}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{orderInfo.amount}}</span>元</p>
              <p>订单详情 <i class="el-icon-arrow-down" :class="{ up:showDetail }" @click="showDetail = !showDetail"></i></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderInfo.orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{orderInfo.receiverName}} {{orderInfo.receiveMobile}} {{orderInfo.receiverAddress}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderInfo.orderItems" :key="index">
                    <img :src="item.img+'?thumb=1&w=120&h=120'" />{{item.name}}
                    <span class="item-price">{{item.price}}</span>元 x {{item.quantity}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali checked" @click="paySubmit"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import OrderHeader from '../components/orderHeader'
  export default {
    name:'pay',
    data () {
      return {
        showDetail: false ,// 是否显示订单详情
        orderNo: this.$route.query.orderNo,
        orderInfo:{}
      };
    },
    components: {
      OrderHeader
    },
    created(){
      this.getOrderDetail()
    },
    methods: {
      async getOrderDetail() {
        let orderInfo = await this.axios.get(`order/${this.orderNo}`)
        this.orderInfo = orderInfo
      },
      goOrderList() {
        this.$router.push('/order/list')
      },
      paySubmit() {
        window.open('/#/order/alipay?orderId=' + this.orderNo,'_blank')
      }
    }
  }
</script>
<style scoped>
.wrapper {
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 61px;
}
.order-wrap {
  padding: 62px 50px;
  background-color: #fff;
  font-size: 14px;
  margin-bottom: 30px;
}
.item-order {
  display: flex;
  align-items: center;
}
.icon-succ{
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: url('/imgs/icon-gou.png')  no-repeat center;
  background-size: 60px;
  margin-right: 40px;
  border: 1px solid #80c58a;
}
.order-info {
  margin-right: 248px;
}
.order-info h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}
.order-info p {
  color: #666;
}
.order-info p span {
  color: #ff6700;
}
.order-total > p:first-child{
  margin-bottom: 30px;
}
.order-total span {
  font-size: 28px;
  color: #ff6700;
}
.el-icon-arrow-down {
  font-size: 16px;
  font-weight: 900;
  margin-left: 8px;
  color: #292727;
  transition: all 0.5s;
  cursor: pointer;
}
.el-icon-arrow-down.up {
  transform: rotate(180deg);
}
.item-detail {
  border-top: 1px solid #d7d7d7;
  padding-top: 47px;
  padding-left: 130px;
  font-size: 14px;
  margin-top: 45px;
}
.item {
  margin-bottom: 19px;
}
.detail-title {
  float: left;
  width: 100px;
}
.detail-info {
  display: inline-block;
}
.detail-info img {
  width: 30px;
  vertical-align: middle;
}
.item-price {
  margin-left: 20px;
  color: #f60;
}
.item-pay {
  padding: 26px 50px 72px;
  background-color: #fff;
  color: #333;
}
.item-pay h3 {
  font-size: 20px;
  font-weight: 200;
  color: #333;
  padding-bottom: 24px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 26px;
}
.pay-way {
  font-size: 18px;
}
.pay {
  display: inline-block;
  width: 188px;
  height: 64px;
  border: 1px solid #d7d7d7;
  cursor: pointer;
}
.pay:last-child {
  margin-left: 20px;
}
.pay.checked{
  border: 1px solid #ff6700;
}
.pay-ali {
  background: url('/imgs/pay/icon-ali.png') no-repeat center;
  background-size: 103px 38px;
  margin-top: 19px;
}
</style>