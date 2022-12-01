<template>
  <a-form
    ref="formRef"
    layout="vertical"
    :model="FormData.form.model"
    :rules="FormData.form.rules"
  >
    <a-form-item field="name" label="员工姓名">
      <a-input
        v-model="FormData.form.model.name"
        placeholder="请输入员工姓名"
      />
    </a-form-item>
    <a-form-item field="phone" label="手机号码">
      <a-input
        v-model="FormData.form.model.phone"
        placeholder="请输入手机号码"
      />
    </a-form-item>
    <a-form-item field="password" label="登录密码">
      <a-input
        v-model="FormData.form.model.password"
        placeholder="请输入登录密码"
      />
    </a-form-item>
    <a-form-item field="role_list" label="角色">
      <a-checkbox-group v-model="FormData.form.model.role_list">
        <template v-for="item in roleStore.all">
          <a-checkbox :value="item.id">{{ item.name }}</a-checkbox>
        </template>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item field="remark" label="备注">
      <a-textarea
        v-model="FormData.form.model.remark"
        placeholder="请输入备注"
        :max-length="{ length: 255, errorOnly: true }"
        :auto-size="{
          minRows: 2,
        }"
      />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AppStore, RoleStore, UserStore } from '@/store'

import Config from './config'

const appStore = AppStore()
const userStore = UserStore()
const roleStore = RoleStore()

const Emits = defineEmits(['submitSuccess'])

const formRef = ref()

const FormData = reactive({
  form: {
    ...Config.drawerForm,
    handleSubmit: () => {
      formRef.value.validate(async (errors: any) => {
        try {
          if (!errors) {
            await userStore.apiUserCreate(FormData.form.model)
            FormData.form.handleReset()
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
  },
})

defineExpose({
  handleSubmit: FormData.form.handleSubmit,
  handleReset: FormData.form.handleReset,
})
</script>

<style lang="less" scoped></style>
