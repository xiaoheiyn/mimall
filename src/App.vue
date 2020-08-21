<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {}
  },
  mounted() {
    if(this.$cookies.get('userId')){
      this.getUser()
    }
  },
  methods:{
    async getUser(){
      const data = await this.axios.get('user')
      if(data){
        this.$store.dispatch('saveUserName',data.username)
        this.$store.dispatch('saveCartCnt',data.cartCnt)
      }else{
        this.$cookies.remove('userId')
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/buttun.scss';
</style>
