<template>
  <div class="upload-wrapper">
    <span class="upload">
      <a-button type="primary" size="mini" @click="WebData.handleUpload">
        <template #icon>
          <IconUpload />
        </template>
        点击上传
      </a-button>
    </span>
    <div class="upload-list">
      <template v-for="(item, index) in props.data">
        <div class="upload-list-item">
          <div class="content">
            <a-space :size="12">
              <template v-if="item.type === 'image'">
                <IconFileImage />
              </template>
              <template v-else-if="item.type === 'video'">
                <IconFileVideo />
              </template>
              <template v-else>
                <IconFile />
              </template>
              <a-link href="javascript:;" :hoverable="false">
                {{ item.name }}
              </a-link>
            </a-space>
          </div>
          <span class="operation">
            <a-link
              href="javascript:;"
              status="danger"
              @click="WebData.handleDelete(index, item)"
            >
              <IconDelete />
            </a-link>
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'

import { PropType, reactive } from 'vue'
import {
  IconDelete,
  IconFile,
  IconFileImage,
  IconFileVideo,
  IconUpload,
} from '@arco-design/web-vue/es/icon'
import { uploadPackageLog } from '@/api/modules'
import { AppStore } from '@/store'

import type { FileItemType } from './type'

import { getFileName, isSize } from './utils'

const Emits = defineEmits(['upload', 'delete'])

const props = defineProps({
  data: {
    type: Array as PropType<FileItemType[]>,
    default: [],
  },
})

const appStore = AppStore()

const Apis = reactive({
  upload: async (file: File[]) => {
    try {
      const { code, data: res, msg } = await uploadPackageLog(file)
      if (code === 0) {
        Emits('upload', {
          name: res[0].file_name,
          file: res[0].file_path,
          type: res[0].file_type ?? 'image',
        })
      } else {
        throw msg
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  handleUpload: async () => {
    try {
      const file_path = (await open({
        multiple: false,
      })) as string
      if (file_path) {
        const file = await readBinaryFile(file_path).then((binaryData) => {
          const binaryDataArr = new Uint8Array(binaryData)
          return new File([binaryDataArr], getFileName(file_path))
        })
        if (isSize(file.size, 20, 'MegaByte')) {
          throw '上传文件最大为20MB'
        } else {
          await Apis.upload([file])
        }
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handleDelete: (index: number, row: FileItemType) => {
    Emits('delete', index, row)
  },
})
</script>

<style lang="less" scoped>
.upload {
  display: inline-block;
  max-width: 100%;
  cursor: pointer;

  &-wrapper {
    width: 100%;
  }
  &-list {
    &-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 12px;

      & > .content {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 8px 10px 8px 12px;
        overflow: hidden;
        font-size: 14px;
        background-color: var(--color-fill-1);
        border-radius: var(--border-radius-small);
        transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);
      }

      & > .operation {
        margin-left: 12px;
        color: var(--color-text-2);
        font-size: 12px;
      }
    }
  }
}
</style>
