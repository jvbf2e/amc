<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="matters" label="提请决策事项">
      <a-input
        v-model="FormData.model.matters"
        placeholder="请输入提请决策事项"
      />
    </a-form-item>
    <a-form-item field="scheme" label="提请决策理由及方案">
      <a-input
        v-model="FormData.model.scheme"
        placeholder="请输入提请决策理由及方案"
      />
    </a-form-item>
    <a-form-item field="opinion" label="项目负责人意见">
      <a-input
        v-model="FormData.model.opinion"
        placeholder="请输入项目负责人意见"
      />
    </a-form-item>
    <a-form-item field="results" label="投决会议决">
      <a-textarea
        v-model="FormData.model.results"
        placeholder="请输入投决会议决"
        :auto-size="{
          minRows: 2,
          maxRows: 5,
        }"
      />
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
    type: Object as PropType<Debt.ReqUpdateDecisionParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ReqUpdateDecisionParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtDecisionUpdate(FormData.model)
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
