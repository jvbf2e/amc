import { defineStore } from 'pinia'
import {
  getMenuList,
  getInfo,
  loginApi,
  getDict,
  getCity,
  updateAppAvatar,
  readAmcVersion,
} from '@/api/modules'
import { piniaPersistConfig } from '@/utils'
import { addRoute, addMenu } from '@/router/utils'

import { GlobalStore } from './global'

import type { Login } from '@/api/interface'
import type { AppState, AppInfo, MessageConfig } from '../interface'

// AppStore
export const AppStore = defineStore({
  id: 'AppState',
  state: (): AppState => ({
    // routes
    routes: [],
    // 菜单权限列表
    menus: {},
    // 用户信息
    info: {
      ent_id: 2,
      ent_name: '',
      name: '',
      phone: '',
      role_list: [],
      is_bind_wechat: 2,
      wechat_nickname: '',
      image: '',
    },
    // 字典
    dicts: {},
    // 城市
    city: [],
    // 提示
    messages: [],
    // 加载
    loading: false,
  }),
  getters: {
    // 后台返回的菜单数据，用于方便构建菜单树
    dynamicMenus: (state) => {
      return state.menus
    },
    // 获取字典
    dynamicDict: (state) => {
      return state.dicts
    },
    // 获取提示
    dynamicMessage: (state) => {
      return state.messages
    },
  },
  actions: {
    async refresh() {
      await this.apiMenu()
      await this.setRouter()
      await this.setMenus()
      await this.apiInfo()
      await this.apiDict()
      await this.apiCity()
    },
    // setLoading
    async setLoading(value: boolean) {
      this.loading = value
    },
    // setMessage
    async setMessage(config: MessageConfig) {
      const id = crypto.randomUUID().toString()
      const row = Object.assign(
        {
          id,
          duration: 1.6,
          type: 'info',
          closable: false,
        },
        config
      )
      this.messages.push(row)
      setTimeout(() => this.deleteMessage(id), (row.duration as number) * 1000)
    },
    // deleteMessage
    async deleteMessage(id: string) {
      this.messages = this.messages.filter(
        (item: MessageConfig) => item.id !== id
      )
    },
    // setInfo
    async setInfo(info: AppInfo) {
      this.info = info
    },
    // setMenus
    async setMenus() {
      addMenu('Layout', this.routes)
    },
    // addMenu
    async addMenu(key: string, row: any[]) {
      this.menus[key] = row
    },
    // setRouter
    async setRouter() {
      addRoute(this.routes)
    },
    /// Api
    // apiLogin
    async apiLogin(body: Login.ReqLoginForm) {
      try {
        const { code, data: res, msg } = await loginApi(body)
        if (code === 0) {
          const store = GlobalStore()
          await store.setToken(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiInfo
    async apiInfo() {
      try {
        const { code, data: res, msg } = await getInfo()
        if (code === 0) {
          this.setInfo(res)
        } else if (code === 500) {
          // router.push({ name: 'login' })
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiMenu
    async apiMenu() {
      try {
        const { code, data: res, msg } = await getMenuList()
        if (code === 0) {
          this.routes = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDict
    async apiDict() {
      try {
        const { code, data: res, msg } = await getDict()
        if (code === 0) {
          this.dicts = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiCity
    async apiCity() {
      try {
        const { code, data: res, msg } = await getCity()
        if (code === 0) {
          this.city = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiAppAvatarUpdate
    async apiAppAvatarUpdate(file: File) {
      try {
        const { code, data: res, msg } = await updateAppAvatar(file)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiAmcVersionRead
    async apiAmcVersionRead() {
      try {
        const { code, data: res, msg } = await readAmcVersion()
        if (code === 0) {
          console.log('AmcVersion：', res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
  },
  persist: piniaPersistConfig('AppState'),
})
