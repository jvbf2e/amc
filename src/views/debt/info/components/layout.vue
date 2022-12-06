<template>
  <div class="debt">
    <div class="debt__header">
      <span class="debt__header-undo" @click="WebData.handlePush">
        <IconUndo :size="20" />
      </span>
      <a-divider direction="vertical" />
      <span class="debt__header-title">{{ titleComp }}</span>
    </div>
    <a-scrollbar
      :outer-class="['debt__body', { no_padding: props.noPadding }]"
      style="height: 100%; overflow-x: hidden; overflow-y: auto"
    >
      <slot />
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { IconUndo } from '@arco-design/web-vue/es/icon'

const props = defineProps({
  noPadding: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const router = useRouter()

const titleComp = computed(() => route.query.title)

const WebData = reactive({
  handlePush: () => {
    router.push({ name: 'DebtList' })
  },
})
</script>

<style lang="less" scoped>
.debt {
  position: relative;
  height: 100%;

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 0 24px;
    height: 59px;
    border-bottom: 1px solid var(--color-border-1);
    box-sizing: border-box;

    &-undo {
      color: var(--color-text-3);
      font-weight: initial;
      cursor: pointer;

      &:hover {
        color: var(--color-text-1);
      }
    }

    &-title {
      color: var(--color-text-1);
      font-size: 18px;
      font-weight: bold;
    }
  }

  &__body {
    padding: 24px;
    height: calc(100% - 60px);
    box-sizing: border-box;

    &.no_padding {
      padding: 0;
    }
  }
}
</style>
