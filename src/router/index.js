import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/homePage'
// import Order from '../components/order'
// import Business from '../components/business'
import Login from '../components/login'
import Myzone from '../components/myZone'
import Search from '../components/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    // {
    //   path: '/order',
    //   name: 'order',
    //   component: Order
    // },
    {
      path: '/myzone',
      name: 'myzone',
      component: Myzone
    },
    // {
    //   path: '/business/:id',
    //   name: 'business',
    //   component: Business
    // },
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
