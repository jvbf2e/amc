<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="executor_name" label="原申请执行人">
      <a-input
        v-model="FormData.model.executor_name"
        placeholder="请输入原申请执行人"
      />
    </a-form-item>
    <a-form-item field="submit_time" label="变更申请人申请书提交时间">
      <a-input
        v-model="FormData.model.submit_time"
        placeholder="请输入变更申请人申请书提交时间"
      />
    </a-form-item>
    <a-form-item field="task_list" label="变更申请人待完成事务">
      <a-input
        v-model="FormData.model.task_list"
        placeholder="请输入变更申请人待完成事务"
      />
    </a-form-item>
    <a-form-item field="ruling_time" label="变更申请人裁定做出时间">
      <a-input
        v-model="FormData.model.ruling_time"
        placeholder="请输入变更申请人裁定做出时间"
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
    type: Object as PropType<Debt.ReqUpdateExecutorParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ReqUpdateExecutorParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtExecutorUpdate(FormData.model)
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
