import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/menu', component: () => import('pages/MenuPage.vue') }]
  },
  {
    path: '/chat',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/chat', component: () => import('pages/ChatPage.vue') }]
  },
  {
    path: '/feedbacks',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/feedbacks', component: () => import('pages/FeedbacksPage.vue') }]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/dashboard', component: () => import('pages/DashboardPage.vue') }]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
