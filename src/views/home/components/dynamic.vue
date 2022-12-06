<template>
  <div class="c-card">
    <div class="c-card__title">最新动态</div>
    <div class="c-card__body">
      <a-table
        :columns="TableData.columns"
        :data="homeStore.dynamic"
        :pagination="false"
      >
        <template #project_name="{ record }">
          <a-link
            href="javascript:;"
            :hoverable="false"
            @click="WebData.handlePush(record)"
          >
            {{ record.project_name }}
          </a-link>
        </template>
        <template #project_level="{ record }">
          <a-tag
            :color="
              record.project_level === '低'
                ? 'green'
                : record.project_level === '中'
                ? 'orange'
                : 'magenta'
            "
            >{{ record.project_level }}</a-tag
          >
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppStore, HomeStore } from '@/store'

import Config from './config'

const appStore = AppStore()
const homeStore = HomeStore()

const router = useRouter()

const WebData = reactive({
  handlePush: (row: any) => {
    router.push({
      name: 'PackageInfoDashboard',
      query: {
        asset_package_id: row.asset_package_id,
        title: row.project_name,
      },
    })
  },
})

const TableData = reactive({
  ...Config.dynamic.table,
})

onMounted(() => {
  setTimeout(async () => {
    try {
      await homeStore.apiHomeDynamicList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  }, 500)
})
</script>

<style lang="less" scoped>
.c-card {
  position: relative;
  width: 100%;
  background-color: var(--color-bg-1);
  border-radius: 4px;
  overflow: hidden;

  & + & {
    margin-top: 20px;
  }

  &__title {
    position: relative;
    padding: 24px;
    color: rgb(var(--gray-10));
    font-size: 14px;
    font-weight: bold;
  }

  &__body {
    position: relative;
    padding: 0;
  }

  &.no-padding &-body {
    padding: 0;
  }
}
</style>
