/**
 * 商城vuex-mutations
 */

export default {
    saveUserName(state,username){
        state.username = username;
    },
    saveCartCnt(state,cartCnt){
        state.cartCnt = cartCnt;
    }
}