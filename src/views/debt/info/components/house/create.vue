<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item field="city_code" label="城市">
          <a-select
            v-model="FormData.model.city_code"
            placeholder="请选择城市"
            allow-search
            @change="FormData.handleChange"
          >
            <template v-for="item in appStore.city">
              <a-option :value="item.key" :label="item.label" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="obligee" label="权利人">
          <a-input
            v-model="FormData.model.obligee"
            placeholder="请输入权利人"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="house_location" label="详细地址">
          <a-input
            v-model="FormData.model.house_location"
            placeholder="请输入详细地址"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="built_up_area_of_house" label="面积">
          <a-input-number
            mode="button"
            :min="0"
            v-model="FormData.model.built_up_area_of_house"
            placeholder="请输入面积"
          >
            <template #suffix>
              <span>㎡</span>
            </template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="housing_types" label="住宅类型">
          <a-select
            v-model="FormData.model.housing_types"
            placeholder="请选择住宅类型"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'housing_types')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="produce_status" label="产调抵押状态">
          <a-select
            v-model="FormData.model.produce_status"
            placeholder="请选择产调抵押状态"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'produce_status')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="cert_type" label="证书类型">
          <a-select
            v-model="FormData.model.cert_type"
            placeholder="请选择证书类型"
          >
            <template
              v-for="item in appStore.dicts.filter((item: any) => item.key === 'cert_type')[0].children"
            >
              <a-option :value="parseInt(item.key)" :label="item.value" />
            </template>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item hide-label>
          <a-image-preview-group infinite>
            <div class="file-list">
              <template v-for="item in WebData.files">
                <div class="file-item">
                  <a-image
                    :src="item.url"
                    width="100%"
                    height="100%"
                    fit="scale-down"
                  />
                  <a-popconfirm
                    position="tr"
                    type="warning"
                    content="确定删除，当前图片吗？"
                    @ok="WebData.handleDelete(item)"
                  >
                    <div class="actives">
                      <span title="删除">
                        <IconDelete />
                      </span>
                    </div>
                  </a-popconfirm>
                </div>
              </template>
              <div class="file-item upload" @click="FormData.handleUpload">
                <template v-if="FormData.loading">
                  <a-spin :size="32" />
                </template>
                <template v-else>
                  <IconUpload />
                </template>
              </div>
            </div>
          </a-image-preview-group>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'

import { reactive, ref } from 'vue'
import { AppStore, DebtStore } from '@/store'

import Config from './config'
import { fileImage } from '@/api/modules'
import { getFileName } from '@/views/library/utils'
import { IconDelete, IconUpload } from '@arco-design/web-vue/es/icon'

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const props = defineProps({
  assetDebtId: {
    type: Number,
    default: 0,
  },
})

const WebData = reactive({
  files: [] as { file_name: string; file_path: string; url: string }[],
  handleDelete: (row: any) => {
    WebData.files = WebData.files.filter(
      (item: any) => item.file_path !== row.file_path
    )
  },
})

const FormData = reactive({
  ...Config.form,
  loading: false,
  handleChange: (value: any) => {
    FormData.model.city =
      (appStore.city.find((item) => item.key === value)?.label as string) ?? ''
  },
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          FormData.model.asset_debt_id = props.assetDebtId
          FormData.model.file = WebData.files.map((item: any) => ({
            name: item.file_name,
            file: item.file_path,
          }))
          await debtStore.apiDebtHouseCreate(FormData.model)
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
  handleUpload: async () => {
    if (!FormData.loading) {
      try {
        const file_path = (await open({
          multiple: false,
          filters: [
            {
              name: 'Image',
              extensions: ['png', 'jpeg'],
            },
          ],
        })) as string
        FormData.loading = true
        if (file_path) {
          let file: File | undefined = undefined
          let url: string = ''
          await readBinaryFile(file_path).then((binaryData) => {
            const binaryDataArr = new Uint8Array(binaryData)
            const blob = new Blob([binaryDataArr])
            const fileName = getFileName(file_path)
            file = new File([binaryDataArr], fileName)
            url = URL.createObjectURL(blob)
          })
          const {
            code,
            data: res,
            msg,
          } = await fileImage(file as unknown as File)
          if (code === 0) {
            WebData.files.push({ ...res, url })
          } else {
            throw msg
          }
        }
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      } finally {
        FormData.loading = false
      }
    }
  },
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped>
.file {
  &-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    margin: 0 -6px;
    width: 100%;
  }

  &-item {
    position: relative;
    margin: 6px;
    width: 128px;
    height: 128px;
    border: 1px dashed var(--color-border-3);
    border-radius: 6px;
    cursor: pointer;

    &.upload {
      text-align: center;
      line-height: 128px;
      color: var(--color-text-3);
      font-size: 24px;
      border-color: var(--color-border-3);
    }

    &:hover {
      color: var(--color-primary-light-4);
      border-color: var(--color-primary-light-4);
    }
  }
}

.actives {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 0 6px 0 8px;
  z-index: 9;

  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
