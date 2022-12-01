import { defineStore } from 'pinia'
import { piniaPersistConfig } from '@/utils'

import type { AuthState, AppMenuItem } from '../interface'

// AuthStore
export const AuthStore = defineStore({
  id: 'AuthState',
  state: (): AuthState => ({
    // 路由
    router: [],
    // 用户按钮权限列表
    authButtons: {},
    // 路由权限列表
    authRouter: ['/home', '/home/index', '/package', '/package/dashboard'],
  }),
  getters: {
    // 获取路由
    getRouter: (state) => {
      return state.router
    },
    // 处理权限按钮数据，用于方便控制按钮
    authButtonsObj: (state) => {
      return state.authButtons
    },
    // 后台返回的菜单数据，用于方便控制路由跳转时权限（这里已经处理成一维数组了）
    dynamicRouter: (state) => {
      return state.authRouter
    },
  },
  actions: {
    // setRouter
    async setRouter(router: AppMenuItem[]) {
      this.router = router
    },
    // setAuthButtons
    async setAuthButtons(authButtonList: { [key: string]: any }) {
      this.authButtons = authButtonList
    },
    // setAuthRouter
    async setAuthRouter(dynamicRouter: string[]) {
      this.authRouter = dynamicRouter
    },
  },
  persist: piniaPersistConfig('AuthState'),
})
