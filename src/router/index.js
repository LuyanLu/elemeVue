import Vue from 'vue'
import Router from 'vue-router'
import Homepage from 'components/Homepage'
import Order from 'components/Order'
import Business from 'components/Business'
import Login from 'components/Login'
import Myzone from 'components/Myzone'
import Search from 'components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/myzone',
      name: 'myzone',
      component: Myzone
    },
    {
      path: '/business/:id',
      name: 'business',
      component: Business
    },
    {
      path: '/search/:keyword',
      name: 'search',
      component: Search
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
