<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <!-- 主债务人 -->
    <h4>主债务人</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item field="debtor_name_debtor" label="姓名/名称">
          <a-input
            v-model="FormData.model.debtor_name.debtor"
            placeholder="请输入姓名/名称"
            disabled
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="id_number_debtor" label="身份证/统一社会信用代码">
          <a-input
            v-model="FormData.model.id_number.debtor"
            placeholder="请输入身份证/统一社会信用代码"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="register_address_debtor" label="注册地址">
          <a-input
            v-model="FormData.model.register_address.debtor"
            placeholder="请输入注册地址"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="actual_address_debtor" label="实际地址">
          <a-input
            v-model="FormData.model.actual_address.debtor"
            placeholder="请输入实际地址"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="contact_way_debtor" label="联系方式">
          <a-input
            v-model="FormData.model.contact_way.debtor"
            placeholder="请输入联系方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="repayment_willing_debtor" label="偿债意愿">
          <a-input
            v-model="FormData.model.repayment_willing.debtor"
            placeholder="请输入偿债意愿"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="external_claim_debtor" label="对外债务规模">
          <a-input
            v-model="FormData.model.external_claim.debtor"
            placeholder="请输入对外债务规模"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="lawsuits_count_debtor" label="诉讼、执行案件数量">
          <a-input
            v-model="FormData.model.lawsuits_count.debtor"
            placeholder="请输入诉讼、执行案件数量"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="possibility_assess_debtor"
          label="破产重整/清算可能性评估"
        >
          <a-input
            v-model="FormData.model.possibility_assess.debtor"
            placeholder="请输入破产重整/清算可能性评估"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="solvency_assess_debtor" label="偿债能力评估">
          <a-input
            v-model="FormData.model.solvency_assess.debtor"
            placeholder="请输入偿债能力评估"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="desc_debtor" label="备注">
          <a-input
            v-model="FormData.model.desc.debtor"
            placeholder="请输入备注"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 抵/质押人 -->
    <h4>抵/质押人</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item field="debtor_name_mortgagor" label="姓名/名称">
          <a-input
            v-model="FormData.model.debtor_name.mortgagor"
            placeholder="请输入姓名/名称"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="id_number_mortgagor"
          label="身份证/统一社会信用代码"
        >
          <a-input
            v-model="FormData.model.id_number.mortgagor"
            placeholder="请输入身份证/统一社会信用代码"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="register_address_mortgagor" label="注册地址">
          <a-input
            v-model="FormData.model.register_address.mortgagor"
            placeholder="请输入注册地址"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="actual_address_mortgagor" label="实际地址">
          <a-input
            v-model="FormData.model.actual_address.mortgagor"
            placeholder="请输入实际地址"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="contact_way_mortgagor" label="联系方式">
          <a-input
            v-model="FormData.model.contact_way.mortgagor"
            placeholder="请输入联系方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="repayment_willing_mortgagor" label="偿债意愿">
          <a-input
            v-model="FormData.model.repayment_willing.mortgagor"
            placeholder="请输入偿债意愿"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="external_claim_mortgagor" label="对外债务规模">
          <a-input
            v-model="FormData.model.external_claim.mortgagor"
            placeholder="请输入对外债务规模"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="lawsuits_count_mortgagor"
          label="诉讼、执行案件数量"
        >
          <a-input
            v-model="FormData.model.lawsuits_count.mortgagor"
            placeholder="请输入诉讼、执行案件数量"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="possibility_assess_mortgagor"
          label="破产重整/清算可能性评估"
        >
          <a-input
            v-model="FormData.model.possibility_assess.mortgagor"
            placeholder="请输入破产重整/清算可能性评估"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="solvency_assess_mortgagor" label="偿债能力评估">
          <a-input
            v-model="FormData.model.solvency_assess.mortgagor"
            placeholder="请输入偿债能力评估"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="desc_mortgagor" label="备注">
          <a-input
            v-model="FormData.model.desc.mortgagor"
            placeholder="请输入备注"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 保证人 -->
    <h4>保证人</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item field="debtor_name_guarantor" label="姓名/名称">
          <a-input
            v-model="FormData.model.debtor_name.guarantor"
            placeholder="请输入姓名/名称"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="id_number_guarantor"
          label="身份证/统一社会信用代码"
        >
          <a-input
            v-model="FormData.model.id_number.guarantor"
            placeholder="请输入身份证/统一社会信用代码"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="register_address_guarantor" label="注册地址">
          <a-input
            v-model="FormData.model.register_address.guarantor"
            placeholder="请输入注册地址"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="actual_address_guarantor" label="实际地址">
          <a-input
            v-model="FormData.model.actual_address.guarantor"
            placeholder="请输入实际地址"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="contact_way_guarantor" label="联系方式">
          <a-input
            v-model="FormData.model.contact_way.guarantor"
            placeholder="请输入联系方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="repayment_willing_guarantor" label="偿债意愿">
          <a-input
            v-model="FormData.model.repayment_willing.guarantor"
            placeholder="请输入偿债意愿"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="external_claim_guarantor" label="对外债务规模">
          <a-input
            v-model="FormData.model.external_claim.guarantor"
            placeholder="请输入对外债务规模"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="lawsuits_count_guarantor"
          label="诉讼、执行案件数量"
        >
          <a-input
            v-model="FormData.model.lawsuits_count.guarantor"
            placeholder="请输入诉讼、执行案件数量"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="possibility_assess_guarantor"
          label="破产重整/清算可能性评估"
        >
          <a-input
            v-model="FormData.model.possibility_assess.guarantor"
            placeholder="请输入破产重整/清算可能性评估"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="solvency_assess_guarantor" label="偿债能力评估">
          <a-input
            v-model="FormData.model.solvency_assess.guarantor"
            placeholder="请输入偿债能力评估"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="desc_guarantor" label="备注">
          <a-input
            v-model="FormData.model.desc.guarantor"
            placeholder="请输入备注"
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
    type: Object as PropType<Debt.ReqUpdateDebtorParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ReqUpdateDebtorParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtDebtorUpdate(FormData.model)
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
