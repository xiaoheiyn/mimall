// 登录页面
<template>
  <div class="login">
    <div class="container">
      <a href="/#/index" class="logo">
        <img class="logo-img" v-lazy="'/imgs/login-logo.png'" />
      </a>
    </div>
    <!-- 表单区域 -->
    <div class="wrapper">
      <div class="container">
        <el-form :model="loginForm" :rules="loginRules" ref="form">
          <h3 class="account-mtdhods">
            <span class="account">帐号登录</span>
            <span class="spline">|</span>
            <span>扫码登录</span>
          </h3>
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="input"
              placeholder="请输入密码"
              v-model="loginForm.password"
              :type="pwdType"
              @focus="showIcon"
              @blur="hideIcon"
            >
              <i
                slot="suffix"
                class="el-input__icon el-icon-view"
                v-show="showicon"
                @mousedown.self.prevent="showPassword"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
          <div class="tips">
            <div class="sms">
              手机短信登录/
              <a class="register" href="/#/register">注册</a>
            </div>
            <div class="reg">
              立即注册
              <span>|</span>忘记密码？
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a class="f-link" href="javascript:;" target="_blank">小黑</a>
        <span>|</span>
        <a class="f-link" href="javascript:;" target="_blank">github</a>
        <span>|</span>
        <a class="f-link" href="javascript:;" target="_blank">谢谢大家关注</a>
        <span>|</span>
        <a class="f-link" href="javascript:;" target="_blank">记得点赞哦</a>
      </div>
      <div class="copyright">
        Copyright ©2020
        <a class="c-src" href="hjavascript:">chenxiaohei</a>
        All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      userId: '',
      showicon: false,
      pwdType: 'password',
      loginForm: {
        username: 'rzcoding',
        password: 'rzcoding',
      },
      //表单验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "用户名长度为3-16个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "密码长度为3-16个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showIcon() {
      this.showicon = true;
    },
    hideIcon() {
      this.showicon = false;
    },
    showPassword() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
      //nextTick在 DOM 更新循环结束之后执行的延迟回调,即修改了pwdType类型后dom更新后在聚焦
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    postLogin(param){
      return this.axios.post('login', param)
    },
    //点击登录之前需给表单来个预验证
    login() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const data1 = await this.postLogin(this.loginForm);
        //设置标识使浏览器识别
        this.$cookies.set("mi-session-id",data1);
        const data2 = await this.axios.get('user');
        this.$cookies.set("userId", data2.userId, 60 * 60 * 24 * 7);
        //vuex存储数据交互
        this.$store.dispatch("saveUserName", data2.username);
        this.$store.dispatch("saveCartCnt", data2.cartCnt);
        // 通过编程式导航跳转到后台主页
        this.$router.push({
          name: "index",
          params: {
            from: "login",
          },
        });
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.login {
  .logo {
    display: inline-block;
    .logo-img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      height: 576px;
      position: relative;

      .el-form {
        box-sizing: border-box;
        @include positionR(absolute, 29px, 0);
        @include wh(410px, 510px);
        padding: 0 31px;
        background-color: $colorG;

        .account-mtdhods {
          font-size: 24px;
          line-height: 24px;
          text-align: center;
          margin: 40px auto 29px;
          .account {
            color: $colorA;
          }
          .spline {
            margin: 0 32px;
            font-size: 26px;
          }
        }
        .el-form-item {
          width: 346px;
          height: 50px;
          // margin-bottom: 20px;
          // &:last-children{
          //   margin-bottom: 0;
          // }
          .el-input {
            height: 50px;
            line-height: 50px;
            /deep/ .el-input__inner {
              height: 50px;
            }
          }

          .el-button {
            background-color: #ff6700;
            border-color: #ff6700;
            // border: none;
            width: 100%;
            height: 50px;
            line-height: 1;
          }
        }

        .btn {
          border-radius: 20px;
        }

        .tips {
          @include flex();
          margin-top: 14px;
          font-size: $fontJ;
          cursor: pointer;
          .sms {
            color: $colorA;
            .register {
              color: $colorA;
            }
          }

          .reg {
            color: $colorD;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: $colorD;
    font-size: $fontI;
    text-align: center;
    .footer-link {
      .f-link {
        display: inline-block;
        color: $colorD;
      }
      span {
        margin: 0 10px;
      }
    }

    .copyright {
      margin-top: 13px;
      .c-src {
        color: $colorA;
      }
    }
  }
}
</style>
