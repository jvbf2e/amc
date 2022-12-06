<template>
  <div class="c-card">
    <div class="c-card__title">最新公告</div>
    <div class="c-card-body">
      <div class="list" v-if="homeStore.notice.length > 0">
        <template v-for="item in homeStore.notice">
          <div class="list-item" @click="ModalData.handleVisible(item)">
            <template v-if="item.status_view === 1">
              <div class="badge">
                <a-badge dot :count="1" />
              </div>
            </template>
            <div class="title arco-auto-tooltip">{{ item.title }}</div>
          </div>
        </template>
      </div>
      <template v-else>
        <a-empty />
      </template>
    </div>
    <a-modal
      :visible="ModalData.visible"
      :title="ModalData.title"
      :width="ModalData.width"
      :footer="false"
      title-align="start"
      @cancel="ModalData.handleCancel"
    >
      <h2 class="notice-title">{{ ModalData.info.title }}</h2>
      <div class="notice-body" v-html="ModalData.info.content"></div>
      <template v-if="ModalData.info.files.length > 0">
        <a-divider orientation="left">附件</a-divider>
        <a-space :size="6" direction="vertical" fill>
          <template v-for="item in ModalData.info.files">
            <div class="file-item">
              <a-space :size="12">
                <span>
                  <template v-if="item.type === 'image'">
                    <IconFont type="icon-image" :size="20" />
                  </template>
                  <template v-else-if="item.type === 'video'">
                    <IconFont type="icon-video" :size="20" />
                  </template>
                  <template v-else>
                    <IconFont type="icon-other" :size="20" />
                  </template>
                </span>
                <span class="name">{{ item.name }}</span>
                <a-link
                  href="javascript:;"
                  :hoverable="false"
                  @click="ModalData.handleDownload(item)"
                >
                  <IconDownload />
                </a-link>
              </a-space>
            </div>
          </template>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/dialog'

import { onMounted, reactive } from 'vue'
import { AppStore, HomeStore } from '@/store'
import { getHomeNoticeRead } from '@/api/modules'

import type { Home } from '@/api/interface'
import { IconDownload } from '@arco-design/web-vue/es/icon'
import { FILE_URL } from '@/config/config'

const appStore = AppStore()
const homeStore = HomeStore()

const Apis = reactive({
  read: async (id: number) => {
    try {
      const { code, data: res, msg } = await getHomeNoticeRead(id)
      if (code === 0) {
        ModalData.info = res
      } else {
        appStore.setMessage({ content: msg, type: 'danger' })
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const ModalData = reactive({
  visible: false,
  title: '公告详情',
  width: 680,
  info: {
    record_id: 0,
    title: '',
    content: '',
    files: [],
  } as Home.ResReadHomeNotice,
  handleVisible: async (row: any) => {
    await Apis.read(row.record_id)
    await homeStore.apiHomeNoticeList()
    ModalData.visible = true
  },
  handleCancel: () => {
    ModalData.info = {
      record_id: 0,
      title: '',
      content: '',
      files: [],
    }
    ModalData.visible = false
  },
  handleDownload: async (row: any) => {
    try {
      const dir = await open({ directory: true })
      if (!dir) {
        return
      }
      await invoke('download_video', {
        url: `${FILE_URL}/${row.file}`,
        writePath: dir,
        fileName: row.name,
        id: row.name,
      })
      appStore.setMessage({ content: '下载成功', type: 'success' })
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

onMounted(() => {
  setTimeout(async () => {
    try {
      await homeStore.apiHomeNoticeList()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  }, 500)
})
</script>

<style lang="less" scoped>
.c-card {
  position: relative;
  width: 100%;
  background-color: var(--color-bg-1);
  border-radius: 4px;
  overflow: hidden;

  & + & {
    margin-top: 20px;
  }

  &__title {
    position: relative;
    padding: 24px;
    color: rgb(var(--gray-10));
    font-size: 14px;
    font-weight: bold;
  }

  &-body {
    position: relative;
    padding: 0 24px 24px;
  }
}

.list {
  &-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 6px 0;
    cursor: pointer;

    &:hover {
      background-color: rgb(var(--gray-2));
    }

    & + & {
      margin-top: 6px;
    }

    & > .badge {
      flex: 14px 0 0;
      display: flex;
      justify-content: end;
    }

    & > .title {
      padding-left: 6px;
      color: rgb(var(--gray-10));
    }
  }
}

.notice {
  &-title {
    margin: 0 auto;
    width: 80%;
    color: var(--color-text-1);
    font-size: 18px;
    font-weight: initial;
    text-align: center;
  }

  &-body {
    padding: 24px 0 48px;
    color: var(--color-text-2);
    font-size: 14px;
    white-space: pre-wrap;
  }
}

.file-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
  height: 30px;
  color: var(--color-text-2);

  & .name {
    font-size: 14px;
  }

  &:hover {
    background-color: var(--color-fill-1);
  }
}
</style>
