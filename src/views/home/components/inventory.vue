<template>
  <div class="c-card no-padding">
    <div class="c-card__title">待办清单</div>
    <div class="c-card-body">
      <div class="tabs">
        <a-tabs v-model="TabData.active" trigger="hover" lazy-load>
          <template
            v-for="item in TabData.list.filter((row: any) => row.isShow)"
            :key="item.key"
          >
            <a-tab-pane :title="item.title">
              <div class="tabs-list">
                <template
                  v-for="node in homeStore.getInventory[TabData.active]"
                >
                  <div class="tabs-list-item" @click="WebData.handlePush(node)">
                    <template v-if="item.key === 'carbon_copy'">
                      <a-space :size="6">
                        <template v-if="node.status_view === 1">
                          <a-badge dot :count="1" />
                        </template>
                        <a-tag
                          :color="node.object_type === 1 ? 'blue' : 'orangered'"
                        >
                          {{ getDict('object_type', node.object_type) }}
                        </a-tag>
                        <b class="title">{{ node.title }}</b>
                      </a-space>
                      <span>{{ node.create_time }}</span>
                    </template>
                    <template v-else>
                      <span>
                        【{{ node.state }}】{{ node.title }}-{{
                          node.isSubmit
                        }}-{{ node.username }}
                      </span>
                      <span>{{ node.create_time }}</span>
                    </template>
                  </div>
                </template>
              </div>
            </a-tab-pane>
          </template>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AppStore, HomeStore } from '@/store'
import { getDict } from '@/utils'

const router = useRouter()

const appStore = AppStore()
const homeStore = HomeStore()

const WebData = reactive({
  handlePush: (row: any) => {
    switch (row.object_type) {
      case 1:
        // 跳转资产包详情
        router.push({
          name: 'PackageInfoDashboard',
          query: { asset_package_id: row.object_id, title: row.object_title },
        })
        break
      case 2:
        // 跳转债权详情
        router.push({
          name: 'DebtInfoDashboard',
          query: { asset_debt_id: row.object_id, title: row.object_title },
        })
        break
      default:
        break
    }
  },
})

const TabData = reactive({
  active: 'carbon_copy' as 'carbon_copy' | 'finished' as 'finished',
  list: [
    {
      key: 'unfinished',
      title: '待办',
      isShow: false,
    },
    {
      key: 'finished',
      title: '已办',
      isShow: false,
    },
    {
      key: 'carbon_copy',
      title: '抄送',
      isShow: true,
    },
  ],
})

onMounted(async () => {
  try {
    await homeStore.apiHomeGetInventoryList()
  } catch (error) {
    appStore.setMessage({ content: error as string, type: 'danger' })
  }
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
    padding: 24px 24px 0;
    color: rgb(var(--gray-10));
    font-size: 14px;
    font-weight: bold;
  }

  &-body {
    position: relative;
    padding: 24px;
  }
}

.tabs {
  position: relative;
  margin-top: -12px;

  &-list {
    position: relative;

    &-item {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 4px 0;
      color: rgb(var(--gray-10));
      cursor: pointer;

      & + & {
        margin-top: 12px;
      }

      .title {
        color: rgb(var(--gray-10));
      }

      &:hover {
        color: rgb(var(--gray-10));
      }
    }
  }
}
</style>
