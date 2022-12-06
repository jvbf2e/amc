<template>
  <a-form
    ref="formRef"
    :model="FormData.model"
    layout="vertical"
    @submit="FormData.handleSubmit"
  >
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item field="debt_no" label="债权编号">
          <a-input
            v-model="FormData.model.debt_no"
            placeholder="请输入债权编号"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="contract_no" label="借款合同编号">
          <a-input
            v-model="FormData.model.contract_no"
            placeholder="请输入借款合同编号"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="asset_package_id" label="所属项目">
          <a-select
            v-model="FormData.model.asset_package_id"
            placeholder="请选择所属资产包"
          >
            <template v-for="item in WebData.packageList">
              <a-option
                :value="item.asset_package_id"
                :label="item.project_name"
                :disabled="!!packageId"
              />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="debt_type" label="债权类型">
          <a-select
            v-model="FormData.model.debt_type"
            placeholder="请选择债权类型"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'debt_type')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="main_debtor_name" label="主债务人">
          <a-input
            v-model="FormData.model.main_debtor_name"
            placeholder="请输入主债务人"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="origin_debtor_name" label="原始债权人">
          <a-input
            v-model="FormData.model.origin_debtor_name"
            placeholder="请输入原始债权人"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="loan_contract_amount" label="借款合同金额">
          <a-tooltip
            :content="simplifyNum(FormData.model.loan_contract_amount)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.loan_contract_amount"
              placeholder="请输入借款合同金额"
              :precision="2"
              allow-clear
              hide-button
              :max="10000000000000"
              model-event="input"
            >
              <template #suffix>
                <span>元</span>
              </template>
            </a-input-number>
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="iou_amount" label="借据金额">
          <a-tooltip
            :content="simplifyNum(FormData.model.iou_amount)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.iou_amount"
              placeholder="请输入借据金额"
              :precision="2"
              allow-clear
              hide-button
              :max="10000000000000"
              model-event="input"
            >
              <template #suffix>
                <span>元</span>
              </template>
            </a-input-number>
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="area_name" label="所属地区">
          <a-input
            v-model="FormData.model.area_name"
            placeholder="请输入所属地区"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="debt_principal_balance" label="债权本金余额">
          <a-tooltip
            :content="simplifyNum(FormData.model.debt_principal_balance)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.debt_principal_balance"
              placeholder="请输入债权本金余额"
              :precision="2"
              allow-clear
              hide-button
              :max="10000000000000"
              model-event="input"
              @change="WebData.handleChange"
            >
              <template #suffix>
                <span>元</span>
              </template>
            </a-input-number>
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="interest_penalty_amount" label="利、罚息数额">
          <a-tooltip
            :content="simplifyNum(FormData.model.interest_penalty_amount)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.interest_penalty_amount"
              placeholder="请输入利、罚息数额"
              :precision="2"
              allow-clear
              hide-button
              :max="10000000000000"
              model-event="input"
              @change="WebData.handleChange2"
            >
              <template #suffix>
                <span>元</span>
              </template>
            </a-input-number>
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="principal_interest_amount" label="本息合计(元)">
          <a-tooltip
            :content="simplifyNum(FormData.model.principal_interest_amount)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.principal_interest_amount"
              placeholder="本息合计 = 债权本金余额 + 利、罚息数额"
              :precision="2"
              read-only
            >
            </a-input-number>
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="loan_date" label="借款日期">
          <a-date-picker
            v-model="FormData.model.loan_date"
            placeholder="请选择借款日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="loan_term_rate" label="借款期利率">
          <a-input-number
            v-model="FormData.model.loan_term_rate"
            placeholder="请输入借款期利率"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>%</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="interest_pause_date" label="利息暂计日期">
          <a-date-picker
            v-model="FormData.model.interest_pause_date"
            placeholder="请输入利息暂计日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="overdue_date" label="逾期日期">
          <a-date-picker
            v-model="FormData.model.overdue_date"
            placeholder="请选择逾期日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="penalty_interest_rate" label="罚息/违约金利率">
          <a-input-number
            v-model="FormData.model.penalty_interest_rate"
            placeholder="请输入罚息/违约金利率"
            :precision="2"
            allow-clear
            hide-button
          >
            <template #suffix>
              <span>%</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="debt_transfer_price" label="本债权转让金额">
          <a-tooltip
            :content="simplifyNum(FormData.model.debt_transfer_price)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.debt_transfer_price"
              placeholder="请输入本债权转让金额"
              :precision="2"
              allow-clear
              hide-button
              :max="10000000000000"
              model-event="input"
            >
              <template #suffix>
                <span>元</span>
              </template>
            </a-input-number>
          </a-tooltip>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import lodash from 'lodash'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getDebtPackageList } from '@/api/modules'
import { simplifyNum } from '@/utils'
import { AppStore, DebtStore } from '@/store'

import type { PropType } from 'vue'
import type { Debt } from '@/api/interface'

const props = defineProps({
  packageId: {
    type: Number,
  },
  model: {
    type: Object as PropType<Debt.ReqUpdateParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const router = useRouter()

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const Apis = reactive({
  getPackageList: async () => {
    try {
      const { code, data: res, msg } = await getDebtPackageList()
      if (code === 0) {
        WebData.packageList = res
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  packageList: [] as { asset_package_id: number; project_name: string }[],
  handleChange: (value: any) => {
    FormData.model.principal_interest_amount =
      (FormData.model.interest_penalty_amount ?? 0) + value
  },
  handleChange2: (value: any) => {
    FormData.model.principal_interest_amount =
      (FormData.model.debt_principal_balance ?? 0) + value
  },
  push: () => {
    router.push({ name: 'DebtList' })
  },
})

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ReqUpdateParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await debtStore.apiDebtUpdate(FormData.model)
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

onMounted(async () => {
  props.packageId
    ? (FormData.model.asset_package_id = props.packageId ?? '')
    : ''
  await Apis.getPackageList()
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped></style>
