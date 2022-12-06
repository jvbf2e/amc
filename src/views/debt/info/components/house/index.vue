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
      <a-link
        href="javascript:;"
        :hoverable="false"
        @click="ModalData.handleVisible(record, 'house')"
      >
        {{ record.enquiry_price === 0 ? '去评估' : record.enquiry_price }}
      </a-link>
    </template>
    <template #enquiry_date="{ record }">
      {{
        record.enquiry_date === 0
          ? '--'
          : moment(record.enquiry_date * 1000).format('YYYY-MM-DD')
      }}
    </template>
    <template #options="{ record }">
      <a-space :size="12">
        <a-link
          href="javascript:;"
          :hoverable="false"
          @click="ModalData.handleVisible(record, 'produce')"
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
    :footer="false"
    @ok="ModalData.handleOk"
    @cancel="ModalData.handleCancel"
    unmount-on-close
  >
    <template v-if="ModalData.type === 'produce'">
      <ProducePage :id="ModalData.house.id" />
    </template>
    <template v-else-if="ModalData.type === 'house'">
      <HousePage
        ref="housePageRef"
        :id="ModalData.house.id"
        :debt-id="ModalData.house.asset_debt_id"
        @handle-submit="Apis.getList"
      />
    </template>
    <template v-else>
      <a-empty />
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import moment from 'moment'
import { getDebtHouseInfo, getDebtHouseList } from '@/api/modules'
import { AppStore, DebtStore } from '@/store'
import { getDict } from '@/utils'

import type { Debt } from '@/api/interface'
import type { CrudType } from './type'

import CreatePage from './create.vue'
import HousePage from '@/views/data/house/index.vue'
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
const housePageRef = ref()

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
  getDataHouse: async () => {
    try {
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
  width: 680,
  house: {
    id: 0,
    asset_debt_id: 0,
  },
  type: 'produce' as 'produce' | 'house',
  handleOk: () => {},
  handleCancel: () => {
    housePageRef.value.handleReset()
    ModalData.visible = false
  },
  handleVisible: (row: any, type: 'produce' | 'house') => {
    switch (type) {
      case 'produce':
        ModalData.title = '产调详情'
        ModalData.house.id = row.id
        break
      case 'house':
        ModalData.title = '房产评估'
        ModalData.house.id = row.id
        ModalData.house.asset_debt_id = row.asset_debt_id
      default:
        break
    }
    ModalData.type = type
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
