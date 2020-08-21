// 订单核心主视图
<template>
  <div>
    <order-header></order-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../components/orderHeader'
import NavFooter from '../components/NavFooter'
export default {
  name: 'order',
  components: {
    OrderHeader,
    NavFooter
  }
}
</script>
