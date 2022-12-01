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
import { readDebtDebtor } from '@/api/modules'
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
      const { code, data: res, msg } = await readDebtDebtor(props.assetDebtId)
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
  info: {} as Debt.ResReadDebtorData,
  setData: (data: any) => {
    // if (data) {
    TableData.data = [
      { name: '姓名/名称', ...data.debtor_name },
      {
        name: '身份证/统一社会信用代码',
        ...data.id_number,
      },
      { name: '注册地址', ...data.register_address },
      { name: '实际地址', ...data.actual_address },
      { name: '联系方式', ...data.contact_way },
      { name: '偿债意愿', ...data.repayment_willing },
      { name: '对外债务规模', ...data.external_claim },
      {
        name: '诉讼、执行案件数量',
        ...data.lawsuits_count,
      },
      {
        name: '破产重整/清算可能性评估',
        ...data.possibility_assess,
      },
      { name: '偿债能力评估', ...data.solvency_assess },
      { name: '备注', ...data.desc },
    ]
    // }
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
  handleRefresh: Apis.getInfo,
})
</script>

<style lang="less" scoped></style>
