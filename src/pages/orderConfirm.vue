// 订单确认
<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="position: absolute; width: 0px; height: 0px; overflow: hidden;"
    >
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path
            d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
            class="path1"
          />
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path
            d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
            class="path1"
          />
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path
            d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
            class="path1"
          />
          <path
            d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path2"
          />
          <path
            d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path3"
          />
          <path
            d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path4"
          />
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <div
                class="addr-info"
                v-for="(item,index) in addrList"
                :key="index"
                @click="selectedAddrId=item.id"
                :class="{checked:item.id == selectedAddrId}"
              >
                <h2>{{item.username}}</h2>
                <div class="phone">{{item.mobile}}</div>
                <div class="street">{{item.address}}</div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddrById(item.id)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del" />
                    </svg>
                  </a>
                  <a href="javascript:;" class="fr" @click="diglogOpen('edit',item)">
                    <svg class="icon icon-edit">
                      <use xlink:href="#icon-edit" />
                    </svg>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="diglogOpen('add')">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item,index) in cartList" :key="index">
                <div class="good-name">
                  <img v-lazy="item.img" alt />
                  <span>{{item.name}}</span>
                </div>
                <div class="good-price">{{item.price}}元×{{item.quantity}}</div>
                <div class="good-total">{{item.cartCmount}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{this.productCnt}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalAmount}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalAmount}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="diglogTitle"
      :visible.sync="diglogVisable"
      width="39%"
      :close-on-click-modal="false"
    >
      <el-form label-width="80px" :model="addrForm" :rules="formRules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="姓名" v-model="addrForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input placeholder="请输入正确的手机号码" v-model="addrForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="addrZone">
          <el-cascader
            v-model="addrForm.addrZone"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="addrDetail">
          <el-input
            type="textarea"
            placeholder="街道、小区。楼牌号等，无需重复填写省市区"
            v-model="addrForm.addrDetail"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="diglogVisable = false">取 消</el-button>
        <el-button type="primary" @click="addrOnSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>  
