<template>
  <div class="setting no_drag">
    <div class="setting__card">
      <h3 class="setting__card-title">基础信息</h3>
      <div class="setting__card-body">
        <a-form
          ref="formRef"
          layout="vertical"
          :model="WebData.form.model"
          @submit="WebData.form.handleSubmit()"
        >
          <a-form-item field="logo_url" label="企业LOGO">
            <div class="logo" @click="WebData.handleFile">
              <img :src="WebData.logo_url" height="60" />
            </div>
          </a-form-item>
          <a-form-item field="name" label="企业名称">
            <a-input
              v-model="WebData.form.model.name"
              placeholder="请输入企业名称"
              style="width: 480px"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">更新信息</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'

import { onMounted, reactive } from 'vue'
import { AppStore, EnterpriseStore } from '@/store'
import { fileImage } from '@/api/modules'

const appStore = AppStore()
const enterpriseStore = EnterpriseStore()

const WebData = reactive({
  logo_url: enterpriseStore.info.logo_url.url,
  file: null as File | null,
  form: {
    model: {
      logo_url: enterpriseStore.info.logo_url.uri,
      name: enterpriseStore.info.enterprise_name,
    },
    handleSubmit: async () => {
      try {
        await enterpriseStore.apiEnterpriseEdit(WebData.form.model)
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      }
    },
  },
  handleFile: async () => {
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
      if (file_path) {
        await readBinaryFile(file_path).then((binaryData) => {
          const binaryDataArr = new Uint8Array(binaryData)
          const blob = new Blob([binaryDataArr])
          const fileName = getFileName(file_path)
          WebData.file = new File([binaryDataArr], fileName)
          WebData.logo_url = URL.createObjectURL(blob)
        })
        const { code, data: res, msg } = await fileImage(WebData.file as File)
        if (code === 0) {
          WebData.form.model.logo_url = res.file_path
        } else {
          throw msg
        }
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

function getFileName(path: string) {
  const rows = path.split('\\')
  return rows[rows.length - 1]
}

onMounted(() => {})
</script>

<style lang="less" scoped>
.setting {
  position: relative;

  &__card {
    position: relative;

    & + & {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px dashed var(--color-border-2);
    }

    &-title {
      color: #333;
      font-size: 14px;
    }

    &-body {
      padding: 24px;
    }
  }

  .logo {
    position: relative;
    min-width: 240px;
    height: 80px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }

    & > img {
      height: 100%;
    }
  }
}
</style>
