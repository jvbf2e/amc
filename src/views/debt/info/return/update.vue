<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-form-item field="collection_date" label="回款日期">
      <a-date-picker
        v-model="FormData.model.collection_date"
        placeholder="请输入标题"
      />
    </a-form-item>
    <a-form-item field="collection_amount" label="回款金额">
      <a-input-number
        v-model="FormData.model.collection_amount"
        placeholder="请输入回款金额"
        :precision="2"
        allow-clear
        hide-button
      >
        <template #suffix>
          <span>元</span>
        </template>
      </a-input-number>
    </a-form-item>
    <a-form-item field="collection_type" label="回款类型">
      <a-select
        v-model="FormData.model.collection_type"
        placeholder="请选择回款类型"
      >
        <template
          v-for="item in appStore.dicts.filter((item: any) => item.key === 'collection_type')[0].children"
        >
          <a-option :value="parseInt(item.key)" :label="item.value" />
        </template>
      </a-select>
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
import { PropType, reactive, ref } from 'vue'
import lodash from 'lodash'
import { Debt } from '@/api/interface'
import { AppStore, DebtStore } from '@/store'

const Emits = defineEmits(['submitSuccess'])

const props = defineProps({
  debtId: {
    request: true,
    type: Number,
    default: 0,
  },
  model: {
    request: true,
    type: Object as PropType<Debt.ReqUpdateReturnParams>,
  },
})

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model) as Debt.ReqUpdateReturnParams,
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtReturnUpdate(FormData.model)
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

<style lang="less" scoped>
.upload {
  display: inline-block;
  max-width: 100%;
  cursor: pointer;

  &-list {
    &-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 12px;
    }
  }
}
</style>
