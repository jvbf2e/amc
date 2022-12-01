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
        :data="packageStore.getLogList"
        :pagination="false"
      >
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
          :package-id="parseInt(params.asset_package_id as string)"
          :package-name="(params.title as string)"
          @submit-success="DrawerData.handleForm"
        />
      </template>
      <template v-else-if="DrawerData.type === 'update'">
        <UpdatePage
          ref="updatePageRef"
          :package-id="parseInt(params.asset_package_id as string)"
          :package-name="(params.title as string)"
          :model="WebData.info"
          @submit-success="DrawerData.handleForm"
        />
      </template>
    </a-drawer>
  </LayoutPage>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Package } from '@/api/interface'
import { readPackageLog } from '@/api/modules'
import { AppStore, PackageStore } from '@/store'

import type { CrudType } from './type'

import LayoutPage from '../components/layout.vue'
import CreatePage from './components/create.vue'
import UpdatePage from './components/update.vue'

import Config from './config'

const { params } = useRoute()

const createPageRef = ref()
const updatePageRef = ref()

const appStore = AppStore()
const packageStore = PackageStore()

const Apis = reactive({
  getInfo: async (params: Package.ReqLogReadParams) => {
    try {
      const { code, data: res, msg } = await readPackageLog(params)
      if (code === 0) {
        WebData.info = res
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  getList: async (asset_package_id: number) => {
    try {
      await packageStore.apiPackageLogGetList({ asset_package_id })
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  info: {} as Package.ResReadLogData,
})

const TableData = reactive({
  ...Config.table,
  data: [] as Package.ResReadLogData[],
  handlePage: async (page: number) => {
    try {
      // userStore.setTableCurrent(page)
      // await userStore.apiUserGetList(page)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handleDelete: async (row: any) => {
    try {
      await packageStore.apiPackageLogDelete({
        asset_package_id: row.asset_package_id,
        log_ids: [row.log_id],
      })
      await Apis.getList(parseInt(params.asset_package_id as string))
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  title: '工作日志',
  width: 640,
  visible: false,
  type: 'create' as CrudType,
  handleVisible: async (type: CrudType, record?: any) => {
    DrawerData.type = type
    switch (type) {
      case 'create':
        DrawerData.title = '添加工作日志'
        break
      case 'read':
        DrawerData.title = '工作日志详情'
        await Apis.getInfo({
          asset_package_id: record.asset_package_id,
          log_id: record.log_id,
        })
        break
      case 'update':
        DrawerData.title = '编辑工作日志'
        await Apis.getInfo({
          asset_package_id: record.asset_package_id,
          log_id: record.log_id,
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
    await packageStore.apiPackageLogGetList({
      asset_package_id: parseInt(params.asset_package_id as string),
    })
    DrawerData.handleCancel()
  },
})

onMounted(async () => {
  await Apis.getList(parseInt(params.asset_package_id as string))
})
</script>

<style lang="less" scoped>
.package-log {
  position: relative;
  padding: 24px;
}
</style>
