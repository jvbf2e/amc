<template>
  <div class="role no_drag">
    <a-space direction="vertical" fill :size="16">
      <div align="right">
        <a-button
          type="primary"
          size="mini"
          status="success"
          @click="DrawerData.handleVisible('create')"
        >
          添加
        </a-button>
      </div>
      <a-table
        row-key="id"
        :columns="TableData.columns"
        :data="roleStore.getList"
        :pagination="roleStore.getPagination"
        :scroll="{ x: 600 }"
        @page-change="TableData.handlePage"
      >
        <template #index="{ rowIndex }">
          {{
            ((roleStore.table.pagination.current as number) - 1) * 10 +
            rowIndex +
            1
          }}
        </template>
        <template #operates="{ record }">
          <a-space :size="12">
            <a-link
              href="javascript:;"
              :hoverable="false"
              @click="DrawerData.handleVisible('update', record)"
            >
              编辑
            </a-link>
            <a-popconfirm
              type="warning"
              content="确定删除，当前员工吗？"
              @ok="TableData.handleDelete(record)"
            >
              <a-link href="javascript:;" status="danger" :hoverable="false">
                删除
              </a-link>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-space>
    <a-drawer
      :width="620"
      :visible="DrawerData.visible"
      @ok="DrawerData.handleOk"
      @cancel="DrawerData.handleCancel"
      unmountOnClose
    >
      <template #title>{{ DrawerData.title }}</template>
      <div class="drawer-body">
        <template v-if="DrawerData.type === 'create'">
          <SavePage ref="savePageRef" @submit-success="DrawerData.handleForm" />
        </template>
        <template v-else-if="DrawerData.type === 'update'">
          <UpdatePage
            ref="updatePageRef"
            :model="DrawerData.model"
            @submit-success="DrawerData.handleForm"
          />
        </template>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { AppStore, RoleStore } from '@/store'
import { readRole } from '@/api/modules'

import SavePage from './save.vue'
import UpdatePage from './update.vue'

import type { Role } from '@/api/interface'
import type { crudType } from './type'

import Config from './config'
import { setTreeDefaultFun } from './utils'

const appStore = AppStore()
const roleStore = RoleStore()

const savePageRef = ref()
const updatePageRef = ref()

const Apis = reactive({
  getInfo: async (id: number) => {
    try {
      const { code, data: res, msg } = await readRole(id)
      if (code === 0) {
        const { permission_ids, role_info } = res
        DrawerData.model = {
          ...role_info,
          permission_ids,
        }
      } else {
        appStore.setMessage({ content: msg, type: 'danger' })
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const TableData = reactive({
  ...Config.table,
  handleDelete: async (record: any) => {
    try {
      await roleStore.apiRoleDelete(record.id)
      await roleStore.apiRoleGetList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handlePage: async (page: number) => {
    try {
      roleStore.setTableCurrent(page)
      await roleStore.apiRoleGetList(page)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  visible: false,
  title: '员工信息',
  type: 'create' as crudType,
  model: {} as Role.ReqRoleUpdateParams,
  handleVisible: async (type: crudType, row?: any) => {
    switch (type) {
      case 'create':
        DrawerData.title = '新增员工'
        break
      case 'retrieve':
        DrawerData.title = '员工信息'
        break
      case 'update':
        DrawerData.title = '编辑员工'
        await Apis.getInfo(row.id)
        break
      default:
        DrawerData.title = ''
        break
    }
    DrawerData.type = type
    DrawerData.visible = true
  },
  handleOk: async () => {
    if (DrawerData.type === 'create') {
      await savePageRef.value.handleSubmit()
    } else {
      await updatePageRef.value.handleSubmit()
    }
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleForm: async () => {
    await roleStore.apiRoleGetList()
    DrawerData.handleCancel()
  },
})

onMounted(async () => {
  try {
    await roleStore.apiRoleGetList()
    await roleStore.apiRoleGetAllMenuTree()
    await roleStore.setTreeDefault(setTreeDefaultFun(roleStore.allMenuTree))
  } catch (error) {
    appStore.setMessage({ content: error as string, type: 'danger' })
  }
})
</script>

<style lang="less" scoped>
.role {
  position: relative;
}
</style>
