import { createRouter, createWebHistory } from 'vue-router'
import { Login, BaseLayout } from './constant'

import type { RouteRecordRaw } from 'vue-router'

// * 导入所有router
const metaRouters = import.meta.glob('./modules/*.ts', { eager: true })

// * 处理路由表
export const routerArray: RouteRecordRaw[] = []
Object.values(metaRouters).forEach((item: any) => {
  Object.values(item).forEach((node: any) => {
    routerArray.push(...node)
  })
})

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'spin' },
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/pages/main.vue'),
  },
  {
    path: '/spin',
    name: 'spin',
    component: () => import('@/pages/main.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      layout: 'login',
      requiresAuth: false,
      title: '登录页',
      key: 'login',
    },
  },
  {
    path: '/password_reset',
    name: 'loginPassword',
    component: () => import('@/views/login/password_reset.vue'),
    meta: {
      layout: 'login',
      requireAuth: false,
      title: '忘记密码',
      key: 'loginPassword',
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/setting/index.vue'),
    meta: {
      layout: 'base',
      requiresAuth: false,
      title: '设置',
      key: 'Setting',
    },
  },
  ...routerArray,
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: { name: '404' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: false,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
