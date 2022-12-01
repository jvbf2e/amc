<template>
  <div class="not-container">
    <img :src="getImage('image/error/404.png')" class="not-img" alt="404" />
    <div class="not-detail">
      <h2>404</h2>
      <h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
      <a-button type="primary" @click="WebData.handlePush">返回首页</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { getImage } from '@/hooks/useImage'
import { AppStore } from '@/store'

const appStore = AppStore()

const router = useRouter()

const WebData = reactive({
  handlePush: () => {
    router.push({ name: 'Home' })
  },
})

onMounted(async () => {
  await appStore.setRouter()
})
</script>

<style scoped lang="less">
@import './index.less';
</style>
