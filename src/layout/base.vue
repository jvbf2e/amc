<template>
  <div :class="['layout-bg', globalStore.getThemeColor]" />
  <div class="layout-sider">
    <Header
      class="header-wrapper"
      :title="appStore.info.ent_name"
      :show-max="true"
    />
    <Menu class="sider-wrapper" />
  </div>
  <div class="layout-body">
    <Aside
      :class="['layout-body__aside', { show: AsideData.data }]"
      :name="AsideData.title"
      :data="AsideData.data"
    />
    <a-scrollbar
      outer-class="layout-body__content"
      style="height: 100%; overflow-x: hidden; overflow-y: auto"
    >
      <RouterView v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive :include="cacheRouter">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </RouterView>
    </a-scrollbar>
  </div>
  <div class="layout-mask">
    <Message />
    <Loading />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { AppStore, GlobalStore } from '@/store'

import cacheRouter from '@/router/cacheRouter'
import Header from '@/components/header/index.vue'
import Menu from '@/components/menu/index.vue'
import Message from '@/components/message/index.vue'
import Loading from '@/components/loading/index.vue'
import Aside from '@/components/aside/index.vue'

const route = useRoute()

const appStore = AppStore()
const globalStore = GlobalStore()

const AsideData = reactive({
  title: '',
  data: undefined as
    | { key: string; name: string; icon: string | null }[]
    | undefined,
})

watchEffect(() => {
  AsideData.title = route.matched[0].meta.title as string
  const key = route.matched[0].name as string
  if (Object.keys(appStore.menus).includes(key)) {
    AsideData.data = appStore.menus[key]
  } else {
    AsideData.data = undefined
  }
})

onMounted(() => {
  setTimeout(() => {
    appStore.messages.forEach((item: any) => {
      appStore.deleteMessage(item.id)
    })
  }, 5000)
})
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
    z-index: 9;

    &.darkblue {
      background: linear-gradient(
        to top left,
        rgb(42, 53, 81) 50%,
        rgb(56, 73, 105)
      );
    }

    &.blue {
      background: linear-gradient(
        to top left,
        rgb(74, 118, 223) 50%,
        rgb(64, 122, 226)
      );
    }

    &.gray {
      background: linear-gradient(
        to top left,
        rgb(235, 236, 243) 50%,
        rgb(241, 239, 241)
      );
    }
  }

  &-sider {
    z-index: 29;
  }

  &-body {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    width: calc(var(--vw) - 64px);
    height: calc(var(--vh) - 44px);
    background-color: var(--color-bg-1);
    border-radius: 12px 0 0 0;
    overflow: hidden;
    transform: translate(64px, 44px);
    box-sizing: border-box;
    z-index: 49;

    &__aside {
      width: 0;
      opacity: 0;
      transition: width 0.3s cubic-bezier(0.34, 0.69, 0.1, 1),
        opacity 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);

      &.show {
        width: 160px;
        opacity: 1;
      }
    }

    &__content {
      flex: 1;
      width: 0;
    }
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
