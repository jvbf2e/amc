<template>
  <a-form
    ref="formRef"
    layout="vertical"
    :model="FormData.model"
    :rules="FormData.rules"
    @submit="FormData.handleSubmit"
  >
    <a-form-item field="name" label="目录名称">
      <a-input v-model="FormData.model.name" placeholder="请输入目录名称" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { AppStore, LibraryStore } from '@/store'

import Config from './config'
import { useRoute } from 'vue-router'

const props = defineProps({
  parentId: {
    type: Number,
    default: 0,
  },
  // 文档库类型 1：企业文档库 2:资产包文档库
  type: {
    type: Number,
    default: 1,
  },
})
const Emits = defineEmits(['submitSuccess'])

const route = useRoute()

const formRef = ref()

const appStore = AppStore()
const libraryStore = LibraryStore()

const FormData = reactive({
  ...Config.form,
  handleSubmit: async () => {
    if (route.params.asset_package_id) {
      FormData.model.asset_package_id = parseInt(
        route.params.asset_package_id as string
      )
      FormData.model.source_type = 2
    }
    if (route.params.asset_debt_id) {
      FormData.model.asset_debt_id = parseInt(
        route.params.asset_debt_id as string
      )
      FormData.model.source_type = 3
    }
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await libraryStore.apiLibraryCreate(FormData.model)
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

onMounted(() => {
  FormData.model.parent_id = props.parentId
  FormData.model.source_type = props.type
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped></style>
