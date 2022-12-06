<template>
  <div class="container">
    <!-- 我的账号 -->
    <CContainerItem id="accountAndSecurity" title="我的账户">
      <AccountAndSecurityPage />
    </CContainerItem>
    <a-divider :margin="30" />
    <!-- 通用 -->
    <CContainerItem id="general" title="通用">
      <GeneralPage />
    </CContainerItem>
    <a-divider :margin="30" />
    <!-- 隐私 -->
    <CContainerItem id="privacy" title="隐私">
      <p>
        <span>屏蔽名单</span>
        <br />
        <span>被屏蔽的用户将无法与你单聊或协作</span>
        <a-link href="javascript:;" :hoverable="false">管理</a-link>
      </p>
    </CContainerItem>
    <a-divider :margin="30" />
    <!-- 通知 -->
    <CContainerItem id="notifications" title="通知"></CContainerItem>
    <a-divider :margin="30" />
    <!-- 快捷键 -->
    <CContainerItem id="shortcuts" title="快捷键">
      <div class="hotkey-list">
        <CHotkeyItem
          v-model="HotKeyData.list.amcShowHide"
          label="显示/隐藏AMC"
        />
      </div>
    </CContainerItem>
    <a-divider :margin="30" />
    <!-- 内部设置 -->
    <CContainerItem id="notifications" title="通知">
      <p>
        <span>最新AMC配置</span>
        <br />
        <span>需要重启AMC获取最新配置</span>
        <a-link href="javascript:;" :hoverable="false">获取配置</a-link>
      </p>
    </CContainerItem>
    <a-divider :margin="30" />
    <!-- 软件更新 -->
    <CContainerItem id="softwareUpdate" title="软件更新">
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
                {{ WebData.softwareUpdate.uLoading ? '解压中...' : '马上安装' }}
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
    </CContainerItem>
    <a-divider :margin="30" />
    <!-- 关于AMC -->
    <CContainerItem id="aboutAMC" title="关于AMC">
      <!-- <p>已通过 ISO 27001:2013 信息安全认证</p> -->
      <a-space :size="18" direction="vertical" fill>
        <!-- <a-link href="javascript:;" :hoverable="false">更新日志</a-link>
          <a-link href="javascript:;" :hoverable="false">特色功能介绍</a-link>
          <a-link href="javascript:;" :hoverable="false">获取最新客户端</a-link> -->
        <a-link
          href="http://amccs.qucent.cn/agreement/terms.html"
          :hoverable="false"
          target="_blank"
          rel="noreferrer"
        >
          用户协议
        </a-link>
        <a-link
          href="http://amccs.qucent.cn/agreement/privacy.html"
          :hoverable="false"
          target="_blank"
          rel="noreferrer"
        >
          隐私政策
        </a-link>
      </a-space>
    </CContainerItem>
  </div>
</template>

<script setup lang="ts">
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

import { reactive } from 'vue'
import { VERSION } from '@/config/config'
import { AppStore, GlobalStore } from '@/store'
import { enableAutostart, disableAutoStart } from '@/resources/api/autostart'

import CHotkeyItem from './components/hotkey-item.vue'
import CContainerItem from './components/container-item.vue'
import AccountAndSecurityPage from './components/account-and-security.vue'
import GeneralPage from './components/general.vue'

import type { UpdateManifest } from '@tauri-apps/api/updater'

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
        enableAutostart().then((val) => {})
      } else {
        disableAutoStart().then((val) => {})
      }
      globalStore.setAutoStart(value)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const HotKeyData = reactive({
  list: {
    amcShowHide: '',
  },
})
</script>

<style lang="less" scoped>
.container {
  position: relative;
  padding-bottom: 24px;
}

.hotkey-list {
  position: relative;

  &-item {
    & + & {
      margin-top: 6px;
    }

    &__input {
      margin-top: 6px;
      width: 240px;
    }
  }
}
</style>
