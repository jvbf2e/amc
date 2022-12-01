<template>
  <div class="debt no_drag">
    <div class="debt-search no_drag">
      <a-input-search
        v-model="WebData.search"
        placeholder="搜索"
        search-button
        style="width: 45%"
      >
      </a-input-search>
    </div>
    <a-table
      row-key="asset_debt_id"
      class="debt-table no-drag"
      :columns="TableData.columns"
      :data="debtStore.table.data"
      :column-resizable="true"
    >
      <template #debt_no="{ record }">
        <a-link href="javascript:;" @click="TableData.handleRead(record)">
          {{ record.debt_no }}
        </a-link>
      </template>
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
            @click.stop="DrawerData.handleVisible(record)"
          >
            编辑
          </a-link>
          <a-popconfirm
            position="tr"
            type="warning"
            content="确定删除，当前数据吗？"
            @ok="TableData.handleDelete(record)"
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
        :model="WebData.info"
        @submit-success="DrawerData.handleForm"
      />
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { readDebt } from '@/api/modules'
import { AppStore, DebtStore } from '@/store'

import UpdatePage from './components/update.vue'

import type { Debt } from '@/api/interface'

import Config from './config'

const router = useRouter()

const appStore = AppStore()
const debtStore = DebtStore()

const updatePageRef = ref()

const Apis = reactive({
  getInfo: async (id: number) => {
    try {
      const { code, data: res, msg } = await readDebt(id)
      if (code === 0) {
        WebData.info = res
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  getList: async () => {
    try {
      await debtStore.apiDebtGetList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  search: '',
  info: {} as Debt.ResReadData,
})

const TableData = reactive({
  ...Config.table,
  handlePush: (id: number, title: string) => {
    router.push({
      name: 'PackageInfoDashboard',
      params: { asset_package_id: id, title },
    })
  },
  handleDelete: async (row: Debt.ResListItemData) => {
    try {
      await debtStore.apiDebtDelete(row.asset_debt_id)
      await Apis.getList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handleRead: (row: any) => {
    router.push({
      name: 'DebtInfoDashboard',
      params: { asset_debt_id: row.asset_debt_id, title: row.debt_no },
    })
  },
})

const DrawerData = reactive({
  title: '编辑资产包',
  width: 820,
  visible: false,
  handleVisible: async (record: Debt.ReqUpdateParams) => {
    await Apis.getInfo(record.asset_debt_id)
    DrawerData.visible = true
  },
  handleOk: async () => {
    await updatePageRef.value.handleSubmit()
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
.debt {
  position: relative;
  padding: 24px;

  &-search {
    position: relative;
    background-color: #fff;
  }

  &-table {
    position: relative;
    margin-top: 24px;
    background-color: #fff;

    :deep(&.el-table th.el-table__cell) {
      background-color: #fafafa;
    }
  }
}
</style>
