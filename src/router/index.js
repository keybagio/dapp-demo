import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import ETH from '@/view/eth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },{
    path: '/eth',
    name: 'ETH',
    component: ETH,
  }]
})