import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home
    },
  ]
})

export default router
