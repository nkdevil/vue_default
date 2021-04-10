import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/private/',
    component: () => import('@/views/Private'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'private',
        redirect: 'index'
      },
      {
        path: 'index',
        name: 'private_index',
        component: () => import('@/views/private/Index.vue')
      }
    ]
  },
  {
    path: '/public/',
    component: () => import('@/views/Public'),
    children: [
      {
        path: '/',
        name: 'public',
        redirect: 'index'
      },
      {
        path: 'index',
        name: 'public_index',
        component: () => import('@/views/public/Index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
