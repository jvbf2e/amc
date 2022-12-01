<template>
  <div class="menu-layout">
    <Aside class="menu-layout__aside" :name="Data.name" :data="Data.menus" />
    <a-scrollbar
      outer-class="menu-layout__body"
      style="height: 100%; overflow-x: hidden; overflow-y: auto"
    >
      <router-view />
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AppStore } from '@/store'

import Aside, { MenuItemType } from '@/components/aside/index.vue'

const route = useRoute()
const appStore = AppStore()

const Data = reactive({
  name: '',
  menus: [] as MenuItemType[],
})

watch(
  () => route,
  (route) => {
    const { matched } = route
    const proRoute = matched[1]
    const menus = appStore.menus[proRoute.name as string]
    Data.name = proRoute.meta.title as string
    Data.menus = menus ?? []
  },
  { immediate: true, deep: true }
)
</script>

<style lang="less" scoped>
.menu-layout {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  &__aside {
    width: 160px;
  }

  &__body {
    width: 0;
    flex: 1;
  }
}
</style>
