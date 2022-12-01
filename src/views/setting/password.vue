<template>
  <div class="password">
    <template v-if="AlertData.visible">
      <a-alert class="password-alert" type="error">
        {{ AlertData.text }}
      </a-alert>
    </template>
    <a-form
      ref="formRef"
      :model="FormData.model"
      :rules="FormData.rules"
      layout="vertical"
      @submit="FormData.handleSubmit"
    >
      <a-form-item field="old_password" label="旧密码">
        <a-input
          v-model="FormData.model.old_password"
          placeholder="请输入旧密码"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="new_password" label="新密码">
        <a-input-password
          v-model="FormData.model.new_password"
          placeholder="请输入新密码"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="new_password_repeat" hide-label hide-asterisk>
        <a-input-password
          v-model="FormData.model.new_password_repeat"
          placeholder="重复密码"
          allow-clear
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { relaunch } from '@tauri-apps/api/process'

import { reactive, ref } from 'vue'
import { HomeStore } from '@/store'

import type { FieldRule, ValidatedError } from '@arco-design/web-vue'
import { clearStorage } from '@/utils'

const homeStore = HomeStore()

const formRef = ref()

function validatorPwd(
  value: any | undefined,
  callback: (error?: string) => void
) {
  if (FormData.model.new_password !== value) {
    callback('请输入正确的密码')
  }
}

const FormData = reactive({
  model: {
    old_password: '',
    new_password: '',
    new_password_repeat: '',
  },
  rules: {
    old_password: [{ required: true, message: '请输入旧密码' }] as FieldRule[],
    new_password: [{ required: true, message: '请输入新密码' }] as FieldRule[],
    new_password_repeat: [
      { required: true, validator: validatorPwd },
    ] as FieldRule<any>[],
  },
  handleSubmit: async () => {
    return new Promise((resolve, reject) => {
      formRef.value.validate(
        async (errors: undefined | Record<string, ValidatedError>) => {
          try {
            if (errors) {
              throw new Error(Object.values(errors)[0].message)
            } else {
              await homeStore.apiHomePasswordUpdate(FormData.model)
              clearStorage()
              relaunch()
              resolve(undefined)
            }
          } catch (error: any) {
            const err = error.message ?? error
            AlertData.visible = true
            AlertData.text = err
            reject(err)
          }
        }
      )
    })
  },
})

const AlertData = reactive({
  visible: false,
  text: '',
  duration: 1.6,
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
})
</script>

<style lang="less" scoped>
.password {
  position: relative;
  margin: 36px auto;
  width: 360px;

  &-alert {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50px);
  }
}
</style>
