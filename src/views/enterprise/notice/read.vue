<template>
  <div class="notice-wrapper">
    <h2 class="notice-title">{{ WebData.info.title }}</h2>
    <div class="notice-content">
      {{ WebData.info.content }}
    </div>
    <template v-if="WebData.info.files.length > 0">
      <a-divider orientation="left">附件</a-divider>
      <a-space :size="6" direction="vertical" fill>
        <template v-for="item in WebData.info.files">
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
                @click="WebData.handleDownload(item)"
              >
                <IconDownload />
              </a-link>
            </a-space>
          </div>
        </template>
      </a-space>
    </template>
  </div>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/dialog'

import { onMounted, reactive } from 'vue'
import { readEnterpriseNotice } from '@/api/modules'
import { FILE_URL } from '@/config/config'
import { AppStore } from '@/store'

import { IconDownload } from '@arco-design/web-vue/es/icon'

import type { Enterprise } from '@/api/interface'

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
})

const appStore = AppStore()

const Apis = reactive({
  getInfo: async (id: number) => {
    try {
      const { code, data: res, msg } = await readEnterpriseNotice(id)
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
  info: {
    record_id: 0,
    title: '',
    content: '',
    files: [],
  } as Enterprise.ResEnterpriseNoticeReadData,
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

onMounted(async () => {
  await Apis.getInfo(props.id)
})

defineExpose({
  handleInfo: Apis.getInfo,
})
</script>

<style lang="less" scoped>
.notice {
  &-wrapper {
    padding: 0 12px;
  }

  &-title {
    color: #333;
    font-size: 16px;
  }

  &-content {
    white-space: pre-wrap;
  }
}
</style>
