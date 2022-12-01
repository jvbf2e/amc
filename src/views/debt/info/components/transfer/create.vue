<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="transfer_no" label="转让次序">
      <a-input
        v-model="FormData.model.transfer_no"
        placeholder="请输入转让次序"
      />
    </a-form-item>
    <a-form-item field="transfer_date" label="转让日期">
      <a-date-picker
        v-model="FormData.model.transfer_date"
        placeholder="请选择转让日期"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item field="transfer_person" label="转让人">
      <a-input
        v-model="FormData.model.transfer_person"
        placeholder="请输入转让人"
      />
    </a-form-item>
    <a-form-item field="accept_person" label="受让人">
      <a-input
        v-model="FormData.model.accept_person"
        placeholder="请输入受让人"
      />
    </a-form-item>
    <a-form-item field="transfer_capital_amount" label="转让本金数额">
      <a-input-number
        v-model="FormData.model.transfer_capital_amount"
        placeholder="请输入转让本金数额"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="transfer_interest_amount" label="转让利息数额">
      <a-input-number
        v-model="FormData.model.transfer_interest_amount"
        placeholder="请输入转让利息数额"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="transfer_newspaper_name" label="转让通知方式">
      <a-input
        v-model="FormData.model.transfer_newspaper_name"
        placeholder="请输入转让通知方式"
      />
    </a-form-item>
    <a-form-item field="transfer_notice_record" label="转让公告报纸名称、版面">
      <a-input
        v-model="FormData.model.transfer_notice_record"
        placeholder="请输入转让公告报纸名称、版面"
      />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AppStore, DebtStore } from '@/store'

import Config from './config'

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const props = defineProps({
  assetDebtId: {
    type: Number,
    default: 0,
  },
})

const FormData = reactive({
  ...Config.form,
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          FormData.model.asset_debt_id = props.assetDebtId
          await debtStore.apiDebtTransferCreate(FormData.model)
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
