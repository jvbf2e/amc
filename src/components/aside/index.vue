<template>
  <div class="l-aside">
    <div class="l-aside-title">{{ props.name }}</div>
    <div class="l-aside-menu">
      <template v-for="item in props.data" :key="item">
        <div
          class="l-aside-menu__item"
          :class="{ active: (activeComp as string).indexOf(item.key) > -1 }"
          @click="Data.router(item.key)"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export type MenuItemType = {
  key: string
  name: string
  icon: string | null
}

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  data: {
    type: Array as PropType<MenuItemType[] | undefined>,
  },
})

const route = useRoute()
const router = useRouter()

const Data = reactive({
  active: '',
  router: (path: string) => {
    const { params } = route
    Data.active = path
    router.push({ name: path, params })
  },
})

const activeComp = computed(() => route.name)
</script>

<style lang="less" scoped>
.l-aside {
  position: relative;
  padding: 12px 0;
  background-color: var(--color-neutral-2);

  &-title {
    position: relative;
    padding: 16px;
    color: var(--color-text-1);
    font-size: 16px;
  }

  &-menu {
    &__item {
      display: flex;
      flex-direction: row;
      margin: 4px 0;
      padding: 12px 24px;
      color: var(--color-text-3);
      cursor: pointer;

      &:hover {
        color: rgb(var(--primary-6));
        background-color: var(--color-fill-1);
      }

      &.active {
        color: rgb(var(--primary-6));
      }
    }
  }
}
</style>
