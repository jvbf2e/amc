<template>
  <div class="library">
    <div class="library-search">
      <a-space :size="12">
        <a-button
          type="primary"
          shape="round"
          size="mini"
          @click="WebData.handleUpload"
        >
          <a-space :size="6">
            <IconUpload />
            <span>上传</span>
          </a-space>
        </a-button>
        <a-button
          shape="round"
          size="mini"
          @click="DrawerData.handleVisible('create')"
        >
          <a-space :size="6">
            <IconPlus />
            <span>新建文件夹</span>
          </a-space>
        </a-button>
        <template v-if="ListData.active">
          <a-button-group shape="round" size="mini">
            <template v-if="ListData.isFile">
              <a-button @click="WebData.handleDownload">
                <a-space :size="6">
                  <IconDownload />
                  <span>下载</span>
                </a-space>
              </a-button>
            </template>
            <a-button @click="DrawerData.handleVisible('update')">
              <a-space :size="6">
                <IconEdit />
                <span>编辑</span>
              </a-space>
            </a-button>
            <a-button @click="WebData.handleDelete">
              <a-space :size="6">
                <IconDelete />
                <span>删除</span>
              </a-space>
            </a-button>
          </a-button-group>
        </template>
      </a-space>
      <!-- <a-input-search
        class="library-search__input"
        size="mini"
        placeholder="搜索文件"
      /> -->
    </div>
    <div class="library-header">
      <span class="library-header__options">
        <IconLeft
          :class="{
            open: WebData.params.group_id !== 0,
          }"
          @click="WebData.handleBack"
        />
        <IconRight
          :class="{ open: WebData.history.forward }"
          @click="WebData.handleForward"
        />
        <IconRefresh class="open" @click="WebData.handleRefresh" />
      </span>
      <a-divider direction="vertical" />
    </div>
    <a-scrollbar
      outer-class="library-body"
      style="height: 100%; overflow-x: hidden; overflow-y: auto"
      @click.stop="ListData.handleSelect"
    >
      <div class="library-list">
        <template v-for="item in WebData.all[0]">
          <div
            :class="[
              'library-list-item',
              { active: item.id === ListData.active },
            ]"
            @click.stop="ListData.handleSelect(item)"
            @dblclick.stop="WebData.handleDeep(item.id)"
          >
            <IconCheckCircleFill class="check" />
            <span class="content">
              <template v-if="item.file_type === 1">
                <IconFont type="icon-image" :size="48" />
              </template>
              <template v-else-if="item.file_type === 2">
                <IconFont type="icon-other" :size="48" />
              </template>
              <template v-else-if="item.file_type === 3">
                <IconFont type="icon-video" :size="48" />
              </template>
              <template v-else>
                <IconFont type="icon-file" :size="48" />
              </template>
            </span>
            <div class="title">{{ item.name }}</div>
          </div>
        </template>
        <div class="library-list-upload" @click="WebData.handleUpload">
          <span class="content">
            <span class="content-upload">
              <IconPlus />
            </span>
          </span>
          <div class="title">上传文件</div>
        </div>
      </div>
    </a-scrollbar>
    <div class="library-footer">
      <span>{{ WebData.total }} 项</span>
    </div>
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
          :parent-id="WebData.params.group_id"
          @submit-success="DrawerData.handleForm"
        />
      </template>
      <template v-else-if="DrawerData.type === 'update'">
        <UpdatePage
          ref="updatePageRef"
          :model="WebData.info"
          @submit-success="DrawerData.handleForm"
        />
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/dialog'

import { reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppStore, LibraryStore } from '@/store'
import { getAllFile, readLibrary, readLibraryFile } from '@/api/modules'
import { uploadOpen } from '@/utils'

import {
  IconCheckCircleFill,
  IconDelete,
  IconDownload,
  IconEdit,
  IconLeft,
  IconPlus,
  IconRefresh,
  IconRight,
  IconUpload,
} from '@arco-design/web-vue/es/icon'

import CreatePage from './create.vue'
import UpdatePage from './update.vue'

