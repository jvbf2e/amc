<template>
  <div class="setting">
    <div class="setting-header">
      <span class="title">设置</span>
      <span class="close" @click="WebData.handlePush">
        <IconClose />
      </span>
    </div>
    <div class="setting-body">
      <div class="setting-sider nav">
        <a-anchor line-less boundary="center" :change-hash="false">
          <a-anchor-link class="nav-link" href="#accountAndSecurity">
            <a-space :size="8">
              <IconUser />
              <span>账户与安全</span>
            </a-space>
          </a-anchor-link>
          <a-anchor-link href="#general">
            <a-space :size="8">
              <IconSettings />
              <span>通用</span>
            </a-space>
          </a-anchor-link>
          <a-anchor-link href="#privacy">
            <a-space :size="8">
              <IconSafe />
              <span>隐私</span>
            </a-space>
          </a-anchor-link>
          <a-anchor-link href="#notifications">
            <a-space :size="8">
              <IconNotification />
              <span>通知</span>
            </a-space>
          </a-anchor-link>
          <a-anchor-link href="#shortcuts">
            <a-space :size="8">
              <IconRelation />
              <span>快捷键</span>
            </a-space>
          </a-anchor-link>
          <a-anchor-link href="#internalSettings">
            <a-space :size="8">
              <IconTool />
              <span>内部设置</span>
            </a-space>
          </a-anchor-link>
          <a-anchor-link href="#softwareUpdate">
            <a-space :size="8">
              <IconUpload />
              <span>软件更新</span>
            </a-space>
          </a-anchor-link>
          <a-anchor-link href="#aboutAMC">
            <a-space :size="8">
              <IconInfoCircle />
              <span>关于AMC</span>
            </a-space>
          </a-anchor-link>
        </a-anchor>
      </div>
      <a-scrollbar
        outer-class="setting-main"
        style="height: 100%; overflow-x: hidden; overflow-y: auto"
      >
        <CContainer />
      </a-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import {
  IconClose,
  IconInfoCircle,
  IconNotification,
  IconRelation,
  IconSafe,
  IconSettings,
  IconTool,
  IconUpload,
  IconUser,
} from '@arco-design/web-vue/es/icon'

import CContainer from './container.vue'

const router = useRouter()

const WebData = reactive({
  handlePush: () => {
    router.push({ name: 'Home' })
  },
})
</script>

<style lang="less" scoped>
.setting {
  position: relative;
  height: calc(var(--vh) - 44px);

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 24px;
    height: 54px;
    color: rgb(var(--gray-10));
    line-height: 54px;
    background-color: var(--color-neutral-2);
    border-bottom: 1px solid var(--color-border-3);

    .title {
      font-size: 18px;
    }

    .close {
      color: var(--color-text-2);
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: var(--color-text-1);
      }
    }
  }

  &-body {
    display: flex;
    flex-direction: row;
    height: calc(100% - 55px);
  }

  &-sider {
    padding: 12px 6px;
    width: 240px;
    background-color: var(--color-neutral-2);

    & > .arco-anchor-line-less {
      width: 100%;

      .arco-anchor-link-item {
        & :deep(.arco-anchor-link) {
          padding: 12px 24px;
          color: rgb(var(--gray-10));
          font-size: 14px;
          border-radius: 8px;

          &:hover {
            background-color: var(--color-fill-3);
          }
        }

        &.arco-anchor-link-active {
          :deep(.arco-anchor-link) {
            color: rgb(var(--arcoblue-6));
            background-color: var(--color-primary-light-2);
          }
        }
      }
    }
  }

  &-main {
    flex: 1;
    margin-top: 12px;
    padding: 0 24px 0;
  }
}
</style>
