import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { setTitle } from '../utils'
import Home from '../views/home'
import Me from '../views/me'
import Apply from '../views/apply'

const CONST = require('../utils/const')

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      meta: { showTabBar: true },
      component: Home
    },
    {
      path: '/search',
      meta: { title: '搜索',  showTabBar: false },
      component: () => import('@/views/search')
    },
    {
      path: '/detail',
      meta: { title: '图书详情页',  showTabBar: false },
      component: () => import('@/views/detail')
    },
    {
      path: '/apply',
      meta: { title: '购书申请',  showTabBar: true },
      component: Apply
    },
    {
      path: '/me',
      meta: { title: '我的', showTabBar: true },
      component: Me
    },
  ]
})

router.beforeEach((to, from, next) => {
  setTitle({
    title: to.meta.title ? to.meta.title : CONST.title,
  })
  store.dispatch('setRoute', to)
  next();
})

export default router