import type { RouteParams } from 'vue-router'
import type { Library } from '@/api/interface'
import type { CrudType } from './type'

import { isSize } from './utils'

const appStore = AppStore()
const libraryStore = LibraryStore()

const route = useRoute()
const router = useRouter()

const createPageRef = ref()
const updatePageRef = ref()

const Apis = reactive({
  getList: async () => {
    try {
      const { code, data: res, msg } = await getAllFile(WebData.params)
      if (code === 0) {
        WebData.all[0] = [...res.dir_list, ...res.file_list]
      } else {
        appStore.setMessage({ content: msg as string, type: 'danger' })
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  getInfo: async (id: number) => {
    try {
      const {
        code,
        data: res,
        msg,
      } = ListData.isFile ? await readLibraryFile(id) : await readLibrary(id)
      if (code === 0) {
        WebData.info = res
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  params: {
    asset_package_id: 0,
    group_id: 0,
    source_type: 1,
    asset_debt_id: 0,
  } as Library.ReqListAllParams,
  total: 0,
  group_id: 0,
  all: {} as { [key: number]: any[] },
  info: {} as Library.ResReadLibraryData,
  history: window.history.state as {
    back: string
    current: string
    forward: null | string
  },
  setParams: (params: RouteParams) => {
    if (params.asset_package_id) {
      WebData.params.asset_package_id = parseInt(
        params.asset_package_id as string
      )
      WebData.params.asset_debt_id = 0
      WebData.params.source_type = 2
    }
    if (params.asset_debt_id) {
      console.log(params)
      WebData.params.asset_package_id = 0
      WebData.params.asset_debt_id = parseInt(params.asset_debt_id as string)
      WebData.params.source_type = 3
    }
    if (Object.keys(params).length === 0) {
      WebData.params.asset_package_id = 0
      WebData.params.asset_debt_id = 0
      WebData.params.source_type = 1
    }
  },
  handleUpload: async () => {
    try {
      const { file } = await uploadOpen({
        multiple: false,
      })

      if (isSize(file.size, 20, 'MegaByte')) {
        throw '上传文件最大为20MB'
      }
      const params = {
        file,
        source_type: 1,
        group_id: WebData.params.group_id,
      } as Library.ReqFileCreateParams
      if (route.params.asset_package_id) {
        params.asset_package_id = parseInt(
          route.params.asset_package_id as string
        )
        params.source_type = 2
      }
      if (route.params.asset_debt_id) {
        params.asset_debt_id = parseInt(route.params.asset_debt_id as string)
        params.source_type = 3
      }
      await libraryStore.apiLibraryFileUpload(params)
      await Apis.getList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handleDownload: async () => {
    try {
      const row = ListData.select as any
      console.log(row)
      const dir = await open({ directory: true })
      if (!dir) {
        return
      }
      await invoke('download_video', {
        url: row.download_url,
        writePath: dir,
        fileName:
          row.file_ext === '' ? row.name : `${row.name}.${row.file_ext}`,
        id: row.name,
      })
      appStore.setMessage({ content: '下载成功', type: 'success' })
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handleDelete: async () => {
    try {
      if (ListData.isFile) {
        await libraryStore.apiLibraryFileDelete(ListData.active as number)
      } else {
        await libraryStore.apiLibraryDelete(ListData.active as number)
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    } finally {
      await Apis.getList()
    }
  },
  handleDeep: async (id: number) => {
    if (!ListData.isFile) {
      ListData.handleSelect()
      router.push({ name: 'Library', query: { group_id: id } })
    }
  },
  handleBack: async () => {
    if (WebData.params.group_id !== 0) {
      router.back()
    }
  },
  handleForward: async () => {
    WebData.history.forward && router.go(1)
  },
  handleRefresh: async () => {
    await Apis.getList()
  },
})

const ListData = reactive({
  visible: false,
  active: null as number | null,
  isFile: false,
  select: {},
  handleSelect: (row?: any) => {
    if (row) {
      ListData.active = row.id
      ListData.isFile = row.file_type ? true : false
      ListData.select = row
    } else {
      ListData.active = null
    }
  },
})

const DrawerData = reactive({
  title: '文件信息',
  width: 340,
  visible: false,
  type: 'create' as CrudType,
  handleOk: () => {
    switch (DrawerData.type) {
      case 'create':
        createPageRef.value.handleSubmit()
        break
      case 'read':
        break
      case 'update':
        updatePageRef.value.handleSubmit(ListData.isFile)
        break
      default:
        break
    }
  },
  handleCancel: () => {
    DrawerData.visible = false
  },
  handleVisible: async (type: CrudType) => {
    switch (type) {
      case 'create':
        DrawerData.title = '添加文件'
        break
      case 'read':
        DrawerData.title = '文件信息'
        break
      case 'update':
        DrawerData.title = '编辑文件'
        await Apis.getInfo(ListData.active as number)
        break
      default:
        break
    }
    DrawerData.type = type
    DrawerData.visible = true
  },
  handleForm: async () => {
    try {
      await Apis.getList()
      DrawerData.handleCancel()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

watchEffect(async () => {
  WebData.history = window.history.state
  const { query, params } = route
  WebData.setParams(params)
  WebData.params.group_id = query.group_id
    ? parseInt(query.group_id as string)
    : 0
  await Apis.getList()
})
</script>

<style lang="less" scoped>
.library {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &-search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 42px;
    border-bottom: 1px solid var(--color-border-2);

    &__input {
      width: 320px;
      height: 32px;
      border-radius: 32px;
    }
  }

  &-header {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 24px;
    height: 42px;
    border-bottom: 1px solid var(--color-border-2);

    &__options {
      color: var(--color-text-4);
      font-size: 16px;

      .arco-icon {
        margin-right: 12px;

        &:last-child {
          margin-right: 0;
        }

        &.open {
          color: var(--color-text-2);
          cursor: pointer;
        }
      }
    }
  }

  &-body {
    position: relative;
    flex: 1;
    padding: 12px 24px;
    height: 0;
  }

  &-list {
    margin-left: -24px;

    &-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 24px;
      margin-bottom: 24px;
      width: 130px;
      height: 124px;
      border: 1px solid transparent;
      float: left;
      user-select: none;

      .check {
        position: absolute;
        top: 6px;
        left: 8px;
        color: #fff;
        font-size: 16px;
      }

      .content {
        flex: 1;
        display: flex;
        align-items: center;
        height: 0;

        .arco-icon {
          color: var(--color-neutral-6);
          stroke-width: 3;
        }
      }

      .title {
        display: block;
        padding: 0 24px;
        width: 100%;
        height: 32px;
        line-height: 32px;
        color: var(--color-text-2);
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }

      &:hover {
        background-color: var(--color-primary-light-1);

        .check {
          color: var(--color-primary-light-3);
        }
      }

      &.active {
        background-color: var(--color-primary-light-1);
        border-color: var(--color-primary-light-4);
        .check {
          color: var(--color-primary-light-4);
        }
      }
    }

    &-upload {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 24px;
      margin-bottom: 24px;
      width: 130px;
      height: 124px;
      border: 1px solid transparent;
      float: left;

      .content {
        flex: 1;
        display: flex;
        align-items: center;
        height: 0;

        &-upload {
          width: 64px;
          height: 64px;
          line-height: 64px;
          color: var(--color-border-3);
          font-size: 26px;
          text-align: center;
          border: 1px dashed var(--color-border-3);
          border-radius: 4px;
        }
      }

      .title {
        display: block;
        padding: 0 24px;
        width: 100%;
        height: 32px;
        line-height: 32px;
        color: var(--color-text-2);
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }

      &:hover {
        .content {
          &-upload {
            color: var(--color-primary-light-4);
            border-color: var(--color-primary-light-4);
          }
        }
      }
    }
  }

  &-point {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &-footer {
    padding: 0 24px;
    height: 43px;
    line-height: 43px;
    text-align: right;
    border-top: 1px solid var(--color-border-2);
  }
}
</style>
