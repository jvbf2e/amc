<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item field="title" label="标题">
          <a-input v-model="FormData.model.title" placeholder="请输入标题" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="this_week_progress" label="事件内容">
          <a-textarea
            v-model="FormData.model.content"
            placeholder="请输入本周进展、遇到问题及解决方案"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="next_week_plan" label="消息通知">
          <a-space direction="vertical" :size="12">
            <a-checkbox
              :model-value="WebData.checkbox.all"
              :indeterminate="WebData.checkbox.indeterminate"
              @change="WebData.checkbox.handleChangeAll"
            >
              <template #checkbox="{ checked }">
                <a-tag color="arcoblue" :checked="checked" checkable bordered>
                  全部
                </a-tag>
              </template>
            </a-checkbox>
            <a-checkbox-group
              v-model="FormData.model.employee_ids"
              @change="WebData.checkbox.handleChange"
            >
              <template v-for="item in WebData.employee_list">
                <a-checkbox :value="item.id">
                  <template #checkbox="{ checked }">
                    <a-tag
                      color="arcoblue"
                      :checked="checked"
                      checkable
                      bordered
                    >
                      {{ item.name }}
                    </a-tag>
                  </template>
                </a-checkbox>
              </template>
            </a-checkbox-group>
          </a-space>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="next_week_plan" label="附件">
          <CUpload
            :data="WebData.file_list"
            @upload="WebData.handleUpload"
            @delete="WebData.handleDelete"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { AppStore, DebtStore } from '@/store'
import { getPackageLogEmployeeList, uploadPackageLog } from '@/api/modules'

import CUpload from './c-upload.vue'
import { FileItemType } from './type'

const Emits = defineEmits(['submitSuccess'])

const props = defineProps({
  debtId: {
    request: true,
    type: Number,
    default: 0,
  },
  packageName: {
    request: true,
    type: String,
    default: '',
  },
})

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const Apis = reactive({
  getEmployeeList: async () => {
    try {
      const { code, data: res, msg } = await getPackageLogEmployeeList()
      if (code === 0) {
        WebData.employee_list = res
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  upload: async (file: File[]) => {
    try {
      const { code, data: res, msg } = await uploadPackageLog(file)
      if (code === 0) {
        WebData.file_list.push({
          name: res[0].file_name,
          file: res[0].file_path,
        })
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  file_list: [] as any[],
  employee_list: [] as any[],
  checkbox: {
    all: false,
    indeterminate: false,
    handleChangeAll: (
      value: boolean | (string | number | boolean)[],
      ev: Event
    ) => {
      WebData.checkbox.indeterminate = false
      if (value) {
        WebData.checkbox.all = true
        FormData.model.employee_ids = WebData.employee_list.map(
          (item: any) => item.id
        )
      } else {
        WebData.checkbox.all = false
        FormData.model.employee_ids = []
      }
    },
    handleChange: (values: (string | number | boolean)[], ev: Event) => {
      if (values.length === WebData.employee_list.length) {
        WebData.checkbox.all = true
        WebData.checkbox.indeterminate = false
      } else if (values.length === 0) {
        WebData.checkbox.all = false
        WebData.checkbox.indeterminate = false
      } else {
        WebData.checkbox.all = false
        WebData.checkbox.indeterminate = true
      }
    },
  },
  handleUpload: (file: any) => {
    WebData.file_list.push(file)
  },
  handleDelete: (index: number, row: FileItemType) => {
    WebData.file_list.splice(index, 1)
  },
})

const FormData = reactive({
  model: {
    asset_debt_id: props.debtId,
    title: '',
    issue_date: '',
    content: '',
    file: [] as { name: string; file: string }[],
    employee_ids: [] as number[],
  },
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          FormData.model.file = WebData.file_list
          await debtStore.apiDebtLogCreate(FormData.model)
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
  Apis.getEmployeeList()
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped>
.upload {
  display: inline-block;
  max-width: 100%;
  cursor: pointer;

  &-list {
    &-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 12px;
    }
  }
}
</style>
