<template>
  <LayoutPage>
    <a-space :size="12" direction="vertical" fill>
      <div align="right">
        <a-button
          type="primary"
          status="success"
          size="mini"
          @click="DrawerData.handleVisible('create')"
        >
          新增
        </a-button>
      </div>
      <a-table
        :columns="TableData.columns"
        :data="debtStore.log.table.data"
        :pagination="false"
        :scroll="{ x: 600 }"
      >
        <template #file="{ record }">
          <a-space :size="6" direction="vertical" fill>
            <template v-for="item in record.file">
              <a-link
                href="javascript:;"
                :hoverable="false"
                @click="TableData.handleDownload(item)"
              >
                {{ item.name }}
              </a-link>
            </template>
          </a-space>
        </template>
        <template #options="{ record }">
          <a-space :size="12">
            <a-link
              href="javascript:;"
              :hoverable="false"
              @click="DrawerData.handleVisible('update', record)"
            >
              编辑
            </a-link>
            <a-popconfirm
              position="tr"
              type="warning"
              content="确定删除，当前数据吗？"
              @ok="TableData.handleDelete(record)"
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
      :width="DrawerData.width"
      :visible="DrawerData.visible"
      @ok="DrawerData.handleOk"
      @cancel="DrawerData.handleCancel"
      unmountOnClose
    >
      <template v-if="DrawerData.type === 'create'">
        <CreatePage
          ref="createPageRef"
          :debt-id="parseInt(params.asset_debt_id as string)"
          @submit-success="DrawerData.handleForm"
        />
      </template>
      <template v-else-if="DrawerData.type === 'update'">
        <UpdatePage
          ref="updatePageRef"
          :debt-id="parseInt(params.asset_debt_id as string)"
          :model="WebData.info"
          @submit-success="DrawerData.handleForm"
        />
      </template>
    </a-drawer>
  </LayoutPage>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/dialog'

import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AppStore, DebtStore } from '@/store'

import LayoutPage from '../components/layout.vue'
import CreatePage from './create.vue'
import UpdatePage from './update.vue'

import config from './config'

import type { Debt } from '@/api/interface'
import type { CrudType } from './type'
import { readDebtLog } from '@/api/modules'
import { FILE_URL } from '@/config/config'

const appStore = AppStore()
const debtStore = DebtStore()

const { params } = useRoute()

const createPageRef = ref()
const updatePageRef = ref()

const Apis = reactive({
  getInfo: async (params: Debt.ReqReadLogParams) => {
    try {
      const { code, data: res, msg } = await readDebtLog(params)
      if (code === 0) {
        WebData.info = res
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  info: {} as Debt.ResReadLogData,
})

const TableData = reactive({
  ...config.table,
  handleDelete: async (row: any) => {
    try {
      await debtStore.apiDebtLogDelete({
        asset_debt_id: row.asset_debt_id,
        follow_ids: [row.follow_id],
      })
      await debtStore.apiDebtLogGetList(
        parseInt(params.asset_debt_id as string)
      )
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handleDownload: async (row: any) => {
    try {
      const dir = await open({ directory: true })
      if (!dir) {
        return
      }
      await invoke('download_video', {
        url: `${FILE_URL}/${row.file}`,
        writePath: dir,
        fileName: row.name,
        id: row.name,
      })
      appStore.setMessage({ content: '下载成功', type: 'success' })
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  title: '跟进记录',
  width: 640,
  visible: false,
  type: 'create' as CrudType,
  handleVisible: async (type: CrudType, record?: any) => {
    DrawerData.type = type
    switch (type) {
      case 'create':
        DrawerData.title = '添加跟进记录'
        break
      case 'read':
        DrawerData.title = '跟进记录详情'
        // await Apis.getInfo({
        //   asset_package_id: record.asset_package_id,
        //   log_id: record.log_id,
        // })
        break
      case 'update':
        DrawerData.title = '编辑跟进记录'
        await Apis.getInfo({
          asset_debt_id: record.asset_debt_id,
          follow_id: record.follow_id,
        })
        break
      default:
        break
    }
    DrawerData.visible = true
  },
  handleOk: async () => {
    switch (DrawerData.type) {
      case 'create':
        await createPageRef.value.handleSubmit()
        break
      case 'update':
        await updatePageRef.value.handleSubmit()
        break
    }
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleForm: async () => {
    await debtStore.apiDebtLogGetList(parseInt(params.asset_debt_id as string))
    DrawerData.handleCancel()
  },
})

onMounted(async () => {
  await debtStore.apiDebtLogGetList(parseInt(params.asset_debt_id as string))
})
</script>

<style lang="less" scoped>
.debt-log {
  position: relative;
  padding: 24px;
}
</style>
