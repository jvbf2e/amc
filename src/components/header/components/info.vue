<template>
  <div class="info-wrapper">
    <div class="info">
      <div class="info-base">
        <a-avatar
          :size="58"
          trigger-type="mask"
          style="background-color: #168cff"
          @click="WebData.handleAvatar"
        >
          <template v-if="appStore.info.image === ''">
            {{ appStore.info.name.slice(0, 1) }}
          </template>
          <template v-else>
            <img :src="appStore.info.image" :alt="appStore.info.name" />
          </template>
          <template #trigger-icon>
            <IconCamera :size="24" />
          </template>
        </a-avatar>
        <div class="info-base__msg">
          <a-space :size="12">
            <h4 class="name">
              {{ appStore.info.name }}
            </h4>
            <a-tag
              :color="appStore.info.is_bind_wechat === 1 ? 'green' : 'gray'"
              size="small"
            >
              {{ `${appStore.info.is_bind_wechat === 1 ? '已' : '未'}绑定` }}
            </a-tag>
          </a-space>
          <p class="phone">{{ appStore.info.phone }}</p>
          <div class="roles">
            <template v-for="item in appStore.info.role_list">
              <a-tag>{{ item }}</a-tag>
            </template>
          </div>
        </div>
      </div>
      <div class="info-nav">
        <div class="info-nav-item">
          <span>微信设置</span>
          <template v-if="appStore.info.is_bind_wechat === 1">
            <a-popconfirm
              position="tr"
              type="warning"
              content="确定解除，绑定微信吗？"
              @ok="WebData.handleWechat"
            >
              <a-link href="javascript:;" :hoverable="false">解除绑定</a-link>
            </a-popconfirm>
          </template>
          <template v-else>
            <a-link
              href="javascript:;"
              :hoverable="false"
              @click="WebData.handleWechat"
            >
              绑定
            </a-link>
          </template>
        </div>
        <div class="info-nav-item" @click="WebData.handlePassword">
          <span>修改密码</span>
        </div>
        <div class="info-nav__divider">
          <a-divider :margin="12" />
        </div>
        <!-- <a
          class="info-nav-item"
          href="https://baidu.com"
          target="_blank"
          rel="noreferrer"
        >
          <span>帮助与客服</span>
          <IconShareInternal />
        </a> -->
        <div class="info-nav-item" @click="WebData.handlePush('Setting')">
          <span>设置</span>
        </div>
        <div class="info-nav-item" @click="WebData.handleClear">
          <span>退出登录</span>
        </div>
        <div class="info-nav__divider">
          <a-divider :margin="12" />
        </div>
        <a
          class="info-nav-item"
          href="https://qucent.cn"
          target="_blank"
          rel="noreferrer"
        >
          <span>上海圈讯科技股份有限公司</span>
          <IconShareInternal />
        </a>
      </div>
    </div>
    <a-modal
      v-model:visible="ModelData.visible"
      :title="ModelData.title"
      unmountOnClose
      @before-ok="ModelData.handleOk"
      @cancel="ModelData.handleCancel"
    >
      <CPassword ref="passwordPageRef" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { getAll, WebviewWindow } from '@tauri-apps/api/window'
import { relaunch } from '@tauri-apps/api/process'
import WebSocket from 'tauri-plugin-websocket-api'

import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppStore, HomeStore } from '@/store'
import { clearStorage, uploadOpen } from '@/utils'

import { IconCamera, IconShareInternal } from '@arco-design/web-vue/es/icon'
import CPassword from '@/views/setting/password.vue'

import type { Message } from 'tauri-plugin-websocket-api'

const Emits = defineEmits(['handleVisible'])

const appStore = AppStore()
const homeStore = HomeStore()

const router = useRouter()

const passwordPageRef = ref()

const WinData = reactive({
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
  file: null as File | null,
  handleAvatar: async () => {
    try {
      const { file } = await uploadOpen({
        multiple: false,
        filters: [
          {
            name: 'Image',
            extensions: ['png', 'jpeg'],
          },
        ],
      })
      await appStore.apiAppAvatarUpdate(file)
      await appStore.apiInfo()
    } catch (error: any) {
      throw new Error(error.message ?? error)
    }
  },
  handlePush: (name: string) => {
    Emits('handleVisible', false)
    router.push({ name })
  },
  handlePassword: () => {
    ModelData.visible = true
    Emits('handleVisible', false)
  },
  handleBrowser: (url: string) => {},
  handleWechat: async () => {
    try {
      if (appStore.info.is_bind_wechat === 1) {
        await homeStore.apiHomeWechatDelete()
        await appStore.apiInfo()
      } else {
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
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  handleClear: () => {
    clearStorage()
    relaunch()
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
      await homeStore.apiHomeWechatCreate(code)
      appStore.setMessage({ content: '绑定成功', type: 'success' })
      await appStore.apiInfo()
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const ModelData = reactive({
  visible: false,
  title: '修改密码',
  handleOk: async (done: (closed: boolean) => void) => {
    try {
      await passwordPageRef.value.handleSubmit()
      done(true)
    } catch (error) {
      done(false)
    }
  },
  handleCancel: () => {
    ModelData.visible = false
  },
})

onMounted(async () => {
  try {
    await appStore.apiInfo()
  } catch (error) {
    appStore.setMessage({ content: error as string, type: 'danger' })
  }
})
</script>

<style lang="less" scoped>
.info {
  position: relative;
  padding: 12px;
  width: 320px;
  background-color: var(--color-bg-1);
  border-radius: 12px;
  border: 1px solid var(--color-neutral-2);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  user-select: none;

  &-wrapper {
    position: fixed;
    top: 40px;
    left: 20px;
    z-index: 666;
  }

  &-base {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 12px;

    &__msg {
      margin-left: 24px;

      .name {
        margin: 0;
        color: rgb(var(--gray-10));
        font-size: 16px;
      }

      .phone {
        margin: 8px 0 12px;
        color: rgb(var(--gray-10));
        font-size: 14px;
      }
    }
  }

  &-nav {
    position: relative;
    margin-top: 12px;

    &__divider {
      padding: 0 12px;
    }

    &-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      color: rgb(var(--gray-10));
      font-size: 14px;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        background-color: var(--color-neutral-2);
      }
    }
  }
}
</style>
