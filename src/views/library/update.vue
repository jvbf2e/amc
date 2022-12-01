<template>
  <a-form
    ref="formRef"
    layout="vertical"
    :model="FormData.model"
    :rules="FormData.rules"
  >
    <a-form-item field="name" label="目录名称">
      <a-input v-model="FormData.model.name" placeholder="请输入目录名称" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import lodash from 'lodash'
import { AppStore, LibraryStore } from '@/store'

import type { PropType } from 'vue'
import type { Library } from '@/api/interface'

import Config from './config'
import { useRoute } from 'vue-router'

const props = defineProps({
  model: {
    type: Object as PropType<Library.ReqUpdateParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const route = useRoute()

const formRef = ref()

const appStore = AppStore()
const libraryStore = LibraryStore()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Library.ReqUpdateParams),
  rules: Config.form.rules,
  handleSubmit: (isFile: boolean) => {
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
          if (isFile) {
            await libraryStore.apiLibraryFileUpdate(FormData.model)
          } else {
            await libraryStore.apiLibraryUpdate(FormData.model)
          }
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
