import { defineStore } from 'pinia'
import { piniaPersistConfig } from '@/utils'

import type { GlobalState, QucentConfig, ThemeConfigProp } from '../interface'

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
    themeColor: 'darkblue',
    // themeConfig
    themeConfig: {
      // 默认 primary 主题颜色
      primary: '#409eff',
      // 是否开启深色模式
      isDark: false,
    },
    autoStart: 0,
    config: {
      ask_before_download: false,
      enable_auto_launch: false,
      enable_auto_update: false,
      file_save_location: null,
      language: 'en',
      theme_mode: 'system',
    },
    theme_system: true,
  }),
  getters: {
    getAutoStart: (state) => {
      return state.autoStart
    },
    getThemeColor: (state) => {
      return state.themeColor
    },
    getConfig: (state) => {
      return state.config
    },
    getLanguage: (state) => {
      return state.config.language
    },
    getConfigAutoLaunch: (state) => {
      return state.config.enable_auto_launch
    },
    getAutoUpdate: (state) => {
      return state.config.enable_auto_update
    },
    getThemeMode: (state) => {
      return state.config.theme_mode
    },
    getThemeSystem: (state) => {
      return state.theme_system
    },
  },
  actions: {
    // setToken
    async setToken(token: string) {
      this.token = token
    },
    // setConfig
    setConfig(config: QucentConfig) {
      this.config = config
      this.theme_system = config.theme_mode === 'system'
    },
    // setConfigAutoLaunch
    setConfigAutoLaunch(value: boolean) {
      this.config.enable_auto_launch = value
    },
    setSign(value: boolean) {
      this.sign = value
    },
    setThemeColor(value: string) {
      this.themeColor = value
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
