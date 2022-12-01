<template>
  <div class="login-logo">
    <template v-if="AlertData.visible">
      <a-alert class="login-alert" type="error">
        {{ AlertData.text }}
      </a-alert>
    </template>
    <!-- <img src="@/assets/vue.svg" /> -->
    <span style="font-size: 20px">圈讯科技 - AMC</span>
  </div>
  <div class="login-form">
    <a-form
      ref="formRef"
      layout="vertical"
      :model="FormData.model"
      @submit="FormData.handleSubmit"
    >
      <a-form-item field="phone" hide-asterisk hide-label>
        <a-input v-model="FormData.model.phone" placeholder="手机">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" hide-asterisk hide-label>
        <a-input
          type="password"
          v-model="FormData.model.password"
          placeholder="密码"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item hide-label style="margin: 6px 0 0">
        <div class="login-form-extend">
          <a-checkbox value="1">自动登录</a-checkbox>
          <span class="login-form-pwd" @click="WebData.handlePwd">
            忘记密码?
          </span>
        </div>
      </a-form-item>
      <a-form-item hide-label style="margin: 6px 0">
        <a-button type="primary" html-type="submit" long>登录</a-button>
      </a-form-item>
      <a-form-item hide-label style="margin-bottom: 0">
        <a-checkbox v-model="WebData.isAgreement">
          我已阅读并同意
          <a-link href="javascript:;" :hoverable="false">服务协议</a-link>
          和
          <a-link href="javascript:;" :hoverable="false">隐私政策</a-link>
        </a-checkbox>
      </a-form-item>
    </a-form>
    <div>
      <a-divider orientation="center">更多方式</a-divider>
      <div align="center">
        <a-link
          :hoverable="false"
          @click="WebData.handleWx"
          style="color: #07c160"
        >
          <template #icon>
            <icon-wechat :size="24" />
          </template>
        </a-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { appWindow, WebviewWindow, getAll } from '@tauri-apps/api/window'
import WebSocket from 'tauri-plugin-websocket-api'

import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { IconUser, IconLock, IconWechat } from '@arco-design/web-vue/es/icon'
import { getStorage } from '@/utils'
import { AppStore } from '@/store'

import type { Message } from 'tauri-plugin-websocket-api'
import type { ValidatedError } from '@arco-design/web-vue'
import type { Login } from '@/api/interface'

const CODE_TEXT = '获取验证码'

const formRef = ref()

const router = useRouter()
const appStore = AppStore()

const WinData = reactive({
  createSpin: async () => {
    appWindow.hide()
    const spinWin = new WebviewWindow('spin', {
      url: '/spin?is=true',
      center: true,
      width: 480,
      height: 240,
      resizable: false,
      title: '加载 - AMC圈讯科技',
      fullscreen: false,
      transparent: true,
      decorations: false,
      alwaysOnTop: true,
    })
    spinWin.once('tauri://created', () => {
      appWindow.close()
    })
    spinWin.once('tauri://error', () => {})
  },
  createWechat: async () => {
    const wechatWin = new WebviewWindow('wechat', {
      url: `https://open.weixin.qq.com/connect/qrconnect?${WechatData.appid}&${WechatData.redirect_uri}&${WechatData.response_type}&${WechatData.scope}&state=${WechatData.id}#wechat_redirect`,
      center: true,
      width: 460,
      height: 520,
      resizable: false,
      title: '微信登录',
      fullscreen: false,
      transparent: true,
      decorations: true,
      alwaysOnTop: true,
    })
    wechatWin.once('tauri://created', () => {})
    wechatWin.once('tauri://error', () => {})
  },
})

const WebData = reactive({
  isAgreement: false,
  isLogin: true,
  f_id: 0,
  url: '',
  code: {
    timer: undefined as number | undefined,
    text: CODE_TEXT,
    second: 60,
    handleCode: async () => {
      console.log(CODE_TEXT)
      try {
        WebData.code.timer = window.setInterval(() => {
          WebData.code.text = `已发送 ${WebData.code.second--}秒`
          if (WebData.code.second === 0) {
            window.clearInterval(WebData.code.timer)
            WebData.code.text = CODE_TEXT
          }
        }, 1000)
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      }
    },
  },
  handleMessage: (message: string) => {
    AlertData.visible = true
    AlertData.text = message
  },
  handlePwd: () => {
    router.push({ name: 'loginPassword' })
  },
  handleWx: async () => {
    if (WebData.isAgreement) {
      try {
        const ws = await WebSocket.connect('wss://api.amccs.qucent.cn/wss/')
        ws.addListener((message: Message) => {
          const { data, event_name } = JSON.parse(message.data as string)
          switch (event_name) {
            case 'getFid':
              WechatData.id = data.f_id
              WinData.createWechat()
              break
            case 'getCode':
              getAll().forEach((item) => {
                if (item.label === 'wechat') {
                  item.close()
                }
              })
              WechatData.handleSubmit(data.code)
              break
            default:
              console.log(message)
              break
          }
        })
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      }
    } else {
      WebData.handleMessage('请勾选服务协议及隐私政策')
    }
  },
  handleOk: async () => {
    await WinData.createSpin()
  },
})

const WechatData = reactive({
  appid: 'appid=wx57b5fb9e8c20b571',
  redirect_uri:
    'redirect_uri=https://api.amccs.qucent.cn/web/callback/wxLoginAuth',
  response_type: 'response_type=code',
  scope: 'scope=snsapi_login',
  id: 0,
  handleSubmit: async (code: string) => {
    try {
      await appStore.apiLogin({ login_type: 'wechat', code })
      await WebData.handleOk()
    } catch (error: any) {
      WebData.handleMessage(error.message ?? error)
    }
  },
})

const FormData = reactive({
  model: {
    phone: '',
    password: '',
    login_type: 'password',
  } as Login.ReqLoginForm,
  handleSubmit: () => {
    formRef.value.validate(
      async (errors: undefined | Record<string, ValidatedError>) => {
        try {
          if (FormData.model.phone === '') {
            WebData.handleMessage('请输入手机号码')
            return false
          }
          if (FormData.model.password === '') {
            WebData.handleMessage('请输入密码')
            return false
          }
          if (!WebData.isAgreement) {
            WebData.handleMessage('请勾选服务协议及隐私政策')
            return false
          }
          await appStore.apiLogin(FormData.model)
          await WebData.handleOk()
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

onMounted(async () => {
  WebData.url = getStorage('url')
})
</script>

<style lang="less" scoped>
.login {
  &-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px 0;
    height: 60px;

    & > img {
      max-height: 100%;
    }
  }

  &-alert {
    position: absolute;
    top: 0;
    left: 50%;
    width: 80%;
    transform: translate(-50%);
  }

  &-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin: 0 auto;
    width: 300px;
    height: 340px;

    &-pwd {
      cursor: pointer;
    }

    & :deep(.arco-checkbox-label) {
      color: #666;
    }

    &-extend {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      color: #666;
    }
  }
}
</style>
