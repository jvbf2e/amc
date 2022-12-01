<template>
  <a-space :size="36" direction="vertical" fill>
    <div class="account-info">
      <div class="account-info__amount">
        <span>账户余额：</span>
        <b>{{ enterpriseStore.cost.enterprise_amount }}</b>
        <span>元</span>
      </div>
      <a-button type="primary" size="small" @click="ModalData.handleVisible">
        充值
      </a-button>
    </div>
    <a-space :size="12" direction="vertical" fill>
      <a-space :size="12">
        <a-select
          placeholder="请选择充值类型"
          allow-clear
          @change="ScreenData.handleType"
          @clear="ScreenData.handleClear('recharge_type')"
          :style="{ width: '160px' }"
        >
          <template
            v-for="item in appStore.dicts.filter((item: any) => item.key === 'recharge_type')[0].children"
          >
            <a-option :value="parseInt(item.key)" :label="item.value" />
          </template>
        </a-select>
        <a-select
          placeholder="请选择支付方式"
          allow-clear
          @change="ScreenData.handlePay"
          @clear="ScreenData.handleClear('pay_method')"
          :style="{ width: '160px' }"
        >
          <template
            v-for="item in appStore.dicts.filter((item: any) => item.key === 'pay_method')[0].children"
          >
            <a-option :value="parseInt(item.key)" :label="item.value" />
          </template>
        </a-select>
        <a-range-picker
          :placeholder="['请选择开始支持日期', '请选择结束支持日期']"
          @change="ScreenData.handleDate"
          @clear="ScreenData.handleClear('date')"
          :style="{ width: '340px' }"
        />
      </a-space>
      <a-table
        :columns="TableData.columns"
        :data="enterpriseStore.cost.table.data"
        :pagination="enterpriseStore.getCostPagination"
        @page-change="TableData.handlePage"
      >
        <template #recharge_type="{ record }">
          {{ getDict('recharge_type', record.recharge_type) }}
        </template>
        <template #pay_method="{ record }">
          {{ getDict('pay_method', record.pay_method) }}
        </template>
      </a-table>
    </a-space>
    <a-modal
      :visible="ModalData.visible"
      :title="ModalData.title"
      :width="ModalData.width"
      title-align="start"
      :footer="false"
      @cancel="ModalData.handleCancel"
    >
      <div class="remittance">
        <p class="remittance-msg">
          平台收到银行汇款后十分钟内将自动匹配到您的订单，并为您完成支付。
        </p>
        <p class="remittance-z">
          <i>
            注：专属汇款账号是在平台发票信息显示账号下设立的子账号，二者为同一账号。
          </i>
        </p>
        <div class="remittance-content">
          <p><b>开户名称：</b>上海圈讯科技股份有限公司</p>
          <p><b>开户银行：</b>光大银行上海分行营业部</p>
          <p><b>专属汇款账号：</b>36510188001043162</p>
          <p class="remittance-z">
            <i>
              温馨提示：汇款成功后，请将您的汇款凭证发送给商务人员，已便到账后帮您充值到会员账户。
            </i>
          </p>
        </div>
      </div>
    </a-modal>
  </a-space>
</template>

<script setup lang="ts">
import { Enterprise } from '@/api/interface'
import { AppStore, EnterpriseStore } from '@/store'
import { getDict } from '@/utils'
import { CalendarValue } from '@arco-design/web-vue/es/date-picker/interface'
import { onMounted, reactive } from 'vue'
import Config from './config'

const appStore = AppStore()
const enterpriseStore = EnterpriseStore()

const ScreenData = reactive({
  date: [],
  model: {
    recharge_type: '' as string | number,
    pay_method: '' as string | number,
    begin_time: '',
    end_time: '',
  },
  handleType: async (
    value:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[]
  ) => {
    ScreenData.model.recharge_type = value as number
    await TableData.getList()
  },
  handlePay: async (
    value:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[]
  ) => {
    ScreenData.model.pay_method = value as number
    await TableData.getList()
  },
  handleDate: async (
    value: (CalendarValue | undefined)[] | undefined,
    date: (Date | undefined)[] | undefined,
    dateString: (string | undefined)[] | undefined
  ) => {
    ScreenData.model.begin_time = (value as CalendarValue[])[0] as string
    ScreenData.model.end_time = (value as CalendarValue[])[1] as string
    await TableData.getList()
  },
  handleClear: async (type: string) => {
    switch (type) {
      case 'recharge_type':
        ScreenData.model.pay_method = ''
        break
      case 'pay_method':
        ScreenData.model.pay_method = ''
        break
      default:
        ScreenData.model.begin_time = ''
        ScreenData.model.end_time = ''
        break
    }
    await TableData.getList()
  },
})

const TableData = reactive({
  ...Config.table,
  getList: async (page?: number) => {
    const params = {} as Enterprise.ReqEnterpriseCostAccountListParams
    const { recharge_type, pay_method, begin_time, end_time } = ScreenData.model
    recharge_type !== '' && Object.assign(params, { recharge_type })
    pay_method !== '' && Object.assign(params, { pay_method })
    begin_time !== '' && Object.assign(params, { begin_time, end_time })
    page && Object.assign(params, { page })
    await enterpriseStore.apiEnterpriseCostAccount(params)
  },
  handlePage: async (page: number) => {
    try {
      await enterpriseStore.setPagination({ current: page }, 'cost')
      await TableData.getList(page)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const ModalData = reactive({
  title: '对公转账',
  width: 620,
  visible: false,
  handleVisible: () => {
    ModalData.visible = true
  },
  handleCancel: () => {
    ModalData.visible = false
  },
})

onMounted(async () => {
  await TableData.getList()
})
</script>

<style lang="less" scoped>
.account-info {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;

  &__amount {
    vertical-align: middle;
    color: var(--color-text-2);
    font-size: 14px;

    & > b {
      display: inline-block;
      margin-right: 4px;
      color: var(--color-text-1);
      font-size: 18px;
    }
  }
}

.remittance {
  padding: 0 12px 12px;

  &-msg {
    margin: 0 0 6px;
    color: var(--color-text-2);
    font-size: 14px;
  }

  &-z {
    margin: 0;
    color: var(--color-text-3);
    font-size: 12px;
  }

  &-content {
    margin-top: 24px;
    padding: 12px 24px 24px;
    background-color: var(--color-neutral-2);
  }
}
</style>
