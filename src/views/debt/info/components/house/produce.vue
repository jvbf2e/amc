<template>
  <div>
    <a-image-preview-group infinite>
      <template v-if="WebData.files.length > 0">
        <div class="file-list">
          <template v-for="item in WebData.files">
            <div class="file-item">
              <a-image
                :src="item.url"
                width="100%"
                height="100%"
                fit="scale-down"
              />
              <a-popconfirm
                position="tr"
                type="warning"
                content="确定删除，当前图片吗？"
                @ok="WebData.handleDelete(item)"
              >
                <div class="actives">
                  <span title="删除">
                    <IconDelete />
                  </span>
                </div>
              </a-popconfirm>
            </div>
          </template>
          <div class="file-item upload" @click="WebData.handleUpload">
            <template v-if="WebData.loading">
              <a-spin :size="32" />
            </template>
            <template v-else>
              <IconUpload />
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <a-empty />
        <div align="center">
          <a-button
            type="primary"
            size="mini"
            @click="WebData.handleUpload"
            :loading="WebData.loading"
          >
            上传产调
          </a-button>
        </div>
      </template>
    </a-image-preview-group>
  </div>
</template>

<script setup lang="ts">
import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'

import { onMounted, reactive } from 'vue'
import { fileImage, readProduce, updateProduce } from '@/api/modules'
import { IMAGE_URL } from '@/config/config'
import { AppStore } from '@/store'
import { getFileName } from '@/utils'

import { IconDelete, IconUpload } from '@arco-design/web-vue/es/icon'

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
})

const appStore = AppStore()

const Apis = reactive({
  update: async () => {
    try {
      const file = WebData.files.map((item: any) => ({
        file: item.file_path,
        name: item.file_name,
      }))
      const {
        code,
        data: res,
        msg,
      } = await updateProduce({ id: props.id, file })
      if (code === 0) {
        await Apis.read()
      } else {
        appStore.setMessage({ content: msg, type: 'danger' })
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  read: async () => {
    try {
      const { code, data: res, msg } = await readProduce(props.id)
      if (code === 0) {
        WebData.files = res.map((item: any) => ({
          file_name: item.name,
          file_path: item.file,
          url: `${IMAGE_URL}/${item.file}`,
        }))
      } else {
        appStore.setMessage({ content: msg, type: 'danger' })
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  loading: false,
  files: [] as { file_name: string; file_path: string; url: string }[],
  handleUpload: async () => {
    if (!WebData.loading) {
      try {
        const file_path = (await open({
          multiple: false,
          filters: [
            {
              name: 'Image',
              extensions: ['png', 'jpeg'],
            },
          ],
        })) as string
        WebData.loading = true
        if (file_path) {
          let file: File | undefined = undefined
          let url: string = ''
          await readBinaryFile(file_path).then((binaryData) => {
            const binaryDataArr = new Uint8Array(binaryData)
            const blob = new Blob([binaryDataArr])
            const fileName = getFileName(file_path)
            file = new File([binaryDataArr], fileName)
            url = URL.createObjectURL(blob)
          })
          const {
            code,
            data: res,
            msg,
          } = await fileImage(file as unknown as File)
          if (code === 0) {
            WebData.files.push({ ...res, url })
            await Apis.update()
          } else {
            throw msg
          }
        }
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      } finally {
        WebData.loading = false
      }
    }
  },
  handleDelete: async (row: any) => {
    WebData.files = WebData.files.filter(
      (item: any) => item.file_path !== row.file_path
    )
    await Apis.update()
  },
})

onMounted(async () => {
  await Apis.read()
})
</script>

<style lang="less" scoped>
.file {
  &-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
  }

  &-item {
    position: relative;
    margin: 6px;
    width: 128px;
    height: 128px;
    border: 1px dashed var(--color-border-3);
    border-radius: 6px;
    cursor: pointer;

    &.upload {
      text-align: center;
      line-height: 128px;
      color: var(--color-text-3);
      font-size: 24px;
      border-color: var(--color-border-3);
    }

    &:hover {
      color: var(--color-primary-light-4);
      border-color: var(--color-primary-light-4);
    }
  }
}

.actives {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 0 6px 0 8px;
  z-index: 9;

  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
