<template>
  <div class="enterprise-info">
    <a-tabs v-model="WebData.active">
      <template v-for="item in WebData.list" :key="item.key">
        <a-tab-pane :title="item.title">
          <component :is="item.component" :key="item.key"></component>
        </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { AppStore, RoleStore } from '@/store'

import Config from './config'

const appStore = AppStore()
const roleStore = RoleStore()

const WebData = reactive({
  active: '',
  list: [] as { [key: string]: any },
  init: (rows: { [key: string]: any }) => {
    WebData.list = []
    WebData.active = rows[0].key as string
    rows.forEach((row: any) => {
      WebData.list.push({
        key: row.key,
        title: row.name,
        component: Config.tabItems[row.key],
      })
    })
  },
})

onMounted(async () => {
  try {
    appStore.menus?.EnterpriseInfo &&
      WebData.init(appStore.menus?.EnterpriseInfo)
    await roleStore.apiRoleGetAll()
  } catch (error) {
    appStore.setMessage({ content: error as string, type: 'danger' })
  }
})
</script>

<style lang="less" scoped>
.enterprise-info {
  position: relative;
  padding: 12px 24px;
}
</style>
