import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Index from '../pages/index'
import Product from '../pages/product'
import Detail from '../pages/detail'
import Cart from '../pages/cart'
import Order from '../pages/order'
import OrderConfirm from '../pages/orderConfirm'
import OrderList from '../pages/orderList'
import OrderPay from '../pages/orderPay'
import Login from '../pages/login'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'index',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'index',
        component: Index
      }, {
        path: '/product/:id',
        name: 'product',
        component: Product
      }, {
        path: '/detail/:id',
        name: 'detail',
        component: Detail
      }
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    children: [
      {
        path: 'list',
        name: 'order-list',
        component: OrderList
      },
      {
        path: 'pay',
        name: 'order-pay',
        component: OrderPay
      },
      {
        path: 'confirm',
        name: 'order-confirm',
        component: OrderConfirm
      }
    ]
  }

]

const router = new Router({
  routes
})

export default router