<script>
import OrderHeader from "../components/orderHeader";
// import Modal from "../components/Modal";
export default {
  name: "order-confirm",
  data() {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      addrList: [], // 收货地址列表
      cartList: [], // 购物车中需要结算的商品列表
      cartTotalAmount: 0,
      productCnt: 0,
      selectedAddrId: 1, // 当前收货地址选中索引
      diglogVisable: false, // 是否显示新增或者编辑弹框
      diglogTitle: "",
      addrForm: {
        id: 0,
        username: "",
        mobile: "",
        addrZone: [],
        addrDetail: "",
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 16, message: "长度为2到16个字符", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入正确的手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
        addrZone: [
          { required: true, message: "请选择所在地区", trigger: "blur" },
        ],
        addrDetail: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
      options: [
        {
          value: "北京",
          label: "北京",
          children: [
            {
              value: "北京市",
              label: "北京市",
              children: [
                { value: "东城区", label: "东城区" },
                { value: "西城区", label: "西城区" },
                { value: "朝阳区", label: "朝阳区" },
                { value: "海淀区", label: "海淀区" },
                { value: "丰台区", label: "丰台区" },
              ],
            },
          ],
        },
        {
          value: "天津",
          label: "天津",
          children: [
            {
              value: "天津市",
              label: "天津市",
              children: [
                { value: "和平区", label: "和平区" },
                { value: "南开区", label: "南开区" },
                { value: "津南区", label: "津南区" },
                { value: "北辰区", label: "北辰区" },
                { value: "武清区", label: "武清区" },
              ],
            },
          ],
        },
        {
          value: "广东",
          label: "广东",
          children: [
            {
              value: "汕头市",
              label: "汕头市",
              children: [
                { value: "潮阳区", label: "潮阳区" },
                { value: "潮南区", label: "潮南区" },
                { value: "金平区", label: "金平区" },
                { value: "龙湖区", label: "龙湖区" },
                { value: "澄海区", label: "澄海区" },
              ],
            },
          ],
        },
      ],
    };
  },
  components: {
    OrderHeader,
    // Modal
  },
  mounted() {
    this.getAddrList();
  },
  methods: {
    async getAddrList() {
      let addrList = await this.axios.get(`address/list`);
      this.addrList = addrList;
      let cartData = await this.axios.get(`cart/list`, {
        params: { selected: 1 },
      });
      if (!cartData) {
        return false;
      }
      let { amount, CartProducts, selectedCartCnt } = cartData;
      this.cartList = CartProducts;
      this.cartList.forEach((item) => {
        this.productCnt += item.quantity;
        item.cartCmount = Number(item.price) * Number(item.quantity);
      });
      this.cartTotalAmount = amount;
      this.addCnt = this.cartList.length;
    },
    //删除按钮
    async delAddrById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      let addrList = await this.axios.delete(`address/${id}`);
      this.addrList = addrList;
      this.$message.success("删除收货地址成功");
    },
    //对话框打开事件
    diglogOpen(operation, item) {
      this.diglogVisable = true;
      if (operation == "add") {
        this.addrForm = {
          id: 0,
          username: "",
          mobile: "",
          addrZone: [],
          addrDetail: "",
        };
        this.diglogTitle = "添加收货地址";
      } else if (operation == "edit") {
        this.diglogTitle = "修改收货地址";
        let addrZone = [];
        let addrDetail = "";
        let { id, username, mobile, address } = item;
        let addrList = address.split(" "); //split通过指定方式分割字符串并串成数组，返回该数组
        if (addrList.length > 3) {
          addrZone = addrList.splice(0, 3); //splice删除数组，第一个使从哪开始，第二个删几个，返回删除的元素的数组
          addrDetail = addrList.slice(0, addrList.length).join(""); //slice选取数组，并返回新数组。join数组拼接字符串
        }
        this.addrForm = {
          id,
          username,
          mobile,
          addrZone,
          addrDetail,
        };
      }
    },
    handleChange(value) {
      if (this.addrForm.addrZone.length != 3) {
        this.addrForm.addrZone = [];
        return;
      }
    },
    addrOnSubmit() {
      //表单预验证
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return;
        let { id, username, mobile, addrZone, addrDetail } = this.addrForm;
        let newAddr = {
          id,
          username,
          mobile,
          address: addrZone.join(" ") + " " + addrDetail,
        };
        if (id !== 0) {
          let addrList = await this.axios.put(`address/${id}`, newAddr);
          this.addrLits = addrList;
          this.$message.success("修改收货地址成功");
        } else {
          let addrList = await this.axios.post("address", newAddr);
          this.addrList = addrList;
          this.$message.success("添加收货地址成功");
        }
        this.$refs.formRef.resetFields();
        this.diglogVisable = false;
      });
    },
    //结算
    async orderSubmit() {
      let selectAddrCnt = this.addrList.filter(
        (item) => item.id === this.selectedAddrId
      ).length;
      if (selectAddrCnt != 1) {
        this.$message.error("请选择一个收货地址");
        return;
      }
      if (this.cartList && this.cartList.length != 0) {
        let orderId = await this.axios.post("order", {
          addressId: this.selectedAddrId,
        });
        this.$router.push({
          path: "/order/pay",
          query: {
            orderNo: orderId,
          },
        });
      } else {
        this.$message.error("请勿重复提交");
        return;
      }
    },
  },
};
</script>
<style lang="scss">
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #ffffff;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .item-address {
        padding-top: 38px;
        .addr-list {
          display: flex;
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              display: flex;
              justify-content: space-between;
              height: 50px;
              line-height: 50px;
              .icon {
                width: 20px;
                height: 20px;
                fill: #666666;
                vertical-align: middle;
                &:hover {
                  fill: #ff6700;
                }
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url("/imgs/icon-add.png") #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            padding-right: 44px;
            color: #ff6600;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item-val {
          color: #ff6700;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 100px;
        }
        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
  .edit-wrap {
    font-size: 14px;
    .item {
      margin-bottom: 15px;
      .input {
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        & + .input {
          margin-left: 14px;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        margin-right: 15px;
      }
      textarea {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
      }
    }
  }
  /deep/.el-dialog__header {
    border-bottom: 1px solid #ddd;
  }

  .el-form {
    .el-form-item {
      .el-input {
        width: 217px;
      }
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
