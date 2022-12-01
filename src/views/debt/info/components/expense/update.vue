<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="expense_type" label="支出类型">
      <a-select
        v-model="FormData.model.expense_type"
        placeholder="请选择支出类型"
      >
        <template
          v-for="item in appStore.dicts.filter((item: any) => item.key === 'expense_type')[0].children"
        >
          <a-option :value="parseInt(item.key)" :label="item.value" />
        </template>
      </a-select>
    </a-form-item>
    <a-form-item field="expense_amount" label="支出金额">
      <a-input-number
        v-model="FormData.model.expense_amount"
        placeholder="请输入支出金额"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import lodash from 'lodash'
import { AppStore, DebtStore } from '@/store'

import type { PropType } from 'vue'
import type { Debt } from '@/api/interface'

const props = defineProps({
  model: {
    type: Object as PropType<Debt.ReqUpdateExpenseParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ReqUpdateExpenseParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtExpenseUpdate(FormData.model)
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
