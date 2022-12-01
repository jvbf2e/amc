<template>
  <a-descriptions
    size="large"
    :label-style="{ padding: 0 }"
    :value-style="{ padding: 0 }"
  >
    <template #title>
      <span>{{ props.title }}</span>
      <div style="float: right">
        <a-button
          type="primary"
          size="mini"
          @click="DrawerData.handleVisible('update')"
        >
          修改
        </a-button>
      </div>
    </template>
  </a-descriptions>
  <a-table
    :columns="TableData.columns"
    :data="TableData.data"
    :pagination="false"
  ></a-table>
  <a-drawer
    :title="DrawerData.title"
    :width="DrawerData.width"
    :visible="DrawerData.visible"
    @ok="DrawerData.handleOk"
    @cancel="DrawerData.handleCancel"
    unmountOnClose
  >
    <template v-if="DrawerData.type === 'create'">
      <CreatePage ref="createPageRef" />
    </template>
    <template v-else-if="DrawerData.type === 'update'">
      <UpdatePage
        ref="updatePageRef"
        :model="WebData.info"
        @submit-success="DrawerData.handleForm"
      />
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { readDebtNode } from '@/api/modules'
import { AppStore } from '@/store'

import CreatePage from './create.vue'
import UpdatePage from './update.vue'

import type { Debt } from '@/api/interface'
import type { CrudType } from './type'

import Config from './config'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  assetDebtId: {
    type: Number,
    default: 0,
  },
})

const createPageRef = ref()
const updatePageRef = ref()

const appStore = AppStore()

const Apis = reactive({
  getInfo: async () => {
    try {
      const { code, data: res, msg } = await readDebtNode(props.assetDebtId)
      if (code === 0) {
        WebData.info = res
        WebData.setData(res)
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  info: {} as Debt.ResReadNodeData,
  setData: (data: any) => {
    TableData.data = [
      { name: '债权资料交接', ...data.data_connect },
      {
        name: '债权转让通知',
        ...data.transfers_notice,
      },
      { name: '申请执行人变更', ...data.executor_change },
      { name: '申请强制/恢复执行', ...data.enforce_resume },
      { name: '处置权移送', ...data.disposal_transfer },
      { name: '排除执行异议', ...data.execute_opposition },
      { name: '排除案外人异议', ...data.outsider_opposition },
      {
        name: '主要财务评估报告',
        ...data.property_report,
      },
      {
        name: '意向客户锁定',
        ...data.customer_lock,
      },
      { name: '发布拍卖公告', ...data.auction_notice },
      { name: '拍卖成交', ...data.auction_success },
      { name: '取得成交裁定/抵债裁定', ...data.ruling_related },
      { name: '拍卖款发还', ...data.auction_return },
      { name: '回本日期', ...data.back_data },
      { name: '盈利日期', ...data.profit_date },
    ]
  },
})

const TableData = reactive({
  ...Config.table,
  data: [] as any[],
})

const DrawerData = reactive({
  title: props.title,
  width: 680,
  visible: false,
  type: 'create',
  handleOk: () => {
    switch (DrawerData.type) {
      case 'create':
        createPageRef.value.handleSubmit()
        break
      case 'update':
        updatePageRef.value.handleSubmit()
        break
      default:
        break
    }
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleVisible: async (type: CrudType, record?: Debt.ResReadDebtorData) => {
    switch (type) {
      case 'create':
        DrawerData.title = `添加${props.title}`
        break
      case 'update':
        DrawerData.title = `编辑${props.title}`
        break
      default:
        break
    }
    DrawerData.type = type
    DrawerData.visible = true
  },
  handleForm: async () => {
    await Apis.getInfo()
    DrawerData.handleCancel()
  },
})

onMounted(() => {
  Apis.getInfo()
})

defineExpose({
  handleVisible: DrawerData.handleVisible,
})
</script>

<style lang="less" scoped></style>
