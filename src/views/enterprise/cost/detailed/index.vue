<template>
  <a-space :size="12" direction="vertical" fill>
    <a-space :size="12">
      <a-select
        placeholder="请选择消费类型"
        allow-clear
        @change="ScreenData.handleType"
        @clear="ScreenData.handleClear('d_id')"
        :style="{ width: '160px' }"
      >
        <template
          v-for="item in appStore.dicts.filter((item: any) => item.key === 'data_type')[0].children"
        >
          <a-option :value="parseInt(item.key)" :label="item.value" />
        </template>
      </a-select>
      <a-select
        placeholder="请选择操作人"
        allow-clear
        @change="ScreenData.handlePay"
        @clear="ScreenData.handleClear('employee_id')"
        :style="{ width: '160px' }"
      >
        <template v-for="item in ScreenData.employees">
          <a-option :value="item.id" :label="item.name" />
        </template>
      </a-select>
      <a-range-picker
        :placeholder="['请选择开始日期', '请选择结束日期']"
        @change="ScreenData.handleDate"
        @clear="ScreenData.handleClear('date')"
        :style="{ width: '340px' }"
      />
    </a-space>
    <a-table
      :columns="TableData.columns"
      :data="enterpriseStore.detailed.table.data"
      :pagination="enterpriseStore.getDetailedPagination"
      @page-change="TableData.handlePage"
    >
    </a-table>
  </a-space>
</template>

<script setup lang="ts">
import { Enterprise } from '@/api/interface'
import { getAllEmployee } from '@/api/modules'
import { AppStore, EnterpriseStore } from '@/store'
import { CalendarValue } from '@arco-design/web-vue/es/date-picker/interface'
import { onMounted, reactive } from 'vue'
import Config from './config'

const appStore = AppStore()
const enterpriseStore = EnterpriseStore()

const Apis = reactive({
  getAll: async () => {
    try {
      const { code, data: res, msg } = await getAllEmployee()
      if (code === 0) {
        ScreenData.employees = res
      } else {
        appStore.setMessage({ content: msg, type: 'danger' })
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const ScreenData = reactive({
  date: [],
  employees: [] as { id: number; name: string }[],
  model: {
    d_id: '' as string | number,
    employee_id: '' as string | number,
    begin_time: '',
    end_time: '',
  },
  handleType: async (
    value:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[]
  ) => {
    ScreenData.model.d_id = value as number
    await TableData.getList()
  },
  handlePay: async (
    value:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[]
  ) => {
    ScreenData.model.employee_id = value as number
    await TableData.getList()
  },
  handleDate: async (
    value: (CalendarValue | undefined)[] | undefined,
    date: (Date | undefined)[] | undefined,
    dateString: (string | undefined)[] | undefined
  ) => {
    ScreenData.model.begin_time = (value as CalendarValue[])[0] as string
    ScreenData.model.end_time = (value as CalendarValue[])[1] as string
    await TableData.getList()
  },
  handleClear: async (type: string) => {
    switch (type) {
      case 'd_id':
        ScreenData.model.d_id = ''
        break
      case 'employee_id':
        ScreenData.model.employee_id = ''
        break
      default:
        ScreenData.model.begin_time = ''
        ScreenData.model.end_time = ''
        break
    }
    await TableData.getList()
  },
})

const TableData = reactive({
  ...Config.table,
  getList: async (page?: number) => {
    const params = {} as Enterprise.ReqEnterpriseCostAccountListParams
    const { d_id, employee_id, begin_time, end_time } = ScreenData.model
    d_id !== '' && Object.assign(params, { d_id })
    employee_id !== '' && Object.assign(params, { employee_id })
    begin_time !== '' && Object.assign(params, { begin_time, end_time })
    page && Object.assign(params, { page })
    await enterpriseStore.apiEnterpriseCostDetailed(params)
  },
  handlePage: async (page: number) => {
    try {
      await enterpriseStore.setPagination({ current: page }, 'detailed')
      await TableData.getList(page)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

onMounted(async () => {
  await TableData.getList(1)
  await Apis.getAll()
})
</script>

<style lang="less" scoped></style>
