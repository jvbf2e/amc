<template>
  <LayoutPage>
    <template v-if="WebData.status === 0">
      <div class="business-info">
        <div class="business-info__aside">
          <h3 class="icon">
            <IconIdcard />
            找企业
          </h3>
          <h1 class="title">
            <span class="title-primary">1.6亿</span>市场主体数据
          </h1>
          <p class="msg">
            蓝象顶级个人工商风险，公司诉讼信息一一展示，圈内顶级接口，10000+次访问
          </p>
          <div class="options">
            <a-button type="primary" @click="WebData.handleCreate">
              一键获取
            </a-button>
          </div>
        </div>
        <div class="business-info__img">
          <a-image :src="BusinessImage" width="100%" />
        </div>
      </div>
    </template>
    <template v-else-if="WebData.status === 1">
      <ReadPage
        :name="WebData.params.name"
        :model="WebData.model"
        :loading="WebData.loading"
        @handle-create="WebData.handleCreate"
      />
    </template>
    <template v-else>
      <a-empty>
        <template #image>
          <IconExclamationCircleFill />
        </template>
        No data, please reload!
      </a-empty>
    </template>
  </LayoutPage>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { createDebtBusiness, readDebtBusiness } from '@/api/modules'
import { AppStore } from '@/store'

import {
  IconExclamationCircleFill,
  IconIdcard,
} from '@arco-design/web-vue/es/icon'

import LayoutPage from '../components/layout.vue'

import BusinessImage from '@/assets/image/business.png'

import ReadPage from './read.vue'

const appStore = AppStore()

const { query } = useRoute()

const Apis = reactive({
  create: async () => {
    try {
      const {
        code,
        data: res,
        msg,
      } = await createDebtBusiness(parseInt(query.asset_debt_id as string))
      if (code === 0) {
        WebData.status = res.status
        WebData.params = res.params
        WebData.model = res.data
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
  read: async () => {
    try {
      const {
        code,
        data: res,
        msg,
      } = await readDebtBusiness(parseInt(query.asset_debt_id as string))
      if (code === 0) {
        WebData.status = res.status
        WebData.params = res.params
        WebData.model = res.data
      } else {
        throw msg
      }
    } catch (error: any) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  status: 0,
  loading: false,
  params: { name: '' },
  model: {},
  handleCreate: async () => {
    WebData.loading = true
    await Apis.create()
    setTimeout(() => (WebData.loading = false), 2000)
  },
})

onMounted(async () => {
  await Apis.read()
})
</script>

<style lang="less" scoped>
.business {
  position: relative;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;

  &-info {
    display: flex;
    flex-direction: row;
    height: calc(100% - 60px);

    &__aside {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30%;
      padding: 0 24px;

      & > * {
        margin: 0;
        padding: 0;
      }

      & > .icon {
        margin-bottom: 12px;
        line-height: 24px;
        color: #333;
        font-size: 16px;
        font-weight: 500;

        .arco-icon {
          padding: 4px;
          color: var(--color-white);
          background-image: linear-gradient(135deg, #52b0fe 10%, #1769fc 100%);
          border-radius: 4px;
        }
      }

      & > .title {
        margin-bottom: 12px;
        color: #333;
        font-size: 24px;
        font-weight: 500;

        .title-primary {
          color: rgb(var(--blue-6));
        }
      }

      & > .msg {
        margin-bottom: 24px;
        color: #666;
        line-height: 1.6em;
      }

      & > .options {
        padding-bottom: 84px;
      }
    }

    &__img {
      flex: 1;
      display: flex;
      align-items: center;
      padding-right: 24px;
      width: 0;
    }
  }
}
</style>
