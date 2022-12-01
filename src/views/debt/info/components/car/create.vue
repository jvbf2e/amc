<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="plate_number" label="车牌号码">
      <a-input
        v-model="FormData.model.plate_number"
        placeholder="请输入车牌号码"
      />
    </a-form-item>
    <a-form-item field="type" label="车辆类型">
      <a-input v-model="FormData.model.type" placeholder="请选择车辆类型" />
    </a-form-item>
    <a-form-item field="owner" label="车主">
      <a-input v-model="FormData.model.owner" placeholder="请输入车主" />
    </a-form-item>
    <a-form-item field="nature_of_use" label="车辆用途">
      <a-select
        v-model="FormData.model.nature_of_use"
        placeholder="请选择车辆用途"
      >
        <template
          v-for="item in appStore.dicts.filter((item: any) => item.key === 'nature_of_use')[0].children"
        >
          <a-option :value="parseInt(item.key)" :label="item.value" />
        </template>
      </a-select>
    </a-form-item>
    <a-form-item field="brand_model" label="品牌及型号">
      <a-input
        v-model="FormData.model.brand_model"
        placeholder="请输入品牌及型号"
      />
    </a-form-item>
    <a-form-item field="vin" label="VIN码">
      <a-input v-model="FormData.model.vin" placeholder="请输入VIN码" />
    </a-form-item>
    <a-form-item field="engine_number" label="发动机号码">
      <a-input
        v-model="FormData.model.engine_number"
        placeholder="请输入发动机号码"
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
          await debtStore.apiDebtCarCreate(FormData.model)
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
