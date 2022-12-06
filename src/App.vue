<template>
  <a-config-provider :locale="zhCN">
    <component :is="layout" />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

import { DEFAULT_LAYOUT } from './config/config'
import { getQucentConfig } from './services/cmd'
import { GlobalStore } from './store'
import getSystem from './utils'

const globalStore = GlobalStore()

const OS = getSystem()

function getVWH() {
  const vw = window.innerWidth
  const vh = window.innerHeight

  document.documentElement.style.setProperty('--vw', `${vw}px`)
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const route = useRoute()

const layout = computed(() => `${route.meta.layout || DEFAULT_LAYOUT}-layout`)

onMounted(async () => {
  getVWH()
  window.addEventListener('resize', () => getVWH())
  try {
    globalStore.setConfig(await getQucentConfig())
  } catch (error) {
    console.log(error)
  }
})
</script>

<style scoped></style>
