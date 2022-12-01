<template>
  <div class="layout-bg"></div>
  <div class="layout-sider">
    <Header class="header-wrapper" title="圈讯AMC平台" :show-max="true" />
    <Menu class="sider-wrapper" />
  </div>
  <div class="layout-body">
    <RouterView v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cacheRouter">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </RouterView>
  </div>
  <div class="layout-mask">
    <Message />
    <Loading />
  </div>
</template>

<script setup lang="ts">
import cacheRouter from '@/router/cacheRouter'
import Header from '@/components/header/index.vue'
import Menu from '@/components/menu/index.vue'
import Message from '@/components/message/index.vue'
import Loading from '@/components/loading/index.vue'
</script>

<style lang="less" scoped>
.layout {
  &-bg,
  &-sider,
  &-body,
  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
  }

  &-bg {
    width: var(--vw);
    height: var(--vh);
    background-color: #262f3e;
    z-index: 9;
  }

  &-sider {
    z-index: 29;
  }

  &-body {
    width: calc(var(--vw) - 64px);
    height: calc(var(--vh) - 44px);
    background-color: #fff;
    border-radius: 12px 0 0 0;
    overflow: hidden;
    transform: translate(64px, 44px);
    z-index: 49;
  }

  &-mask {
    z-index: 69;
  }
}

.header-wrapper {
  width: var(--vw);
}

.sider-wrapper {
  height: var(--vh);
}
</style>
