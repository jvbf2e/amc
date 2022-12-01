<template>
  <div class="page-wrapper">
    <div class="page-advertisement">
      <a-carousel
        :auto-play="true"
        indicator-type="line"
        indicator-position="bottom"
        animation-name="fade"
        show-arrow="never"
        style="width: 100%; height: 100%"
      >
        <a-carousel-item>
          <img
            src="https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg"
            data-tauri-drag-region
          />
        </a-carousel-item>
        <a-carousel-item>
          <img
            src="https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c"
            data-tauri-drag-region
          />
        </a-carousel-item>
        <a-carousel-item>
          <img
            src="https://img.zcool.cn/community/01c8f15aeac135a801207fa16836ae.jpg@1280w_1l_2o_100sh.jpg"
            data-tauri-drag-region
          />
        </a-carousel-item>
      </a-carousel>
    </div>
    <div class="page-body">
      <div class="page-header" data-tauri-drag-region>
        <COperates :is-login="true" :show-maximize="false" />
      </div>
      <div class="page-content">
        <router-view />
      </div>
      <div class="page-footer select">
        {{ `© ${new Date().getFullYear()} v${WebData.version}` }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WebSocket, { Message } from 'tauri-plugin-websocket-api'
import { getVersion } from '@tauri-apps/api/app'

import { onMounted, reactive } from 'vue'

import COperates from '@/components/header/operates.vue'

const WebData = reactive({
  version: '',
})

const initFun = async () => {
  WebData.version = await getVersion()
}

onMounted(() => {
  initFun()
})
</script>

<style lang="less" scoped>
.page {
  &-wrapper {
    position: relative;
    width: var(--vw);
    height: var(--vh);
    box-sizing: border-box;
    border-radius: 9px;
    overflow: hidden;
  }

  &-advertisement {
    width: 400px;
    height: 100%;
    user-select: none;
  }

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: end;
    min-height: 30px;
  }

  &-body {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 460px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 18px 0 0 18px;
    z-index: 999;
  }

  &-content {
    flex: 1;
    position: relative;
  }

  &-footer {
    position: relative;
    height: 30px;
    color: var(--color-text-4);
    text-align: center;
  }
}
</style>
