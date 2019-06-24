import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
//participate   // mode: 'history',
export default new Router({

  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/details',
      name: 'details',
      component: () => import(/* webpackChunkName: "about" */ './views/Details.vue')
    },
    {
      path: '/participate',
      name: 'participate',
      component: () => import(/* webpackChunkName: "about" */ './views/participate.vue')
    },
    {
      path: '/detailsstera',
      name: 'detailsstera',
      component: () => import(/* webpackChunkName: "about" */ './views/DetailsStera.vue')
    }
  ]
})
