<template>
  <a-form
    ref="formRef"
    :model="FormData.model"
    layout="vertical"
    @submit="FormData.handleSubmit()"
  >
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item field="project_no" label="项目编号">
          <a-input
            v-model="FormData.model.project_no"
            placeholder="请输入项目编号"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="project_name" label="资产包名称">
          <a-input
            v-model="FormData.model.project_name"
            placeholder="请输入资产包名称"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="process_id" label="项目阶段">
          <a-select
            v-model="FormData.model.process_id"
            placeholder="请选择项目阶段"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'process_id')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="create_date" label="创建时间">
          <a-date-picker
            v-model="FormData.model.create_date"
            placeholder="请选择创建时间"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="fund_source" label="资金来源">
          <a-select
            v-model="FormData.model.fund_source"
            placeholder="请选择资金来源"
          >
            <template
              v-for="item in appStore.dynamicDict.filter((item: any) => item.key === 'fund_source')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="fund_subject" label="出资主体">
          <a-input
            v-model="FormData.model.fund_subject"
            placeholder="请输入出资主体"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="project_type" label="项目类型">
          <a-select
            v-model="FormData.model.project_type"
            placeholder="请选择项目类型"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'project_type')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="area_name" label="所属地域">
          <a-input
            v-model="FormData.model.area_name"
            placeholder="请输入所属地域"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="debt_count" label="债权户数">
          <a-input
            v-model="FormData.model.debt_count"
            placeholder="请输入债权户数"
          >
            <template #suffix>
              <span>户</span>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="debt_amount" label="债权总数">
          <a-tooltip
            :content="simplifyNum(FormData.model.debt_amount)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.debt_amount"
              placeholder="请输入债权总数"
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
        <a-form-item field="debt_capital" label="债权本金">
          <a-tooltip
            :content="simplifyNum(FormData.model.debt_capital)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.debt_capital"
              placeholder="请输入债权本金"
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
        <a-form-item field="debt_interest" label="债权利息">
          <a-tooltip
            :content="simplifyNum(FormData.model.debt_interest)"
            position="tl"
          >
            <a-input-number
              v-model="FormData.model.debt_interest"
              placeholder="请输入债权利息"
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
        <a-form-item field="deal_platform" label="交易平台">
          <a-input
            v-model="FormData.model.deal_platform"
            placeholder="请输入交易平台"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="deal_opponent" label="交易对手">
          <a-input
            v-model="FormData.model.deal_opponent"
            placeholder="请输入交易对手"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="project_leader" label="项目负责人">
          <a-select
            v-model="FormData.model.project_leader"
            placeholder="请选择项目负责人"
          >
            <template v-for="item in userStore.table.data">
              <a-option :value="item.id" :label="item.name" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="project_member" label="项目组成员">
          <a-select
            v-model="FormData.model.project_member"
            placeholder="请选择项目组成员"
            multiple
            :max-tag-count="2"
            allow-clear
          >
            <template v-for="item in userStore.table.data">
              <a-option
                :value="item.id"
                :label="item.name"
                :disabled="FormData.model.project_leader === item.id"
              />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="invest_date" label="投资日期">
          <a-date-picker
            v-model="FormData.model.invest_date"
            placeholder="请输入投资日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="invest_amount" label="投资总额">
          <a-tooltip
            :content="simplifyNum(FormData.model.invest_amount)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.invest_amount"
              placeholder="请输入投资总额"
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
        <a-form-item field="disposal_cycle" label="处置周期">
          <a-input
            v-model="FormData.model.disposal_cycle"
            placeholder="请输入处置周期"
          >
            <template #suffix>
              <span>天</span>
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="collection_target" label="回款目标">
          <a-tooltip
            :content="simplifyNum(FormData.model.collection_target)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.collection_target"
              placeholder="请输入回款目标"
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
        <a-form-item field="collection_total" label="回款累计">
          <a-tooltip
            :content="simplifyNum(FormData.model.collection_total)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.collection_total"
              placeholder="请输入回款累计"
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
        <a-form-item field="profit_target" label="利润目标(元)">
          <a-tooltip
            :content="simplifyNum(FormData.model.profit_target)"
            position="tl"
            mini
          >
            <a-input-number
              v-model="FormData.model.profit_target"
              placeholder="利润目标 = 投资总额 - 回款目标"
              :precision="2"
              read-only
            >
            </a-input-number>
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="project_desc" label="项目综述">
          <a-textarea
            v-model="FormData.model.project_desc"
            placeholder="请输入项目综述"
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
import { onMounted, reactive, ref } from 'vue'
import lodash from 'lodash'
import { AppStore, UserStore, PackageStore } from '@/store'
import { simplifyNum } from '@/utils'

import type { PropType } from 'vue'
import type { Package } from '@/api/interface'

const props = defineProps({
  model: {
    type: Object as PropType<Package.ReqUpdateParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const userStore = UserStore()
const packageStore = PackageStore()

const formRef = ref()

const WebData = reactive({
  handleChange: (value: any) => {
    FormData.model.profit_target =
      value - (FormData.model.collection_target ?? 0)
  },
  handleChange2: (value: any) => {
    FormData.model.profit_target = (FormData.model.invest_amount ?? 0) - value
  },
})

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Package.ReqUpdateParams),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await packageStore.apiPackageUpdate(FormData.model)
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
  FormData.model.fund_source === 0 && (FormData.model.fund_source = '')
  FormData.model.project_type === 0 && (FormData.model.project_type = '')
  FormData.model.project_leader === 0 && (FormData.model.project_leader = '')
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped></style>
