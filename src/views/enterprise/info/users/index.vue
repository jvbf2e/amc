<template>
  <div class="user no_drag">
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
        :columns="TableData.columns"
        :data="userStore.getList"
        :pagination="userStore.getPagination"
        :scroll="{ x: 600 }"
        @page-change="TableData.handlePage"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template #roleList="{ record, column }">
          <template v-if="record.is_admin === 1">
            <a-tag bordered color="orangered">超级管理员</a-tag>
          </template>
          <template v-else>
            <div class="tag-wrapper">
              <template
                v-for="(item, index) in record[column.dataIndex]"
                :key="item"
              >
                <a-tag bordered :color="WebData.getColor(index)">
                  {{ item }}
                </a-tag>
              </template>
            </div>
          </template>
        </template>
        <template #operates="{ record }">
          <template v-if="record.is_admin === 2">
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
        </template>
      </a-table>
    </a-space>
    <a-drawer
      :width="480"
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
        <template v-else-if="DrawerData.type === 'retrieve'">
          <InfoPage :model="WebData.userInfo" />
        </template>
        <template v-else-if="DrawerData.type === 'update'">
          <UpdatePage
            ref="updatePageRef"
            :model="WebData.userInfo"
            @submit-success="DrawerData.handleForm"
          />
        </template>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { AppStore, UserStore } from '@/store'
import { infoUser } from '@/api/modules'

import UpdatePage from './update.vue'
import InfoPage from './info.vue'
import SavePage from './save.vue'

import type { crudType, InfoType } from './type'

import Config from './config'
import { User } from '@/api/interface'

const appStore = AppStore()
const userStore = UserStore()

const savePageRef = ref()
const updatePageRef = ref()

const Apis = reactive({
  getInfo: async (id: number) => {
    try {
      const { code, data: res, msg } = await infoUser(id)
      if (code === 0) {
        WebData.userInfo = res
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  colors: [
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
  ],
  userInfo: {} as User.ReqUpdateUserParams,
  getColor: (index: number) => {
    const num = Math.floor(index / 7)
    return WebData.colors[index - num * 7]
  },
})

const TableData = reactive({
  columns: Config.table.columns,
  handlePage: async (page: number) => {
    try {
      userStore.setTableCurrent(page)
      await userStore.apiUserGetList(page)
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handleDelete: async (record: any) => {
    try {
      await userStore.apiUserDelete(record.id)
      await userStore.apiUserGetList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const DrawerData = reactive({
  visible: false,
  title: '员工信息',
  type: 'create' as crudType,
  edit: {
    model: {} as InfoType,
  },
  handleVisible: (type: crudType, record?: any) => {
    DrawerData.type = type
    switch (type) {
      case 'create':
        DrawerData.title = '新增员工'
        break
      case 'retrieve':
        DrawerData.title = '员工信息'
        Apis.getInfo(record.id)
        break
      case 'update':
        DrawerData.title = '编辑员工'
        Apis.getInfo(record.id)
        break
      default:
        DrawerData.title = ''
        break
    }
    DrawerData.visible = true
  },
  handleOk: async () => {
    switch (DrawerData.type) {
      case 'create':
        await savePageRef.value.handleSubmit()
        break
      case 'update':
        await updatePageRef.value.handleSubmit()
        break
      default:
        break
    }
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleForm: async () => {
    await userStore.apiUserGetList()
    DrawerData.handleCancel()
  },
})

onMounted(async () => {
  await userStore.apiUserGetList()
})
</script>

<style lang="less" scoped>
.tag-wrapper {
  max-width: 320px;

  & > .arco-tag {
    margin-right: 6px;
    margin-bottom: 6px;
  }
}
.user {
  position: relative;
}
</style>
