<template>
  <LayoutPage>
    <a-space direction="vertical" size="large" fill>
      <a-descriptions :data="WebData.info" title="基础信息" size="large">
        <template #title>
          <span>基础信息</span>
          <div style="float: right">
            <a-space :size="12">
              <a-button
                type="primary"
                size="mini"
                @click="DrawerData.handleVisible('updateInfo')"
              >
                编辑
              </a-button>
            </a-space>
          </div>
        </template>
      </a-descriptions>
      <a-descriptions
        size="large"
        :label-style="{ padding: 0 }"
        :value-style="{ padding: 0 }"
      >
        <template #title>
          <span>债权信息</span>
          <div style="float: right">
            <a-button
              type="primary"
              status="success"
              size="mini"
              @click="DrawerData.handleVisible('create')"
              >添加</a-button
            >
          </div>
        </template>
      </a-descriptions>
    </a-space>
    <a-table
      :columns="TableData.columns"
      :data="TableData.data"
      :pagination="false"
    >
      <template #contract_no="{ record }">
        <a-link href="javascript:;" @click.stop="TableData.handlePush(record)">
          {{ record.contract_no }}
        </a-link>
      </template>
      <template #operates="{ record }">
        <a-space :size="12">
          <a-link
            href="javascript:;"
            :hoverable="false"
            @click.stop="DrawerData.handleVisible('update', record)"
          >
            编辑
          </a-link>
          <a-popconfirm
            position="tr"
            type="warning"
            content="确定删除，当前数据吗？"
            @ok="TableData.handleDelete(record)"
          >
            <a-link href="javascript:;" :hoverable="false" status="danger">
              删除
            </a-link>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
    <a-drawer
      :title="DrawerData.title"
      :width="DrawerData.width"
      :visible="DrawerData.visible"
      @ok="DrawerData.handleOk"
      @cancel="DrawerData.handleCancel"
      unmountOnClose
    >
      <template v-if="DrawerData.type === 'create'">
        <CreatePage
          ref="createPageRef"
          :package-id="parseInt(params.asset_package_id as string)"
          @submit-success="DrawerData.handleForm"
        />
      </template>
      <template v-if="DrawerData.type === 'update'">
        <UpdatePage
          ref="updatePageRef"
          :package-id="parseInt(params.asset_package_id as string)"
          :model="WebData.debtInfo"
          @submit-success="DrawerData.handleForm"
        />
      </template>
      <template v-if="DrawerData.type === 'updateInfo'">
        <UpdateInfoPage
          ref="updateInfoPageRef"
          :model="WebData.packageInfo"
          @submit-success="DrawerData.handleForm"
        />
      </template>
    </a-drawer>
  </LayoutPage>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { readDebt, readPackage } from '@/api/modules'
import { AppStore, PackageStore, UserStore } from '@/store'

import LayoutPage from './components/layout.vue'
import CreatePage from '@/views/debt/components/create.vue'
import UpdatePage from '@/views/debt/components/update.vue'
import UpdateInfoPage from '@/views/package/components/update.vue'

import type { Debt, Package } from '@/api/interface'
import type { crudType } from './type'

import Config from './config'

const router = useRouter()
const { params } = useRoute()

const createPageRef = ref()
const updatePageRef = ref()
const updateInfoPageRef = ref()

const appStore = AppStore()
const userStore = UserStore()
const packageStore = PackageStore()

const Apis = reactive({
  getInfo: async () => {
    try {
      const {
        code,
        data: res,
        msg,
      } = await readPackage(parseInt(params.asset_package_id as string))
      if (code === 0) {
        WebData.packageInfo = res.assert_package
        WebData.setData(res.assert_package)
        TableData.data = res.assert_debt_lists
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  getDebtInfo: async (id: number) => {
    try {
      const { code, data: res, msg } = await readDebt(id)
      if (code === 0) {
        WebData.debtInfo = res
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  isInfo: true,
  info: [] as { label: any; value: any }[],
  debtInfo: {} as Debt.ResReadData,
  packageInfo: {} as Package.ReqUpdateParams,
  setData: (data: Package.AssetPackageInfo) => {
    WebData.info = []
    const rows = Config.description
    const select = ['fund_source', 'project_type', 'process_id']
    for (const key in rows) {
      const label = Config.description[key]
      const value = WebData.getValue(key, data)
      WebData.info.push({
        label,
        value,
      })
    }
  },
  getValue: (key: string, data: Package.AssetPackageInfo) => {
    let value = ''
    switch (key) {
      case 'fund_source':
      case 'project_type':
      case 'process_id':
        value = appStore.dicts
          .filter((item: any) => item.key === key)[0]
          .children.filter((item: any) => item.key === `${data[key]}`)[0].value
        break
      case 'project_leader':
        value =
          data[key] === ''
            ? ''
            : userStore.table.data.filter(
                (item: any) => item.id === data[key]
              )?.[0]?.name
        break
      case 'project_member':
        value = userStore.table.data
          .filter((item: any) => data[key].includes(item.id))
          .map((item) => item.name)
          .join()
        break
      default:
        value = data[key]
        break
    }
    return value
  },
})

const TableData = reactive({
  ...Config.table,
  data: [] as any[],
  handlePush: (row: any) => {
    router.push({
      name: 'DebtInfoDashboard',
      params: { asset_debt_id: row.asset_debt_id, title: row.debt_no },
    })
  },
  handleDelete: async (row: any) => {
    try {
      await packageStore.apiPackageDebtDelete({
        asset_package_id: parseInt(params.asset_package_id as string),
        asset_debt_ids: [row.asset_debt_id],
      })
      await Apis.getInfo()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  title: '债权',
  width: 820,
  visible: false,
  type: 'create' as crudType,
  handleVisible: async (type: crudType, record?: Debt.ReqUpdateParams) => {
    switch (type) {
      case 'create':
        DrawerData.title = '添加债权'
        break
      case 'read':
        DrawerData.title = '债权信息'
        break
      case 'update':
        DrawerData.title = '编辑债权'
        await Apis.getDebtInfo(record?.asset_debt_id as number)
        break
      case 'updateInfo':
        DrawerData.title = '编辑资产包'
        await Apis.getInfo()
        break
      default:
        break
    }
    DrawerData.type = type
    DrawerData.visible = true
  },
  handleOk: async () => {
    switch (DrawerData.type) {
      case 'create':
        await createPageRef.value.handleSubmit()
        break
      case 'update':
        await updatePageRef.value.handleSubmit()
        break
      case 'updateInfo':
        await updateInfoPageRef.value.handleSubmit()
        break
      default:
        break
    }
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleForm: async () => {
    await Apis.getInfo()
    DrawerData.handleCancel()
  },
})

onMounted(async () => {
  await Apis.getInfo()
})
</script>

<style lang="less" scoped>
.package-info {
  position: relative;
  padding: 24px;
}
</style>
