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
    <template #nature_of_use="{ record }">
      {{ getDict('nature_of_use', record.nature_of_use) }}
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
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getDebtCarInfo, getDebtCarList } from '@/api/modules'
import { AppStore, DebtStore } from '@/store'
import { getDict } from '@/utils'

import type { Debt } from '@/api/interface'
import type { CrudType } from './type'

import CreatePage from './create.vue'
import UpdatePage from './update.vue'

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
      const { code, data: res, msg } = await getDebtCarInfo(id)
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
      const { code, data: res, msg } = await getDebtCarList(props.assetDebtId)
      if (code === 0) {
        TableData.data = res
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  info: {} as Debt.ResReadCarData,
})

const TableData = reactive({
  ...Config.table,
  data: [] as Debt.ResReadCarData[],
  handleDelete: async (record: any) => {
    try {
      await debtStore.apiDebtCarDelete(record.id)
      await Apis.getList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  title: props.title,
  width: 480,
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
  handleVisible: async (type: CrudType, record?: Debt.ResReadCarData) => {
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

onMounted(async () => {
  await Apis.getList()
})

defineExpose({
  handleVisible: DrawerData.handleVisible,
})
</script>

<style lang="less" scoped></style>
