<template>
  <div class="login-password">
    <div class="login-password__header">
      <span class="revert" @click="WebData.handlePush">
        <a-space :size="4">
          <IconLeft />
          返回
        </a-space>
      </span>
    </div>
    <template v-if="AlertData.visible">
      <a-alert class="login-alert" type="error">
        {{ AlertData.text }}
      </a-alert>
    </template>
    <div class="login-password__body">
      <h1 class="title">忘记密码</h1>
      <a-form
        ref="formRef"
        layout="vertical"
        :model="FormData.model"
        @submit="FormData.handleSubmit"
      >
        <a-form-item field="phone" hide-asterisk hide-label>
          <a-input v-model="FormData.model.phone" placeholder="手机号码">
            <template #prefix>
              <IconPhone />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="new_password" hide-asterisk hide-label>
          <a-input
            type="password"
            v-model="FormData.model.new_password"
            placeholder="新密码"
          >
            <template #prefix>
              <IconLock />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="new_password_repeat" hide-asterisk hide-label>
          <a-input
            type="password"
            v-model="FormData.model.new_password_repeat"
            placeholder="新密码重复"
          >
            <template #prefix>
              <IconLock />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="code" hide-asterisk hide-label>
          <a-input
            v-model="FormData.model.code"
            placeholder="验证码"
            :disabled="WebData.isCode"
          >
            <template #prefix>
              <IconCode />
            </template>
            <template #suffix>
              <div class="code">
                <template v-if="WebData.num < 60">
                  {{ `${WebData.num} 秒` }}
                </template>
                <template v-else>
                  <a-link
                    href="javascript:;"
                    @click="WebData.handleCode"
                    :disabled="validatePhone"
                  >
                    获取验证码
                  </a-link>
                </template>
              </div>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item hide-label style="margin: 6px 0">
          <a-button type="primary" html-type="submit" long>确定</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IconCode,
  IconLeft,
  IconLock,
  IconPhone,
} from '@arco-design/web-vue/es/icon'
import { AppStore } from '@/store'
import { forgotPassword, getLoginCode } from '@/api/modules'

import type { ValidatedError } from '@arco-design/web-vue'
import type { Login } from '@/api/interface'

const formRef = ref()

const appStore = AppStore()

const router = useRouter()

const WebData = reactive({
  isCode: true,
  time: null as null | NodeJS.Timer,
  num: 60,
  handleCode: async () => {
    try {
      WebData.isCode = false
      const { code, msg } = await getLoginCode({
        phone: FormData.model.phone,
        type: 1,
      })
      if (code === 0) {
        WebData.time = setInterval(() => {
          WebData.num--
          if (WebData.num === 0) {
            clearInterval(<NodeJS.Timeout>WebData.time)
            WebData.num = 60
          }
        }, 1000)
      } else {
        appStore.setMessage({ content: msg, type: 'danger' })
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handlePush: () => {
    router.push({ name: 'login' })
  },
  handleMessage: (message: string) => {
    AlertData.visible = true
    AlertData.text = message
  },
})

const FormData = reactive({
  model: {
    phone: '',
    new_password: '',
    new_password_repeat: '',
    code: '',
  } as Login.ReqForgotPasswordParams,
  handleSubmit: () => {
    formRef.value.validate(
      async (errors: undefined | Record<string, ValidatedError>) => {
        try {
          if (FormData.model.phone === '') {
            WebData.handleMessage('请输入手机号码')
            return false
          }
          if (FormData.model.new_password === '') {
            WebData.handleMessage('请输入新密码')
            return false
          }
          if (FormData.model.new_password_repeat === '') {
            WebData.handleMessage('请输入新密码重复')
            return false
          }
          if (
            FormData.model.new_password !== FormData.model.new_password_repeat
          ) {
            WebData.handleMessage('密码不一致')
            return false
          }
          if (FormData.model.code === '') {
            WebData.handleMessage('请输入验证码')
            return false
          }
          const { code, msg } = await forgotPassword(FormData.model)
          if (code === 0) {
            router.push({ name: 'login' })
          } else {
            WebData.handleMessage(msg)
          }
        } catch (error: any) {
          WebData.handleMessage(error.message ?? error)
        }
      }
    )
  },
})

const AlertData = reactive({
  visible: false,
  text: '',
  duration: 1.6,
})

const validatePhone = computed(() => {
  const re = /^1[3-9]{1}[0-9]{9}$/
  return FormData.model.phone === '' ? true : !re.test(FormData.model.phone)
})
</script>

<style lang="less" scoped>
.login-password {
  position: relative;
  height: 100%;

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 12px;
    height: 30px;
    line-height: 30px;
    transform: translateY(-30px);

    & > .revert {
      display: inline-block;
      padding-top: 4px;
      color: var(--color-text-3);
      cursor: pointer;

      &:hover {
        color: var(--color-text-1);
      }
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 300px;
    height: 100%;

    & > .title {
      margin: 0 auto 48px;
      font-size: 18px;
      font-weight: initial;
    }

    .code {
      display: inline-block;
      width: 80px;
      text-align: center;
    }
  }
}

.login {
  &-alert {
    position: absolute;
    top: 0;
    left: 50%;
    width: 80%;
    transform: translate(-50%, 10px);
  }
}
</style>
