import { defineStore } from 'pinia'
import {
  createWechat,
  deleteWechat,
  getHomeDynamicList,
  getHomeEmployeeInfo,
  getHomeInventoryList,
  getHomeNoticeList,
  getHomePackageInfo,
  updatePassword,
} from '@/api/modules'
import { piniaPersistConfig } from '@/utils'

import type { Home } from '@/api/interface'
import type { HomeState } from '../interface'

// HomeStore
export const HomeStore = defineStore({
  id: 'HomeState',
  state: (): HomeState => ({
    employee: {
      name: '',
      phone: '',
      image: '',
      url: '',
      employee_count: 0,
      role_count: 0,
      online_count: 0,
    },
    statistics: {
      year: `${new Date().getFullYear()}年度`,
      invest_amount: 0,
      debt_amount: 0,
      collection_total: 0,
      rate: 0,
    },
    inventory: {
      unfinished: [],
      finished: [],
      carbon_copy: [],
    },
    dynamic: [],
    notice: [],
  }),
  getters: {
    getInventory: (state) => state.inventory,
  },
  actions: {
    /// Api
    // apiHomeGetPackageInfo
    async apiHomeGetPackageInfo() {
      try {
        const { code, data: res, msg } = await getHomePackageInfo()
        if (code === 0) {
          this.statistics = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiHomeGetInventoryList
    async apiHomeGetInventoryList() {
      try {
        const { code, data: res, msg } = await getHomeInventoryList()
        if (code === 0) {
          this.inventory = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiHomeDynamicList
    async apiHomeDynamicList() {
      try {
        const { code, data: res, msg } = await getHomeDynamicList()
        if (code === 0) {
          this.dynamic = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiHomeNoticeList
    async apiHomeNoticeList() {
      try {
        const { code, data: res, msg } = await getHomeNoticeList()
        if (code === 0) {
          this.notice = res.data
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiHomeEmployeeInfo
    async apiHomeEmployeeInfo() {
      try {
        const { code, data: res, msg } = await getHomeEmployeeInfo()
        if (code === 0) {
          this.employee = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiHomePasswordUpdate
    async apiHomePasswordUpdate(params: Home.ResUpdatePassword) {
      try {
        const { code, msg } = await updatePassword(params)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiHomeWechatCreate
    async apiHomeWechatCreate(params: string) {
      try {
        const { code, msg } = await createWechat(params)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiHomeWechatDelete
    async apiHomeWechatDelete() {
      try {
        const { code, msg } = await deleteWechat()
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
  },
  persist: piniaPersistConfig('HomeState'),
})
