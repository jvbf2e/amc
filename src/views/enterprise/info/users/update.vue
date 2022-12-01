<template>
  <a-form
    ref="formRef"
    layout="vertical"
    :model="FormData.model"
    :rules="FormData.rules"
    @submit="FormData.handleSubmit()"
  >
    <a-form-item field="name" label="员工姓名">
      <a-input v-model="FormData.model.name" placeholder="请输入员工姓名" />
    </a-form-item>
    <a-form-item field="phone" label="手机号码">
      <a-input v-model="FormData.model.phone" placeholder="请输入手机号码" />
    </a-form-item>
    <a-form-item field="role_list" label="角色">
      <template v-if="FormData.model.is_admin === 2">
        <a-checkbox-group v-model="FormData.model.role_list">
          <template v-for="item in roleStore.all">
            <a-checkbox :value="item.id">{{ item.name }}</a-checkbox>
          </template>
        </a-checkbox-group>
      </template>
      <template v-else>
        <a-tag>超级管理员</a-tag>
      </template>
    </a-form-item>
    <a-form-item field="remark" label="备注">
      <a-textarea
        v-model="FormData.model.remark"
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
import lodash from 'lodash'
import { PropType, reactive, ref, watch } from 'vue'
import { UserStore, RoleStore, AppStore } from '@/store'

import type { User } from '@/api/interface'

import Config from './config'

const appStore = AppStore()
const userStore = UserStore()
const roleStore = RoleStore()

const formRef = ref()

const props = defineProps({
  model: {
    type: Object as PropType<User.ReqUpdateUserParams>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const FormData = reactive({
  model: lodash.cloneDeep(props.model as User.ReqUpdateUserParams),
  rules: Config.drawerForm.rules,
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          await userStore.apiUserUpdate(FormData.model)
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

watch(
  () => props.model,
  (model) => {
    FormData.model = model as User.ReqUpdateUserParams
  }
)

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>
