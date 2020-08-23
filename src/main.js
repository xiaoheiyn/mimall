import Vue from 'vue'
import router from './router/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookies from 'vue-cookies'
import store from './store'
import App from './App.vue'
import qs from 'qs'
//引用element
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'

// import env from './env'
// mock开关
/**const mock = false
if (mock) {
  require('./mock/api');
}*/
// 根据前端跨域方式做调整
axios.defaults.baseURL = '/mi/';
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;

//接口请求拦截
axios.interceptors.request.use(config => {
  // NProgress.start()
  config.headers.Authorizarion = window.sessionStorage.getItem('token')
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // console.log(config)
  if (config.method === 'post' || config.method === 'put') {
    config.data = qs.stringify({
      ...config.data  //使post方法对象转换json
    })
  }
  return config
})
// 接口响应拦截
axios.interceptors.response.use(function (response) {
  let { meta, data } = response.data;
  let path = location.hash;
  if (meta.status == 200) {
    return data
  } else if (meta.status == 403) {
    if (path != '#/index') {
      window.location.href = '/#/login';
    }
  } else {
    this.$message.error(meta.msg);
    return new Promise(() => {});
  }
})

Vue.use(VueAxios, axios);
//图片懒加载
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});
Vue.config.productionTip = false
Vue.use(VueCookies)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
