<template>
  <div class="operates" :class="isLogin ? 'login' : ''">
    <a-button type="text" title="最小化" @click="WebData.handleMinimize">
      <template #icon>
        <icon-minus />
      </template>
    </a-button>
    <template v-if="props.showMaximize">
      <a-button type="text" title="最大化" @click="WebData.handleMaximize">
        <template #icon>
          <template v-if="WebData.isMaximize">
            <span class="arco-btn-icon">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                class="arco-icon arco-icon-copy"
                stroke-width="4"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                data-v-3d2ca96a=""
              >
                <rect x="6" y="8" width="36" height="36" rx="1"></rect>
              </svg>
            </span>
          </template>
          <template v-else>
            <icon-copy />
          </template>
        </template>
      </a-button>
    </template>
    <a-button type="text" title="关闭" @click="WebData.handleClose">
      <template #icon>
        <icon-close />
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { listen } from '@tauri-apps/api/event'
import { getCurrent } from '@tauri-apps/api/window'

import { onMounted, reactive } from 'vue'
import { IconClose, IconMinus, IconCopy } from '@arco-design/web-vue/es/icon'
import { clearStorage } from '@/utils'

const props = defineProps({
  isLogin: {
    type: Boolean,
    default: false,
  },
  showMaximize: {
    type: Boolean,
    default: true,
  },
})

const WebData = reactive({
  isMaximize: true,
  handleMinimize: () => {
    getCurrent().minimize()
  },
  handleMaximize: async () => {
    WebData.isMaximize ? getCurrent().maximize() : getCurrent().unmaximize()
  },
  handleClose: () => {
    clearStorage()
    getCurrent().close()
  },
})

onMounted(async () => {
  WebData.isMaximize = !(await getCurrent().isMaximized())
  listen('tauri://resize', async () => {
    WebData.isMaximize = !(await getCurrent().isMaximized())
  })
})
</script>

<style lang="less" scoped>
.operates {
  position: relative;
  display: inline-block;

  & > .arco-btn {
    height: 24px;
    color: #c3c7d0;
    border-radius: 0;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  &.login {
    display: flex;
    align-items: center;

    & > .arco-btn {
      height: 100%;
      color: #999;
      font-size: 18px;

      &:hover {
        color: #666;
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
}
</style>
