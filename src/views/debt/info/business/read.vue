<template>
  <div class="business-read">
    <div v-if="props.loading" class="business-read__loading">
      <a-spin tip="查询中..." />
    </div>
    <div class="business-read-header">
      <span>{{ props.name }}</span>
      <a-popconfirm
        position="tr"
        type="warning"
        content="您确认要查询个人工商吗？（收费项目）"
        @ok="WebData.handleCreate"
      >
        <a-button type="primary" size="mini"> 再次获取 </a-button>
      </a-popconfirm>
    </div>
    <a-scrollbar
      outer-class="business-read-body"
      style="height: 100%; overflow-x: hidden; overflow-y: auto"
    >
      <div class="business-read-list">
        <template v-for="item in WebData.list">
          <TablePage
            :name="item.name"
            :columns="item.columns"
            :data="item.data"
            :operate="item.operate"
            :color="item.color"
            @open="WebData.handleOpen"
          />
        </template>
      </div>
    </a-scrollbar>
    <a-modal
      :title="ModalData.title"
      :visible="ModalData.visible"
      :width="ModalData.width"
      title-align="start"
      :footer="false"
      @cancel="ModalData.handleCancel"
    >
      <FormPage :type="ModalData.type" :model="ModalData.model" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppStore } from '@/store'
import { readDataBusiness } from '@/api/modules'

import type { Data } from '@/api/interface'
import type { Type } from './components/form/types'

import TablePage from './components/table/index.vue'
import FormPage from './components/form/index.vue'

import Config from './config'

const Emits = defineEmits(['handleCreate'])
const props = defineProps({
  name: {
    type: String,
  },
  model: {
    type: Object,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()

const appStore = AppStore()

const Apis = reactive({
  getInfo: async (params: Data.ReqReadBusinessParams) => {
    try {
      const { code, data: res, msg } = await readDataBusiness(params)
      if (code === 0) {
        if (res.status === 1) {
          ModalData.model = res.data
        } else {
          appStore.setMessage({ content: '查无数据', type: 'warning' })
        }
      } else {
        appStore.setMessage({ content: msg, type: 'danger' })
      }
    } catch (error) {
      appStore.setMessage({ content: error as string, type: 'danger' })
    }
  },
})

const WebData = reactive({
  loading: false,
  ...Config,
  handleOpen: async (data: any) => {
    console.log(route)
    const { name, row } = data
    const type = name === '裁判文书' ? 'cpws' : 'ktgg'
    ModalData.title = name
    if (type === 'cpws') {
      await Apis.getInfo({
        asset_debt_id: parseInt(route.params.asset_debt_id as string),
        documents_id: row.id,
      })
    } else {
      ModalData.model = data.row
    }
    ModalData.handleVisible(type)
  },
  handleCreate: () => {
    Emits('handleCreate')
  },
})

const ModalData = reactive({
  title: '',
  visible: false,
  width: 860,
  type: 'cpws' as Type,
  model: {},
  handleVisible: (type: Type) => {
    ModalData.type = type
    ModalData.visible = true
  },
  handleCancel: () => {
    ModalData.visible = false
  },
})

onMounted(async () => {
  WebData.loading = true
  setTimeout(() => {
    WebData.list[0].data = props.model?.shareholderInfo ?? []
    WebData.list[1].data = props.model?.legalPersonInfo ?? []
    WebData.list[2].data = props.model?.execInfo ?? []
    WebData.list[3].data = props.model?.openCourtSession.result ?? []
    WebData.list[4].data = props.model?.refereeDocuments.result ?? []
    WebData.loading = false
  }, 1000)
})
</script>

<style lang="less" scoped>
.business-read {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 99;
  }

  &-header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 54px;
    line-height: 54px;
    font-size: 18px;
    background-color: var(--color-neutral-2);
    // border-bottom: 1px solid var(--color-border-3);
  }

  &-body {
    flex: 1;
    height: 0;
  }

  &-list {
    padding: 48px 0;
  }
}
</style>
