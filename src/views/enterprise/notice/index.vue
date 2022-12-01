<template>
  <div class="notice">
    <a-space :size="24" direction="vertical" fill>
      <div align="right">
        <a-button
          type="primary"
          status="success"
          size="mini"
          @click="DrawerData.handleVisible('create')"
        >
          发布公告
        </a-button>
      </div>
      <a-table
        :columns="TableData.columns"
        :data="enterpriseStore.notice.table.data"
        :pagination="enterpriseStore.getNoticePagination"
        :scroll="{ x: 600 }"
        @page-change="TableData.handlePage"
      >
        <template #operates="{ record }">
          <a-space :size="12">
            <a-link
              href="javascript:;"
              :hoverable="false"
              @click="DrawerData.handleVisible('read', record)"
            >
              查看
            </a-link>
            <a-popconfirm
              type="warning"
              content="确定删除，当前数据吗？"
              @ok="TableData.handleDelete(record.id)"
            >
              <a-link href="javascript:;" status="danger" :hoverable="false">
                删除
              </a-link>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-space>
    <a-drawer
      :title="DrawerData.title"
      :width="620"
      :visible="DrawerData.visible"
      @ok="DrawerData.handleOk"
      @cancel="DrawerData.handleCancel"
      unmountOnClose
    >
      <template v-if="DrawerData.type === 'create'">
        <CreatePage
          ref="createPageRef"
          @submit-success="DrawerData.handleForm"
        />
      </template>
      <template v-else-if="DrawerData.type === 'read'">
        <ReadPage ref="readPageRef" :id="WebData.id" />
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { AppStore, EnterpriseStore } from '@/store'

import CreatePage from './create.vue'
import ReadPage from './read.vue'

import type { Enterprise } from '@/api/interface'
import type { CrudType } from './type'

import Config from './config'

const createPageRef = ref()
const readPageRef = ref()

const appStore = AppStore()
const enterpriseStore = EnterpriseStore()

const Apis = reactive({
  getList: async (page?: number) => {
    try {
      const params = {} as Enterprise.ReqGetEnterpriseNoticeListParams
      page && Object.assign(params, { page })
      await enterpriseStore.apiEnterpriseNoticeGetList(params)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  id: 0,
})

const TableData = reactive({
  ...Config.table,
  handleDelete: async (id: number) => {
    try {
      await enterpriseStore.apiEnterpriseNoticeDelete(id)
      await Apis.getList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handlePage: async (page: number) => {
    try {
      await enterpriseStore.setPagination({ current: page }, 'notice')
      await Apis.getList(page)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  visible: false,
  title: '发布公告',
  type: 'create' as CrudType,
  handleOk: async () => {
    await createPageRef.value.handleSubmit()
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleVisible: async (type: CrudType, row?: any) => {
    DrawerData.type = type
    switch (type) {
      case 'create':
        DrawerData.title = '发表公告'
        break
      case 'read':
        DrawerData.title = '公告详情'
        WebData.id = row.id
        break
      default:
        break
    }
    DrawerData.visible = true
  },
  handleForm: async () => {
    try {
      await enterpriseStore.apiEnterpriseNoticeGetList()
      DrawerData.handleCancel()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

onMounted(async () => {
  await enterpriseStore.setPagination({ current: 1 }, 'notice')
  await Apis.getList(1)
})
</script>

<style lang="less" scoped>
.notice {
  padding: 24px;
}
</style>
