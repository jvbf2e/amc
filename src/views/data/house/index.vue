<template>
  <a-row :gutter="24" :class="['data-house', { center: !WebData.visible }]">
    <a-col :span="12" class="data-house-form">
      <a-form
        ref="formRef"
        :model="FormData.model"
        layout="vertical"
        @submit="FormData.handleSubmit"
      >
        <a-form-item field="floor" label="所在楼层">
          <a-input-number
            v-model="FormData.model.floor"
            placeholder="请输入所在楼层"
          />
        </a-form-item>
        <a-form-item field="floor" label="总楼层">
          <a-input-number
            v-model="FormData.model.total_floor"
            placeholder="请输入总楼层"
          />
        </a-form-item>
        <a-form-item field="floor" label="房屋朝向">
          <a-select
            v-model="FormData.model.toward"
            placeholder="请选择房屋朝向"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'toward')[0].children"
            >
              <a-option :value="item.key" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
        <a-form-item>
          <div align="center" style="width: 100%">
            <a-button
              type="primary"
              html-type="submit"
              :loading="WebData.loading"
            >
              立即评估
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-col>
    <template v-if="WebData.visible">
      <a-col :span="12" class="data-house-body">
        <div class="estimate-info">
          <h2 class="estimate-info__title">{{ WebData.info.title }}</h2>
          <p class="estimate-info__address">{{ WebData.info.address }}</p>
          <div class="estimate-info__money-wrap">
            <div class="blue">
              <p class="estimate-info__money-title">房屋总价(万元)</p>
              <p class="estimate-info__money">{{ WebData.info.total_price }}</p>
            </div>
            <div>
              <p class="estimate-info__money-title">房屋单价(元/㎡)</p>
              <p class="estimate-info__money">{{ WebData.info.price }}</p>
              <div class="estimate-info__money-msg">
                <p>评估公司：{{ WebData.info.source }}</p>
                <p>评估时间：{{ WebData.info.time?.substr(0, 10) }}</p>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </template>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { createDataHouse } from '@/api/modules'
import { AppStore } from '@/store'

import type { Data } from '@/api/interface'

const Emits = defineEmits(['handleSubmit'])
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  debtId: {
    type: Number,
    required: true,
  },
})

const formRef = ref()

const appStore = AppStore()

const Apis = reactive({
  create: async (params: Data.ReqCreateHouseParams) => {
    try {
      const { code, data: res, msg } = await createDataHouse(params)
      if (code === 0) {
        WebData.info.title = res.data.communityName
        WebData.info.address = res.data.house_location
        WebData.info.total_price = res.data.enquiry_total_price
        WebData.info.price = res.data.enquiry_price
        WebData.info.source = res.enquiry_source
        WebData.info.time = res.query_time
      } else {
        throw msg
      }
    } catch (error) {
      throw error
    }
  },
})

const WebData = reactive({
  visible: false,
  loading: false,
  info: {
    title: '',
    address: '',
    total_price: undefined,
    price: undefined,
    source: '',
    time: '',
  },
})

const FormData = reactive({
  model: {
    asset_debt_house_id: 0,
    asset_debt_id: 0,
    floor: 0,
    total_floor: 0,
    toward: '',
  },
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        WebData.loading = true
        if (!errors) {
          FormData.model.asset_debt_id = props.debtId
          FormData.model.asset_debt_house_id = props.id
          await Apis.create(FormData.model)
          WebData.visible = true
          Emits('handleSubmit')
        }
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      } finally {
        WebData.loading = false
      }
    })
  },
  handleReset: async () => {
    await formRef.value.resetFields()
  },
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped>
.data-house {
  position: relative;
  &.center {
    justify-content: center;
  }
}

.estimate-info {
  padding: 16px 24px;
  font-size: 12px;
  background-color: #e8f4ff;
  border: 1px solid #1890ff;
  border-radius: 4px;
  &__title {
    margin: 0;
    color: #333;
    font-size: 16px;
  }
  &__address {
    margin: 6px 0 0;
    color: var(--color-text-3);
  }
  &__money {
    margin: 0;
    font-size: 20px;

    &-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #1890ff;
      color: #777;

      .blue {
        color: #1890ff;
      }
    }
    &-title {
      margin: 0;
      font-size: 14px;
    }
    &-msg {
      margin-top: 24px;
      color: var(--color-text-3);
    }
  }
}
</style>
