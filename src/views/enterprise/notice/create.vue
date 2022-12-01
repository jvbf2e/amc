<template>
  <a-form
    ref="formRef"
    layout="vertical"
    :model="FormData.model"
    :rules="FormData.rules"
    @submit="FormData.handleSubmit"
  >
    <a-form-item field="title" label="标题">
      <a-input v-model="FormData.model.title" placeholder="请输入标题" />
    </a-form-item>
    <a-form-item field="content" label="内容">
      <a-textarea
        v-model="FormData.model.content"
        placeholder="请输入内容"
        :auto-size="{
          minRows: 2,
        }"
      />
    </a-form-item>
    <a-form-item field="files" label="附件">
      <CUpload
        :data="WebData.file_list"
        @upload="WebData.handleUpload"
        @delete="WebData.handleDelete"
      />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AppStore, EnterpriseStore } from '@/store'

import Config from './config'

import CUpload from './c-upload.vue'

const Emits = defineEmits(['submitSuccess'])

const formRef = ref()

const enterpriseStore = EnterpriseStore()
const appStore = AppStore()

const WebData = reactive({
  file_list: [] as any[],
  handleUpload: (file: any) => {
    WebData.file_list.push(file)
  },
  handleDelete: (index: number) => {
    WebData.file_list.splice(index, 1)
  },
})

const FormData = reactive({
  ...Config.form,
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          FormData.model.file = WebData.file_list
          await enterpriseStore.apiEnterpriseNoticeCreate(FormData.model)
          FormData.handleReset()
          Emits('submitSuccess')
        }
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      }
    })
  },
  handleReset: () => {
    formRef.value.resetFields()
  },
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped></style>
