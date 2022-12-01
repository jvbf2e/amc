<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="contract_no" label="借款合同编号">
      <a-input
        v-model="FormData.model.contract_no"
        placeholder="请输入借款合同编号"
      />
    </a-form-item>
    <a-form-item field="append_subject" label="被追加主体">
      <a-input
        v-model="FormData.model.append_subject"
        placeholder="请输入被追加主体"
      />
    </a-form-item>
    <a-form-item field="compensate_amount" label="承债金额">
      <a-input-number
        v-model="FormData.model.compensate_amount"
        placeholder="请输入承债金额"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="ruling_content" label="裁定内容">
      <a-input
        v-model="FormData.model.ruling_content"
        placeholder="请输入裁定内容"
      />
    </a-form-item>
    <a-form-item field="desc" label="备注">
      <a-textarea
        v-model="FormData.model.desc"
        placeholder="请输入备注"
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
    type: Object as PropType<Debt.ReqUpdatePunishedParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ReqUpdatePunishedParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtPunishedUpdate(FormData.model)
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
