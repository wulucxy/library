import { createRouter, createWebHistory } from 'vue-router'
import { setTitle } from '../utils'
import Home from '../views/home'

const Settings = require('../utils/const')

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/result',
      meta: { title: '搜索结果页' },
      component: () => import('@/views/result')
    },
    {
      path: '/apply',
      meta: { title: '购书申请' },
      component: () => import('@/views/apply')
    },
    {
      path: '/me',
      meta: { title: '我的' },
      component: () => import('@/views/me')
    },
  ]
})

router.beforeEach((to, from, next) => {
  setTitle({
    title: to.meta.title ? to.meta.title : Settings.title,
  })
  next();
})

export default router
