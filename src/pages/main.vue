<template>
  <div class="spin">
    <div class="loadingSeven">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppStore, GlobalStore } from '@/store'
import { appWindow, WebviewWindow } from '@tauri-apps/api/window'

const appStore = AppStore()
const globalStore = GlobalStore()

const { name } = useRoute()
const router = useRouter()

const WebData = reactive({
  init: async () => {
    // 是否是spin
    if (name === 'spin') {
      // 是否登录
      if (globalStore.token !== '') {
        // 是：跳转到 win-main
        await WinData.createMain()
      } else {
        // 否: 跳转到 win-login
        await WinData.createLogin()
      }
    } else {
      WebData.handleRefresh()
    }
  },
  handleRefresh: async () => {
    await appStore.refresh()
    await router.push({ name: 'Home' })
  },
  handleUpdate: async () => {},
})

const WinData = reactive({
  createLogin: async () => {
    globalStore.setSign(true)
    appWindow.hide()
    const loginWin = new WebviewWindow('login', {
      url: '/login',
      center: true,
      width: 800,
      height: 520,
      resizable: false,
      title: '登录 - AMC圈讯科技',
      fullscreen: false,
      transparent: true,
      decorations: false,
      alwaysOnTop: true,
    })
    loginWin.once('tauri://created', () => {
      appWindow.close()
    })
    loginWin.once('tauri://error', () => {})
  },
  createMain: async () => {
    appWindow.hide()
    const mainWin = new WebviewWindow('main', {
      url: '/main',
      center: true,
      minWidth: 1048,
      width: 1200,
      minHeight: 740,
      height: 768,
      resizable: true,
      title: 'AMC - 圈讯科技',
      fullscreen: false,
      transparent: true,
      decorations: false,
    })
    mainWin.once('tauri://created', () => {
      appWindow.close()
    })
    mainWin.once('tauri://error', () => {})
  },
})

onMounted(async () => {
  setTimeout(async () => await WebData.init(), 1000)
})
</script>

<style lang="less" scoped>
.spin {
  position: relative;
  width: var(--vw);
  height: var(--vh);
  user-select: none;

  .loadingSeven {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 40px;
    transform: translate(-50%, -50%);

    span {
      display: inline-block;
      width: 8px;
      height: 100%;
      border-radius: 4px;
      background: lightgreen;
      animation: loadsaven 1.04s ease infinite;
      -webkit-animation: loadsaven 1.04s ease infinite;

      &:nth-child(2) {
        animation-delay: 0.13s;
        -webkit-animation-delay: 0.13s;
      }

      &:nth-child(3) {
        animation-delay: 0.26s;
        -webkit-animation-delay: 0.26s;
      }

      &:nth-child(4) {
        animation-delay: 0.39s;
        -webkit-animation-delay: 0.39s;
      }

      &:nth-child(5) {
        animation-delay: 0.52s;
        -webkit-animation-delay: 0.52s;
      }
    }
  }
}

@keyframes loadsaven {
  0%,
  100% {
    height: 40px;
    background: lightgreen;
  }
  50% {
    height: 60px;
    margin-top: -20px;
    background: lightblue;
  }
}

@-webkit-keyframes loadsaven {
  0%,
  100% {
    height: 40px;
    background: lightgreen;
  }
  50% {
    height: 60px;
    margin-top: -20px;
    background: lightblue;
  }
}
</style>
