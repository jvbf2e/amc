<template>
  <div class="package">
    <div class="package-search no_drag">
      <a-input-search
        v-model="PackageData.search"
        placeholder="搜索"
        search-button
        style="width: 45%"
        @search="SearchData.handleSearch"
      >
      </a-input-search>
    </div>
    <a-table
      row-key="asset_package_id"
      class="package-table"
      :columns="TableData.columns"
      :scroll="TableData.scroll"
      :data="packageStore.table.data"
      :pagination="packageStore.getPagination"
      @page-change="TableData.handlePage"
    >
      <template #project_name="{ record }">
        <a-link
          href="javascript:;"
          @click="
            TableData.handlePush(record.asset_package_id, record.project_name)
          "
        >
          {{ record.project_name }}
        </a-link>
      </template>
      <template #options="{ record }">
        <a-space :size="12">
          <a-link
            href="javascript:;"
            :hoverable="false"
            @click="DrawerData.handleVisible(record)"
          >
            编辑
          </a-link>
          <a-popconfirm
            position="tr"
            type="warning"
            content="确定删除，当前数据吗？"
            @ok="TableData.handleDelete(record.asset_package_id)"
          >
            <a-link href="javascript:;" :hoverable="false" status="danger">
              删除
            </a-link>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
    <a-drawer
      :title="DrawerData.title"
      :width="DrawerData.width"
      :visible="DrawerData.visible"
      @ok="DrawerData.handleOk"
      @cancel="DrawerData.handleCancel"
      unmountOnClose
    >
      <UpdatePage
        ref="updatePageRef"
        :model="PackageData.packageInfo"
        @submit-success="DrawerData.handleForm"
      />
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { readPackage } from '@/api/modules'
import { AppStore, PackageStore } from '@/store'

import UpdatePage from './components/update.vue'

import type { Package } from '@/api/interface'
import type { TableDataTypes } from './types'

import Config from './config'

const router = useRouter()

const appStore = AppStore()
const packageStore = PackageStore()

const updatePageRef = ref()

const Apis = reactive({
  getInfo: async (id: number) => {
    try {
      const { code, data: res, msg } = await readPackage(id)
      if (code === 0) {
        PackageData.packageInfo = res.assert_package
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  getList: async (params?: Package.ReqGetListParams) => {
    try {
      await packageStore.apiPackageGetList(params)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const PackageData = reactive({
  packageInfo: {} as Package.ReqUpdateParams,
  search: '',
  select: '',
  table: {
    data: [] as TableDataTypes[],
  },
})

const SearchData = reactive({
  handleSearch: async (value: string, ev: MouseEvent) => {
    await Apis.getList({ keywords: value })
  },
})

const TableData = reactive({
  ...Config.table,
  handlePage: async (current: number) => {
    packageStore.setPagination({ current })
    await Apis.getList({ page: current })
  },
  handlePush: (id: number, title: string) => {
    router.push({
      name: 'PackageInfoDashboard',
      query: { asset_package_id: id, title },
    })
  },
  handleDelete: async (id: number) => {
    try {
      await packageStore.apiPackageDelete(id)
      await Apis.getList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  title: '编辑资产包',
  width: 820,
  visible: false,
  handleVisible: async (record: Package.ReqUpdateParams) => {
    await Apis.getInfo(record.asset_package_id)
    DrawerData.visible = true
  },
  handleOk: async () => {
    updatePageRef.value.handleSubmit()
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleForm: async () => {
    await Apis.getList()
    DrawerData.handleCancel()
  },
})

onMounted(async () => {
  await Apis.getList()
})
</script>

<style lang="less" scoped>
.package {
  position: relative;
  padding: 24px;

  &-search {
    position: relative;
    background-color: var(--color-bg-1);
  }

  &-table {
    position: relative;
    margin-top: 24px;
    background-color: var(--color-bg-1);

    :deep(&.el-table th.el-table__cell) {
      background-color: #fafafa;
    }
  }
}
</style>
