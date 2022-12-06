<template>
  <LayoutPage>
    <a-space direction="vertical" size="large" fill>
      <a-descriptions :data="WebData.info" size="large">
        <template #title>
          <div class="debtor">
            <span>基础信息</span>
            <a-button
              type="primary"
              size="mini"
              @click="DrawerData.handleVisible"
            >
              修改
            </a-button>
          </div>
        </template>
      </a-descriptions>
      <!-- 债务人信息 -->
      <DebtorPage
        ref="debtorPageRef"
        title="债务人信息"
        :assetDebtId="WebData.asset_debt_id"
      />
      <!-- 担保信息 -->
      <GuaranteePage title="担保信息" :assetDebtId="WebData.asset_debt_id" />
      <!-- 历史转让信息 -->
      <TransferPage title="历史转让信息" :assetDebtId="WebData.asset_debt_id" />
      <!-- 房产信息 -->
      <HousePage title="房产信息" :assetDebtId="WebData.asset_debt_id" />
      <!-- 车产信息 -->
      <CarPage title="车产信息" :assetDebtId="WebData.asset_debt_id" />
      <!-- 申请执行人变更信息 -->
      <ExecutorPage
        title="申请执行人变更信息"
        :assetDebtId="WebData.asset_debt_id"
      />
      <!-- 被执行人、追加信息 -->
      <PunishedPage
        title="被执行人、追加信息"
        :assetDebtId="WebData.asset_debt_id"
      />
      <!-- 诉讼执行信息 -->
      <LawsuitsPage title="诉讼执行信息" :assetDebtId="WebData.asset_debt_id" />
      <!-- 处置节点 -->
      <NodePage title="处置节点" :assetDebtId="WebData.asset_debt_id" />
      <!-- 处置决策 -->
      <DecisionPage title="处置决策" :assetDebtId="WebData.asset_debt_id" />
      <!-- 处置服务信息 -->
      <ServicePage title="处置服务信息" :assetDebtId="WebData.asset_debt_id" />
      <!-- 支出费用 -->
      <ExpensePage title="支出费用" :assetDebtId="WebData.asset_debt_id" />
    </a-space>
    <a-drawer
      :title="DrawerData.title"
      :width="DrawerData.width"
      :visible="DrawerData.visible"
      @ok="DrawerData.handleOk"
      @cancel="DrawerData.handleCancel"
      unmountOnClose
    >
      <UpdatePage
        ref="updatePageRef"
        :model="WebData.baseInfo"
        @submit-success="DrawerData.handleForm"
      />
    </a-drawer>
  </LayoutPage>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getDebtPackageList, readDebt } from '@/api/modules'
import { getDict } from '@/utils'
import { AppStore, DebtStore } from '@/store'

import type { Debt } from '@/api/interface'

import LayoutPage from './components/layout.vue'
import UpdatePage from '@/views/debt/components/update.vue'
import CarPage from './components/car/index.vue'
import DebtorPage from './components/debtor/index.vue'
import DecisionPage from './components/decision/index.vue'
import ExecutorPage from './components/executor/index.vue'
import ExpensePage from './components/expense/index.vue'
import GuaranteePage from './components/guarantee/index.vue'
import HousePage from './components/house/index.vue'
import NodePage from './components/node/index.vue'
import PunishedPage from './components/punished/index.vue'
import ServicePage from './components/service/index.vue'
import TransferPage from './components/transfer/index.vue'
import LawsuitsPage from './components/lawsuits/index.vue'

import Config from './config'

const { query } = useRoute()

const appStore = AppStore()
const debtStore = DebtStore()

const updatePageRef = ref()
const debtorPageRef = ref()

const Apis = reactive({
  getInfo: async () => {
    try {
      const {
        code,
        data: res,
        msg,
      } = await readDebt(parseInt(query.asset_debt_id as string))
      if (code === 0) {
        WebData.baseInfo = res
        debtStore.setInfoDebtType(res.debt_type as number)
        WebData.setData(res)
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
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
  asset_debt_id: parseInt(query.asset_debt_id as string),
  isInfo: true,
  packageList: [] as { asset_package_id: number; project_name: string }[],
  info: [] as { label: any; value: any }[],
  baseInfo: {} as Debt.ReqUpdateParams,
  setData: (data: any) => {
    WebData.info = []
    const rows = Config.description
    for (const key in rows) {
      const label = Config.description[key]
      let value = ''
      switch (key) {
        case 'asset_package_id':
          value = getPackageName(data[key])
          break
        case 'debt_type':
        case 'project_level':
          value = getDict(key, data[key])
          break
        default:
          value = data[key]
          break
      }
      WebData.info.push({
        label,
        value: value === '' ? '--' : value,
      })
    }

    function getPackageName(id: number): string {
      const row = WebData.packageList.filter(
        (item: any) => item.asset_package_id === id
      )
      return row[0].project_name ?? ''
    }
  },
})

const DrawerData = reactive({
  title: '编辑资产包',
  width: 820,
  visible: false,
  handleVisible: async () => {
    await Apis.getInfo()
    DrawerData.visible = true
  },
  handleOk: async () => {
    await updatePageRef.value.handleSubmit()
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleForm: async () => {
    await Apis.getInfo()
    await debtorPageRef.value.handleRefresh()
    DrawerData.handleCancel()
  },
})

onMounted(async () => {
  await Apis.getPackageList()
  await Apis.getInfo()
})
</script>

<style lang="less" scoped>
.debtor {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
