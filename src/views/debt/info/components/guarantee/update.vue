<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="guarantee_no" label="担保合同编号">
      <a-input
        v-model="FormData.model.guarantee_no"
        placeholder="请输入担保合同编号"
      />
    </a-form-item>
    <a-form-item field="guarantee_person" label="担保人">
      <a-input
        v-model="FormData.model.guarantee_person"
        placeholder="请输入担保人"
      />
    </a-form-item>
    <a-form-item field="mortgage_mode" label="抵押方式">
      <a-input
        v-model="FormData.model.mortgage_mode"
        placeholder="请输入抵押方式"
      />
    </a-form-item>
    <a-form-item field="mortgage_goods" label="抵押物">
      <a-input
        v-model="FormData.model.mortgage_goods"
        placeholder="请输入抵押物"
      />
    </a-form-item>
    <a-form-item field="guarantee_mode" label="保证方式">
      <a-input
        v-model="FormData.model.guarantee_mode"
        placeholder="请输入保证方式"
      />
    </a-form-item>
    <a-form-item field="mortgage_amount" label="抵押金额">
      <a-input-number
        v-model="FormData.model.mortgage_amount"
        placeholder="请输入抵押金额"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="pledge_amount" label="质押金额">
      <a-input-number
        v-model="FormData.model.pledge_amount"
        placeholder="请输入质押金额"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="guarantee_amount" label="保证金额">
      <a-input-number
        v-model="FormData.model.guarantee_amount"
        placeholder="请输入保证金额"
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
    type: Object as PropType<Debt.ReqUpdateGuaranteeParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ReqUpdateGuaranteeParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtGuaranteeUpdate(FormData.model)
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
