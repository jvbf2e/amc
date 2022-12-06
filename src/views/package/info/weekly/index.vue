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
        :data="packageStore.getWeeklyList"
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
          :package-id="parseInt(query.asset_package_id as string)"
          :package-name="(query.title as string)"
          @submit-success="DrawerData.handleForm"
        />
      </template>
      <template v-else-if="DrawerData.type === 'update'">
        <UpdatePage
          ref="updatePageRef"
          :package-id="parseInt(query.asset_package_id as string)"
          :package-name="(query.title as string)"
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
import { AppStore, PackageStore } from '@/store'

import type { CrudType } from './type'

import LayoutPage from '../components/layout.vue'
import CreatePage from './components/create.vue'
import UpdatePage from './components/update.vue'

import Config from './config'
import { readPackageWeekly } from '@/api/modules'
import { Package } from '@/api/interface'

const { query } = useRoute()

const appStore = AppStore()
const packageStore = PackageStore()

const createPageRef = ref()
const updatePageRef = ref()

const Apis = reactive({
  getWeeklyInfo: async (params: Package.ReqWeeklyReadParams) => {
    try {
      const { code, data: res, msg } = await readPackageWeekly(params)
      if (code === 0) {
        WebData.info = res
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  info: {} as Package.ResReadWeekly,
})

const TableData = reactive({
  ...Config.table,
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
      await packageStore.apiPackageWeeklyDelete({
        asset_package_id: row.asset_package_id,
        weekly_ids: [row.weekly_id],
      })
      await packageStore.apiPackageWeeklyGetList({
        asset_package_id: parseInt(query.asset_package_id as string),
      })
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  title: '处置周报',
  width: 640,
  visible: false,
  type: 'create' as CrudType,
  handleVisible: async (type: CrudType, record?: any) => {
    DrawerData.type = type
    switch (type) {
      case 'create':
        DrawerData.title = '添加处置周报'
        break
      case 'read':
        DrawerData.title = '处置周报详情'
        await Apis.getWeeklyInfo({
          asset_package_id: record.asset_package_id,
          weekly_id: record.weekly_id,
        })
        break
      case 'update':
        DrawerData.title = '编辑处置周报'
        await Apis.getWeeklyInfo({
          asset_package_id: record.asset_package_id,
          weekly_id: record.weekly_id,
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
    try {
      await packageStore.apiPackageWeeklyGetList({
        asset_package_id: parseInt(query.asset_package_id as string),
      })
      DrawerData.handleCancel()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

onMounted(async () => {
  try {
    await packageStore.apiPackageWeeklyGetList({
      asset_package_id: parseInt(query.asset_package_id as string),
    })
  } catch (error) {
    appStore.setMessage({ content: error as string, type: 'danger' })
  }
})
</script>

<style lang="less" scoped>
.package-weekly {
  position: relative;
  padding: 24px;
}
</style>
