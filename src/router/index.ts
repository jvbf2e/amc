// import { NProgress } from '@/plugin'
import { GlobalStore } from '@/store'
import { cancelAllRequest, clearStorage } from '@/utils'
import { appWindow, WebviewWindow } from '@tauri-apps/api/window'

import router from './router'

const whileList = ['login', '']

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, _from, next) => {
  // * 在跳转路由之前，清除所有的请求
  cancelAllRequest()

  next()
})

router.afterEach(() => {
  // NProgress.done()
})

export default router
