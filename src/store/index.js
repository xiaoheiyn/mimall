import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex);
// Vue.use(mutations);
// Vue.use(actions);

const state = {
  username:'',//登录用户名
  cartCnt:0
}
export default new Vuex.Store({
  state,
  mutations,
  actions
  
});
