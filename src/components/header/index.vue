<template>
  <div class="header" data-tauri-drag-region>
    <div class="header-info" data-tauri-drag-region>
      <a-trigger
        :popup-visible="WebData.trigger.visible"
        position="bl"
        trigger="click"
        auto-fit-position
        :unmount-on-close="false"
        @popup-visible-change="WebData.trigger.handleVisible"
      >
        <a-avatar
          class="header-info__avatar"
          :size="28"
          @click="WebData.handleShow"
        >
          <template v-if="appStore.info.image === ''">
            {{ appStore.info.name.slice(0, 1) }}
          </template>
          <template v-else>
            <img :src="appStore.info.image" :alt="appStore.info.name" />
          </template>
        </a-avatar>
        <template #content>
          <CInfo @handle-visible="WebData.trigger.handleVisible" />
        </template>
      </a-trigger>
    </div>
    <div class="header-logo">
      <div class="header-title" data-tauri-drag-region>
        {{ props.title }}
      </div>
    </div>
    <div class="operates-wrapper" data-tauri-drag-region>
      <!-- <a-space :size="6">
        <a-button type="text" size="small" title="消息通知">
          <template #icon>
            <icon-notification :size="18" />
          </template>
        </a-button>
        <a-tooltip
          :arrow-style="{ backgroundColor: 'var(--color-white)' }"
          :content-style="{
            backgroundColor: 'var(--color-white)',
            boxShadow: '0 0 6px rgba(0, 0, 0, 0.01)',
          }"
          position="br"
        >
          <template #content> asdsad </template>
          <a-button type="text" size="small" title="菜单">
            <template #icon>
              <icon-menu :size="18" />
            </template>
          </a-button>
        </a-tooltip>
      </a-space> -->
      <a-dropdown position="bl">
        <a-button type="text" size="small" title="创建">
          <template #icon>
            <IconPlus :size="18" />
          </template>
        </a-button>
        <template #content>
          <a-doption @click="WebData.handlePush('PackageAdd')">
            <template #icon>
              <IconPlus />
            </template>
            新建资源包
          </a-doption>
          <a-doption @click="WebData.handlePush('DebtAdd')">
            <template #icon>
              <IconPlus />
            </template>
            新建债权
          </a-doption>
        </template>
      </a-dropdown>
      <span class="divider" />
      <COperates class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppStore } from '@/store'

import CInfo from './components/info.vue'
import COperates from './operates.vue'

const router = useRouter()

const appStore = AppStore()

const props = defineProps({
  title: String,
})

const WebData = reactive({
  trigger: {
    visible: false,
    handleVisible: (value: boolean) => {
      WebData.trigger.visible = value
    },
  },
  isInfo: false,
  handleShow: () => {
    WebData.isInfo = true
  },
  handlePush: (name: string) => {
    router.push({ name })
  },
})
</script>

<style lang="less" scoped>
// blue 3370FF
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 44px;
  font-size: 12px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -webkit-box-align: center;

  .arco-btn {
    color: #c3c7d0;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  &-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: calc((64px - 28px) / 2);
    min-width: 300px;

    &__avatar {
      position: relative;
      width: 64px;
      height: 44px;
      background-color: #168cff;
      user-select: none;
      overflow: hidden;
      cursor: pointer;

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 50%;
      }

      &:hover&::after {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }

  &-logo {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * + * {
      margin-left: 12px;
    }
  }

  &-title {
    display: flex;
    align-items: center;
    position: relative;
    color: #c3c7d0;
    font-size: 18px;
    user-select: none;
  }

  .operates-wrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 300px;

    .divider {
      display: inline-block;
      margin: 0 12px;
      width: 1px;
      height: 24px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
