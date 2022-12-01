<template>
  <a-descriptions
    size="large"
    :label-style="{ padding: 0 }"
    :value-style="{ padding: 0 }"
  >
    <template #title>
      <span>{{ props.title }}</span>
      <div style="float: right">
        <a-space :size="6">
          <a-button
            type="primary"
            size="mini"
            status="success"
            @click="DrawerData.handleVisible('create')"
          >
            录入
          </a-button>
          <template v-if="debtStore.info.debt_type === 1">
            <a-popconfirm
              position="tr"
              type="warning"
              content="您确认要查询涉诉详情吗？（收费项目）"
              @ok="WebData.handleFast"
            >
              <a-button type="primary" size="mini"> 一键获取 </a-button>
            </a-popconfirm>
          </template>
        </a-space>
      </div>
    </template>
  </a-descriptions>
  <a-table
    :columns="TableData.columns"
    :data="TableData.data"
    :pagination="false"
  >
    <template #update_date="{ record }">
      {{ moment(record.update_date * 1000).format('YYYY-MM-DD') }}
    </template>
    <template #expense_type="{ record }">
      {{ getDict('expense_type', record.expense_type) }}
    </template>
    <template #match_ratio="{ record }">
      {{ record.match_ratio }}
      <template v-if="record.create_mode === 1">
        <a-tooltip content="数据未认证" position="right">
          <IconExclamationCircleFill
            :size="18"
            style="color: var(--color-neutral-4)"
          />
        </a-tooltip>
      </template>
      <template v-else>
        <a-tooltip content="数据已认证" position="right">
          <IconCheckCircleFill
            :size="18"
            style="color: var(--color-success-light-4)"
          />
        </a-tooltip>
      </template>
    </template>
    <template #options="{ record }">
      <a-space :size="12">
        <template v-if="record.create_mode === 1">
          <a-link
            href="javascript:;"
            :hoverable="false"
            @click="DrawerData.handleVisible('update', record)"
          >
            编辑
          </a-link>
        </template>
        <template v-else>
          <a-link
            href="javascript:;"
            :hoverable="false"
            @click="ModalData.handleVisible(record)"
          >
            查看
          </a-link>
        </template>
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
    v-model:visible="ModalData.visible"
    :width="ModalData.width"
    title-align="start"
    :footer="false"
    unmountOnClose
  >
    <template #title>{{ ModalData.title }}</template>
    <template v-if="ModalData.status === 1">
      <DocumentPage :type="ModalData.type" :model="ModalData.model" />
    </template>
    <template v-else>
      <a-empty />
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import moment from 'moment'
import {
  getDebtLawsuitsList,
  readDataLitigation,
  readDebtLawsuits,
} from '@/api/modules'
import { AppStore, DebtStore } from '@/store'
import { getDict } from '@/utils'

import type { Debt } from '@/api/interface'
import type { CrudType } from './type'
import type { Type } from './components/form/type'

import {
  IconCheckCircleFill,
  IconExclamationCircleFill,
} from '@arco-design/web-vue/es/icon'
import CreatePage from './create.vue'
import UpdatePage from './update.vue'
import DocumentPage from './components/form/index.vue'

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
      const { code, data: res, msg } = await readDebtLawsuits(id)
      if (code === 0) {
        WebData.info = res
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  getApiInfo: async (row: any) => {
    try {
      const {
        code,
        data: res,
        msg,
      } = await readDataLitigation({
        asset_debt_id: props.assetDebtId,
        query_log_id: row.query_log_id,
        lawsuit_id: row.entry_id,
        data_type: row.data_type,
      })
      if (code === 0) {
        ModalData.status = res.status
        ModalData.model = res.data[`${row.data_type}`][0]
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  getList: async () => {
    try {
      const {
        code,
        data: res,
        msg,
      } = await getDebtLawsuitsList(props.assetDebtId)
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
  info: {} as Debt.ResReadLawsuitsData,
  handleFast: async () => {
    try {
      await debtStore.apiDebtLawsuitsFast(props.assetDebtId)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const TableData = reactive({
  ...Config.table,
  data: [] as Debt.ResReadLawsuitsData[],
  handleDelete: async (record: any) => {
    try {
      await debtStore.apiDebtLawsuitsDelete(record.id)
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
  handleVisible: async (type: CrudType, record?: Debt.ResListLawsuitsData) => {
    switch (type) {
      case 'create':
        DrawerData.title = `添加${props.title}`
        break
      case 'read':
        DrawerData.title = `${props.title}详情`
        await Apis.getApiInfo(record)
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
  title: '',
  width: 800,
  visible: false,
  model: [] as { label: any; value: any }[],
  status: 1,
  type: 'cpws' as Type,
  handleVisible: async (record: Debt.ResListLawsuitsData) => {
    await Apis.getApiInfo(record)
    ModalData.title = record.lawsuits_title
    ModalData.type = record.data_type as Type
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
