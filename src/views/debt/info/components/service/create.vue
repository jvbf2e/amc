<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="service_name" label="服务商名称">
      <a-input
        v-model="FormData.model.service_name"
        placeholder="请输入服务商名称"
      />
    </a-form-item>
    <a-form-item field="area_name" label="所在区域">
      <a-input
        v-model="FormData.model.area_name"
        placeholder="请输入所在区域"
      />
    </a-form-item>
    <a-form-item field="entrust_term" label="委托期限">
      <a-input
        v-model="FormData.model.entrust_term"
        placeholder="请输入委托期限"
      />
    </a-form-item>
    <a-form-item field="basic_cost" label="基础费用">
      <a-input-number
        v-model="FormData.model.basic_cost"
        placeholder="请输入基础费用"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="partition_rate" label="回款分配比例">
      <a-input-number
        v-model="FormData.model.partition_rate"
        placeholder="请输入回款分配比例"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>%</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="fee_paid" label="已付费用">
      <a-input-number
        v-model="FormData.model.fee_paid"
        placeholder="请输入已付费用"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="node_check" label="节点考核">
      <a-input
        v-model="FormData.model.node_check"
        placeholder="请输入委托期限"
      />
    </a-form-item>
    <a-form-item field="power_rating" label="能力评级">
      <a-input
        v-model="FormData.model.power_rating"
        placeholder="请输入委托期限"
      />
    </a-form-item>
    <a-form-item field="renewal_opinion" label="续约意见">
      <a-input
        v-model="FormData.model.renewal_opinion"
        placeholder="请输入委托期限"
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
          await debtStore.apiDebtServiceCreate(FormData.model)
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
