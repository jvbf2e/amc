<template>
  <div class="not-container">
    <img :src="getImage('images/error/403.png')" class="not-img" alt="403" />
    <div class="not-detail">
      <h2>403</h2>
      <h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
      <a-button type="primary" @click="tabStore.goHome()">返回首页</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/hooks/useImage'
import { TabsStore } from '@/store/modules/tabs'
const tabStore = TabsStore()
</script>

<style scoped lang="less">
@import './index.less';
</style>
