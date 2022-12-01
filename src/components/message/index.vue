<template>
  <template v-if="appStore.dynamicMessage.length > 0">
    <div class="overlay overlay-message">
      <ul class="message-list message-list-top">
        <template v-for="item in appStore.dynamicMessage">
          <li
            :class="['message', item.type && `message-${item.type}`]"
            role="alert"
          >
            <span class="message-icon">
              <IconInfoCircleFill />
            </span>
            <span class="message-content">{{ item.content }}</span>
            <template v-if="item.closable">
              <span
                class="message-close"
                @click="WebData.handleClose(item.id as string)"
              >
                <span class="icon-hover">
                  <IconClose />
                </span>
              </span>
            </template>
          </li>
        </template>
      </ul>
    </div>
  </template>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { AppStore } from '@/store'

import { IconClose, IconInfoCircleFill } from '@arco-design/web-vue/es/icon'

const appStore = AppStore()

const WebData = reactive({
  handleClose: async (id: string) => {
    await appStore.deleteMessage(id)
  },
})
</script>

<style lang="less" scoped>
.icon {
  &-hover {
    position: relative;
    display: inline-block;
    cursor: pointer;
    line-height: 12px;

    .arco-icon {
      position: relative;
    }

    &:before {
      position: absolute;
      display: block;
      box-sizing: border-box;
      background-color: transparent;
      border-radius: var(--border-radius-circle);
      transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);
      content: '';
    }

    &:hover:before {
      background-color: var(--color-fill-2);
    }
  }
}

.message {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 10px 16px;
  overflow: hidden;
  line-height: 1;
  text-align: center;
  list-style: none;
  background-color: var(--color-bg-popup);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-small);
  box-shadow: 0 4px 10px #0000001a;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  pointer-events: auto;

  &-list {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0 10px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    pointer-events: none;
    z-index: 1003;

    &-top {
      top: 40px;
    }
  }

  &-icon {
    display: inline-block;
    margin-right: 8px;
    color: var(--color-text-1);
    font-size: 20px;
    vertical-align: middle;
    animation: arco-msg-fade 0.1s cubic-bezier(0, 0, 1, 1),
      arco-msg-fade 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
  }

  &-content {
    font-size: 14px;
    color: var(--color-text-1);
    vertical-align: middle;
  }

  &-close {
    margin-left: 8px;
    color: var(--color-text-1);
    font-size: 12px;
  }

  &-info {
    background-color: var(--color-bg-popup);
    border-color: var(--color-neutral-3);
    .message-icon {
      color: rgb(var(--primary-6));
    }
    .message-content {
      color: var(--color-text-1);
    }
  }

  &-success {
    background-color: var(--color-bg-popup);
    border-color: var(--color-neutral-3);
    .message-icon {
      color: rgb(var(--success-6));
    }
    .message-content {
      color: var(--color-text-1);
    }
  }

  &-warning {
    background-color: var(--color-bg-popup);
    border-color: var(--color-neutral-3);
    .message-icon {
      color: rgb(var(--warning-6));
    }
    .message-content {
      color: var(--color-text-1);
    }
  }

  &-danger {
    background-color: var(--color-bg-popup);
    border-color: var(--color-neutral-3);
    .message-icon {
      color: rgb(var(--danger-6));
    }
    .message-content {
      color: var(--color-text-1);
    }
  }

  &-loading {
    background-color: var(--color-bg-popup);
    border-color: var(--color-neutral-3);
    .message-icon {
      color: rgb(var(--primary-6));
    }
    .message-content {
      color: var(--color-text-1);
    }
  }

  .icon-hover.message-icon-hover:before {
    width: 20px;
    height: 20px;
  }
}

@keyframes arco-msg-fade {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes arco-msg-scale {
  0% {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
