<template>
  <template v-if="appStore.loading">
    <div class="overlay overlay-loading">
      <div class="loading">
        <a-spin dot />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { AppStore } from '@/store'

const appStore = AppStore()
</script>

<style lang="less" scoped>
.overlay {
  &-loading {
    position: fixed;
    top: 44px;
    left: 64px;
    width: calc(var(--vw) - 64px);
    height: calc(var(--vh) - 44px);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px 0 0 0;
    box-sizing: border-box;
    z-index: 1001;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
}
</style>
