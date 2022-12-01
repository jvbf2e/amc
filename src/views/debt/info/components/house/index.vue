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
          status="success"
          @click="DrawerData.handleVisible('create')"
          >添加</a-button
        >
      </div>
    </template>
  </a-descriptions>
  <a-table
    row-key="id"
    :columns="TableData.columns"
    :data="TableData.data"
    :pagination="false"
  >
    <template #housing_types="{ record }">
      {{ getDict('housing_types', record.housing_types) }}
    </template>
    <template #enquiry_mode="{ record }">
      {{ getDict('enquiry_mode', record.enquiry_mode) }}
    </template>
    <template #produce_status="{ record }">
      {{ getDict('produce_status', record.produce_status) }}
    </template>
    <template #enquiry_price="{ record }">
      <template v-if="record.enquiry_mode === 2 && record.enquiry_date === 0">
        <a-link href="javascript:;" :hoverable="false">去评估</a-link>
      </template>
      <template v-else>
        {{ record.enquiry_price }}
      </template>
    </template>
    <template #enquiry_date="{ record }">
      {{ record.enquiry_date === 0 ? '--' : record.enquiry_date }}
    </template>
    <template #options="{ record }">
      <a-space :size="12">
        <a-link
          href="javascript:;"
          :hoverable="false"
          @click="ModalData.handleVisible(record.id)"
        >
          产调
        </a-link>
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
    <template v-if="DrawerData.type === 'create'">
      <CreatePage
        ref="createPageRef"
        :assetDebtId="assetDebtId"
        @submit-success="DrawerData.handleForm"
      />
    </template>
    <template v-else-if="DrawerData.type === 'update'">
      <UpdatePage
        ref="updatePageRef"
        :model="WebData.info"
        @submit-success="DrawerData.handleForm"
      />
    </template>
  </a-drawer>
  <a-modal
    :title="ModalData.title"
    :visible="ModalData.visible"
    :width="ModalData.width"
    title-align="start"
    unmount-on-close
    :footer="false"
    @ok="ModalData.handleOk"
    @cancel="ModalData.handleCancel"
  >
    <ProducePage :id="ModalData.id" />
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getDebtHouseInfo, getDebtHouseList } from '@/api/modules'
import { AppStore, DebtStore } from '@/store'
import { getDict } from '@/utils'

import type { Debt } from '@/api/interface'
import type { CrudType } from './type'

import CreatePage from './create.vue'
import UpdatePage from './update.vue'
import ProducePage from './produce.vue'

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
const debtStore = DebtStore()

const Apis = reactive({
  getInfo: async (id: number) => {
    try {
      const { code, data: res, msg } = await getDebtHouseInfo(id)
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
      const { code, data: res, msg } = await getDebtHouseList(props.assetDebtId)
      if (code === 0) {
        TableData.data = res
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  info: {} as Debt.ResReadHouseData,
})

const TableData = reactive({
  ...Config.table,
  data: [] as Debt.ResReadHouseData[],
  handleDelete: async (record: any) => {
    try {
      await debtStore.apiDebtHouseDelete(record.id)
      await Apis.getList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  title: props.title,
  width: 620,
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
  handleVisible: async (type: CrudType, record?: Debt.ResReadHouseData) => {
    switch (type) {
      case 'create':
        DrawerData.title = `添加${props.title}`
        break
      case 'update':
        DrawerData.title = `编辑${props.title}`
        await Apis.getInfo(record?.id as number)
        break
      default:
        break
    }
    DrawerData.type = type
    DrawerData.visible = true
  },
  handleForm: async () => {
    await Apis.getList()
    DrawerData.handleCancel()
  },
})

const ModalData = reactive({
  title: '产调',
  visible: false,
  width: 610,
  id: 0,
  handleOk: () => {},
  handleCancel: () => {
    ModalData.visible = false
  },
  handleVisible: (id: number) => {
    ModalData.id = id
    ModalData.visible = true
  },
})

onMounted(async () => {
  await Apis.getList()
})

defineExpose({
  handleVisible: DrawerData.handleVisible,
})
</script>

<style lang="less" scoped></style>
