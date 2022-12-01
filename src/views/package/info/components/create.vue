<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item field="debt_no" label="债权编号">
          <a-input v-model="FormData.model.debt_no" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="contract_no" label="借款合同编号">
          <a-input v-model="FormData.model.contract_no" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="所属项目">
          <span>{{ packageName }}</span>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="debt_type" label="债权类型">
          <a-select
            v-model="FormData.model.debt_type"
            placeholder="请选择债权类型"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'debt_type')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="main_debtor_name" label="主债务人">
          <a-input
            v-model="FormData.model.main_debtor_name"
            placeholder="请输入"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="origin_debtor_name" label="原始债权人">
          <a-input
            v-model="FormData.model.origin_debtor_name"
            placeholder="请输入"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="loan_contract_amount" label="借款合同金额">
          <a-input-number
            v-model="FormData.model.loan_contract_amount"
            placeholder="请输入"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>元</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="iou_amount" label="借据金额">
          <a-input-number
            v-model="FormData.model.iou_amount"
            placeholder="请输入"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>元</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="area_name" label="所属地区">
          <a-input v-model="FormData.model.area_name" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="debt_principal_balance" label="债权本金余额">
          <a-input-number
            v-model="FormData.model.debt_principal_balance"
            placeholder="请输入"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>元</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="interest_penalty_amount" label="利、罚息数额">
          <a-input-number
            v-model="FormData.model.interest_penalty_amount"
            placeholder="请输入"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>元</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="principal_interest_amount" label="本息合计">
          <a-input-number
            v-model="FormData.model.principal_interest_amount"
            placeholder="请输入"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>元</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="loan_date" label="借款日期">
          <a-date-picker
            v-model="FormData.model.loan_date"
            placeholder="请输入借款日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="loan_term_rate" label="借款期利率">
          <a-input-number
            v-model="FormData.model.loan_term_rate"
            placeholder="请输入"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>%</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="interest_pause_date" label="利息暂计日期">
          <a-date-picker
            v-model="FormData.model.interest_pause_date"
            placeholder="请输入利息暂计日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="overdue_date" label="逾期日期">
          <a-date-picker
            v-model="FormData.model.overdue_date"
            placeholder="请输入逾期日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="penalty_interest_rate" label="罚息/违约金利率">
          <a-input-number
            v-model="FormData.model.penalty_interest_rate"
            placeholder="请输入"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>%</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="debt_transfer_price" label="本债权转让金额">
          <a-input-number
            v-model="FormData.model.debt_transfer_price"
            placeholder="请输入"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>元</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AppStore, DebtStore } from '@/store'
import { Debt } from '@/api/interface'

const Emits = defineEmits(['submitSuccess'])

const props = defineProps({
  packageId: {
    type: Number,
    default: 0,
  },
  packageName: String,
})

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: {
    debt_no: '',
    contract_no: '',
    asset_package_id: props.packageId,
    debt_type: 1,
    main_debtor_name: '',
    origin_debtor_name: '',
    loan_contract_amount: 0,
    iou_amount: 0,
    area_name: '',
    debt_principal_balance: 0,
    interest_penalty_amount: 0,
    principal_interest_amount: 0,
    loan_date: '',
    overdue_date: '',
    loan_term_rate: 0,
    interest_pause_date: '',
    penalty_interest_rate: 0,
    debt_transfer_price: 0,
    project_level: '',
  } as Debt.ReqCreateParams,
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtCreate(FormData.model)
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

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped></style>
