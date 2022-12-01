import { defineStore } from 'pinia'
import { piniaPersistConfig } from '@/utils'

import type { GlobalState, ThemeConfigProp } from '../interface'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'GlobalState',
  // state: 返回对象的函数
  state: (): GlobalState => ({
    sign: true,
    // token
    token: '',
    // userInfo
    userInfo: '',
    // element组件大小
    assemblySize: 'default',
    // language
    language: 'zh',
    // themeConfig
    themeConfig: {
      // 默认 primary 主题颜色
      primary: '#409eff',
      // 是否开启深色模式
      isDark: false,
    },
    autoStart: 0,
  }),
  getters: {
    getAutoStart: (state) => {
      return state.autoStart
    },
  },
  actions: {
    // setToken
    async setToken(token: string) {
      this.token = token
    },
    setSign(value: boolean) {
      this.sign = value
    },
    // setAutoStart
    setAutoStart(value: boolean) {
      this.autoStart = value ? 1 : 0
    },
    // setUserInfo
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    // setAssemblySizeSize
    setAssemblySizeSize(assemblySize: string) {
      this.assemblySize = assemblySize
    },
    // updateLanguage
    updateLanguage(language: string) {
      this.language = language
    },
    // setThemeConfig
    setThemeConfig(themeConfig: ThemeConfigProp) {
      this.themeConfig = themeConfig
    },
  },
  persist: piniaPersistConfig('GlobalState'),
})
