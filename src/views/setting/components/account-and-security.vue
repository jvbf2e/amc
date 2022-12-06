<template>
  <p>
    <a-space :size="12" align="start">
      <a-avatar
        :size="48"
        :trigger-icon-style="{
          color: '#333',
          border: '1px solid var(--color-neutral-3)',
          backgroundColor: 'var(--color-bg-1)',
        }"
        :auto-fix-font-size="false"
        :style="{ backgroundColor: '#168cff' }"
      >
        <template v-if="appStore.info.image === ''">
          {{ appStore.info.name.slice(0, 1) }}
        </template>
        <template v-else>
          <img :src="appStore.info.image" :alt="appStore.info.name" />
        </template>
        <template #trigger-icon>
          <IconCamera />
        </template>
      </a-avatar>
      <span>{{ appStore.info.name }}</span>
    </a-space>
  </p>
  <p>
    <a-checkbox v-model="WebData.autoLaunch" @change="WebData.handleAutoLaunch">
      开机时自动启动AMC
    </a-checkbox>
  </p>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { AppStore, GlobalStore } from '@/store'
import { patchQucentConfig } from '@/services/cmd'

import { IconCamera } from '@arco-design/web-vue/es/icon'

const appStore = AppStore()
const globalStore = GlobalStore()

const WebData = reactive({
  autoLaunch: globalStore.getConfigAutoLaunch,
  handleAutoLaunch: async (
    value: boolean | (string | number | boolean)[],
    ev: Event
  ) => {
    try {
      globalStore.setConfigAutoLaunch(value as boolean)
      patchQucentConfig({ enable_auto_launch: value as boolean })
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})
</script>

<style lang="less" scoped></style>
