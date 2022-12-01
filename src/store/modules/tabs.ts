import { defineStore } from 'pinia'
import router from '@/router/index'
import { HOME_URL, HOME_URL_NAME } from '@/config/config'
import { piniaPersistConfig } from '@/utils'

import type { TabsState } from '../interface'

// TabsStore
export const TabsStore = defineStore({
  id: 'TabsState',
  state: (): TabsState => ({
    tabsMenuValue: HOME_URL,
  }),
  getters: {},
  actions: {
    // Go Home
    async goHome() {
      console.log(router)
      router.push('/')
      // router.push('/home/index')
      this.tabsMenuValue = HOME_URL
    },
  },
  persist: piniaPersistConfig('TabsState'),
})
