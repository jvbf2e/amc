<template>
  <div class="container">
    <!-- 我的账号 -->
    <div>
      <h2 class="container-title" id="accountAndSecurity">我的账户</h2>
      <div class="container-body">
        <p>
          <a-space :size="12" align="start">
            <a-avatar
              :size="48"
              :trigger-icon-style="{
                color: '#333',
                border: '1px solid var(--color-neutral-3)',
                backgroundColor: '#fff',
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
          <a-checkbox
            :value="WebData.autoStart"
            @change="WebData.handleAutoStart"
            >开机时自动启动AMC</a-checkbox
          >
        </p>
      </div>
    </div>
    <a-divider :margin="30" />
    <!-- 通用 -->
    <div>
      <h2 class="container-title" id="general">通用</h2>
      <div class="container-body"></div>
    </div>
    <a-divider :margin="30" />
    <!-- 隐私 -->
    <div>
      <h2 class="container-title" id="privacy">隐私</h2>
      <div class="container-body">
        <p>
          <span>屏蔽名单</span>
          <br />
          <span>被屏蔽的用户将无法与你单聊或协作</span>
          <a-link href="javascript:;" :hoverable="false">管理</a-link>
        </p>
      </div>
    </div>
    <a-divider :margin="30" />
    <!-- 通知 -->
    <div>
      <h2 class="container-title" id="notifications">通知</h2>
      <div class="container-body"></div>
    </div>
    <a-divider :margin="30" />
    <!-- 快捷键 -->
    <div>
      <h2 class="container-title" id="shortcuts">快捷键</h2>
      <div class="container-body"></div>
    </div>
    <a-divider :margin="30" />
    <!-- 内部设置 -->
    <div>
      <h2 class="container-title" id="internalSettings">内部设置</h2>
      <div class="container-body">
        <p>
          <span>最新AMC配置</span>
          <br />
          <span>需要重启AMC获取最新配置</span>
          <a-link href="javascript:;" :hoverable="false">获取配置</a-link>
        </p>
      </div>
    </div>
    <a-divider :margin="30" />
    <!-- 软件更新 -->
    <div>
      <h2 class="container-title" id="softwareUpdate">软件更新</h2>
      <div class="container-body">
        <p>
          <a-space :size="12">
            <span>
              当前已是最新版本：
              <span class="value">{{ WebData.softwareUpdate.version }}</span>
            </span>
            <template v-if="WebData.softwareUpdate.loading">
              <a-button size="mini" :loading="WebData.softwareUpdate.loading">
                正在检查更新
              </a-button>
            </template>
            <table v-else>
              <template v-if="WebData.softwareUpdate.visible">
                <a-button
                  type="primary"
                  size="mini"
                  :loading="WebData.softwareUpdate.uLoading"
                  @click="WebData.softwareUpdate.handleUpdate"
                >
                  {{
                    WebData.softwareUpdate.uLoading ? '解压中...' : '马上安装'
                  }}
                </a-button>
              </template>
              <template v-else>
                <a-button
                  type="primary"
                  size="mini"
                  @click="WebData.softwareUpdate.handleVersion"
                >
                  检查更新
                </a-button>
              </template>
            </table>
          </a-space>
        </p>
        <p>
          <a-checkbox value="1">自动安装更新</a-checkbox>
        </p>
        <template v-if="WebData.softwareUpdate.visible">
          <p>更新详情</p>
          <p class="msg">{{ WebData.softwareUpdate.body }}</p>
        </template>
      </div>
    </div>
    <a-divider :margin="30" />
    <!-- 关于AMC -->
    <div>
      <h2 class="container-title" id="aboutAMC">关于AMC</h2>
      <div class="container-body">
        <p>已通过 ISO 27001:2013 信息安全认证</p>
        <a-space :size="18" direction="vertical" fill>
          <a-link href="javascript:;" :hoverable="false">更新日志</a-link>
          <a-link href="javascript:;" :hoverable="false">特色功能介绍</a-link>
          <a-link href="javascript:;" :hoverable="false">获取最新客户端</a-link>
          <a-link href="javascript:;" :hoverable="false">用户协议</a-link>
          <a-link href="javascript:;" :hoverable="false">隐私政策</a-link>
        </a-space>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import {
  isAutostartEnabled,
  enableAutostart,
  disableAutoStart,
} from '@/resources/api/autostart'

import { reactive, watchEffect } from 'vue'
import { VERSION } from '@/config/config'
import { AppStore, GlobalStore } from '@/store'

import type { UpdateManifest } from '@tauri-apps/api/updater'

import { IconCamera } from '@arco-design/web-vue/es/icon'

const appStore = AppStore()
const globalStore = GlobalStore()

const WebData = reactive({
  autoStart: globalStore.getAutoStart,
  softwareUpdate: {
    loading: false,
    visible: false,
    uLoading: false,
    version: VERSION,
    body: '',
    handleUpdate: async () => {
      try {
        WebData.softwareUpdate.uLoading = true
        await installUpdate()
        await relaunch()
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      }
    },
    handleVersion: async () => {
      try {
        WebData.softwareUpdate.loading = true
        const { shouldUpdate, manifest } = await checkUpdate()
        console.log(manifest)
        if (shouldUpdate) {
          const { version, body } = manifest as UpdateManifest
          setTimeout(() => {
            WebData.softwareUpdate.version = version
            WebData.softwareUpdate.body = body
            WebData.softwareUpdate.visible = true
            WebData.softwareUpdate.loading = false
          }, 1000)
        } else {
          setTimeout(() => {
            WebData.softwareUpdate.loading = false
            appStore.setMessage({
              content: '当前已是最新版本',
              type: 'success',
            })
          }, 500)
        }
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      }
    },
  },
  handleAutoStart: async (value: any) => {
    try {
      if (value) {
        enableAutostart().then((val) => {
          console.log('enableAutostart', val)
        })
      } else {
        disableAutoStart().then((val) => {
          console.log('disableAutoStart', val)
        })
      }
      globalStore.setAutoStart(value)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

watchEffect(async () => {
  const isEnabled = await isAutostartEnabled()
  globalStore.setAutoStart(isEnabled)
})
</script>

<style lang="less" scoped>
.container {
  &-title {
    font-size: 18px;
    font-weight: 500;
  }
  &-body {
    color: var(--color-text-2);
    font-size: 14px;

    .msg {
      color: var(--color-text-3);
    }

    .value {
      color: var(--color-text-1);
    }
  }
}
</style>
