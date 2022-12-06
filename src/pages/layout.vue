<template>
  <div class="layout drag">
    <Header class="layout-header" title="圈讯AMC平台" :show-max="true">
      <template #navbar>
        <div class="navbar">
          <div class="navbar-item no_drag">不良交易平台</div>
          <div class="navbar-item no_drag">蓝象SaaS</div>
        </div>
      </template>
    </Header>
    <div class="layout-body">
      <Menu class="layout-menu" />
      <div class="layout-main">
        <RouterView v-slot="{ Component, route }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive :include="cacheRouter">
              <component :is="Component" :key="route.path"></component>
            </keep-alive>
          </transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue'
import Menu from '@/components/menu/index.vue'
import cacheRouter from '@/router/cacheRouter'
</script>

<style lang="less">
// $color_primary = #262f3e;
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: var(--vw);
  height: var(--vh);
  border-radius: 6px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

  &-header {
    height: 50px;
    background-color: var(--color-bg-1);
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    z-index: 999;
  }

  &-body {
    flex: 1;
    display: flex;
    flex-direction: row;
    min-height: 0;
    background-color: #f3f3f3;
  }

  &-main {
    flex: 1;
    position: relative;
    min-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.navbar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 36px;

  &-item {
    position: relative;
    color: #666;
    font-size: 14px;
    cursor: pointer;

    & + & {
      margin-left: 16px;
    }

    &:hover {
      color: #999;
    }

    &.active {
      color: rgb(61, 125, 245);
      font-weight: bold;
    }
  }
}
</style>
