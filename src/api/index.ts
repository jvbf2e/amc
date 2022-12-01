import { relaunch } from '@tauri-apps/api/process'
import { clearStorage, ResultEnum, service } from '@/utils'
import { GlobalStore } from '@/store'
import router from '@/router'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from '@/config/serviceLoading'
import { checkStatus } from './helper/checkStatus'
import { API_URL } from '@/config/config'

import type { JRequestConfig } from '@/utils'

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL:
    process.env.NODE_ENV === 'development'
      ? (import.meta.env.VITE_API_URL as string)
      : API_URL,
}

export default <D = any, T = any>(data: JRequestConfig<D, T>) =>
  service<D, T>({
    ...config,
    ...data,
    interceptors: {
      requestInterceptors(config) {
        // * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
        config.headers?.noLoading || showFullScreenLoading()
        const globalStore = GlobalStore()
        const token: string = globalStore.token
        return { ...config, headers: { auth: token } }
      },
      responseInterceptors(result) {
        tryHideFullScreenLoading()
        // * 登陆失效（code == 500）
        if (result.code == ResultEnum.OVERDUE) {
          clearStorage()
          relaunch()
          return result
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (result.code && result.code !== ResultEnum.SUCCESS) {
          return result
        }
        return result
      },
      responseInterceptorsCatch(err) {
        const { response } = err
        tryHideFullScreenLoading()
        // 根据响应的错误状态码，做不同的处理
        if (response) return checkStatus(response.status)
        // 服务器结果都没有返回（可能服务器错误可能客户端断网），断网处理：可以跳转到断网页面
        if (!window.navigator.onLine) return router.replace({ path: '/500' })
        return err
      },
    },
  })
