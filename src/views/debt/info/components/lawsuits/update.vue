<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-row :gutter="24">
      <a-col :span="24">
        <a-form-item field="lawsuits_title" label="标题">
          <a-input
            v-model="FormData.model.lawsuits_title"
            placeholder="请输入标题"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="trial_date" label="审结日期">
          <a-date-picker
            v-model="FormData.model.trial_date"
            placeholder="请选择审结日期"
            allow-clear
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="jurisdiction_court" label="诉讼管辖法院">
          <a-input
            v-model="FormData.model.jurisdiction_court"
            placeholder="请输入诉讼管辖法院"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="lawsuits_body" label="内容摘要">
          <a-textarea
            v-model="FormData.model.lawsuits_body"
            placeholder="请输入内容摘要"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="execute_condition" label="申请执行情况">
          <a-input
            v-model="FormData.model.execute_condition"
            placeholder="请输入申请执行情况"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="execute_validity" label="是否超出申请执行时效">
          <a-select
            v-model="FormData.model.execute_validity"
            placeholder="请选择是否超出申请执行时效"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'is')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="executive_court" label="执行管辖法院">
          <a-input
            v-model="FormData.model.executive_court"
            placeholder="请输入诉讼管辖法院"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="executive_current" label="诉讼现状">
          <a-textarea
            v-model="FormData.model.executive_current"
            placeholder="请输入诉讼现状"
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
import { reactive, ref } from 'vue'
import lodash from 'lodash'
import { AppStore, DebtStore } from '@/store'

import type { PropType } from 'vue'
import type { Debt } from '@/api/interface'

const props = defineProps({
  model: {
    type: Object as PropType<Debt.ReqUpdateLawsuitsParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ReqUpdateLawsuitsParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtLawsuitsUpdate(FormData.model)
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
