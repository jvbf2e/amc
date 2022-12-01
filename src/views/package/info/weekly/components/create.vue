<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item field="report_date" label="汇报日期">
          <a-date-picker
            v-model="FormData.model.report_date"
            placeholder="请选择汇报日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="asset_package_id" label="所属项目">
          <span>{{ props.packageName }}</span>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="asset_debt_id" label="债权编号">
          <a-select
            v-model="FormData.model.asset_debt_id"
            placeholder="请选择项目组成员"
          >
            <template v-for="item in WebData.debt_list">
              <a-option :value="item.asset_debt_id" :label="item.debt_no" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="债务人名称">
          <span>
            {{ compDebtorName }}
          </span>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="this_week_progress"
          label="本周进展、遇到问题及解决方案"
        >
          <a-textarea
            v-model="FormData.model.this_week_progress"
            placeholder="请输入本周进展、遇到问题及解决方案"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="next_week_plan" label="下周计划">
          <a-textarea
            v-model="FormData.model.next_week_plan"
            placeholder="请输入下周计划"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { AppStore, PackageStore } from '@/store'
import { getPackageWeeklyDebtList } from '@/api/modules'

const Emits = defineEmits(['submitSuccess'])

const props = defineProps({
  packageId: {
    request: true,
    type: Number,
    default: 0,
  },
  packageName: {
    request: true,
    type: String,
    default: '',
  },
})

const appStore = AppStore()
const packageStore = PackageStore()

const formRef = ref()

const Apis = reactive({
  getDebtList: async () => {
    try {
      const {
        code,
        data: res,
        msg,
      } = await getPackageWeeklyDebtList(props.packageId)
      if (code === 0) {
        WebData.debt_list = res
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  debt_list: [] as any[],
})

const FormData = reactive({
  model: {
    asset_package_id: props.packageId,
    asset_debt_id: '',
    report_date: '',
    this_week_progress: '',
    next_week_plan: '',
  },
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await packageStore.apiPackageWeeklyCreate(FormData.model)
          FormData.handleReset()
          Emits('submitSuccess')
        }
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      }
    })
  },
  handleReset: () => {
    formRef.value.resetFields()
  },
})

const compDebtorName = computed(
  () =>
    WebData.debt_list.filter(
      (item: any) => item.asset_debt_id === FormData.model.asset_debt_id
    )?.[0]?.main_debtor_name ?? ''
)

onMounted(() => {
  Apis.getDebtList()
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped></style>
