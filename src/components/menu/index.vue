<template>
  <div class="l-menu">
    <template v-for="item in MenuData.menus" :key="item.key">
      <div
        class="l-menu-item no_drag"
        :class="{ active: item.key === MenuData.active }"
        @click="MenuData.router(item.key)"
      >
        <IconFont :type="item.icon" :size="24" />
        <span class="name">{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppStore } from '@/store'

const route = useRoute()
const router = useRouter()
const appStore = AppStore()

const MenuData = reactive({
  active: 'Home',
  menus: appStore.menus['Layout'],
  router: (path: string) => {
    MenuData.active = path
    let query = {}
    path === 'Library' && (query = { group_id: 0 })
    router.push({ name: path, query })
  },
})
</script>

<style lang="less" scoped>
.l-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  font-size: 12px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -webkit-box-align: center;

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    width: 56px;
    height: 56px;
    color: #c3c7d0;
    font-size: 10px;
    border-radius: 8px;
    transition: all 0.1s cubic-bezier(0, 0, 1, 1);
    cursor: pointer;

    & + & {
      margin-top: 4px;
    }

    .arco-icon {
      color: rgb(195, 200, 210);
      transition: all 0.1s cubic-bezier(0, 0, 1, 1);
    }

    .name {
      display: inline-block;
      margin: 4px 0;
      color: rgb(195, 200, 210);
      transition: all 0.1s cubic-bezier(0, 0, 1, 1);
    }

    &:hover,
    &.active {
      .arco-icon {
        color: rgb(51, 112, 255);
      }

      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
