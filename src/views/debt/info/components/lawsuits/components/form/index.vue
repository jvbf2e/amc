<template>
  <div class="document">
    <div class="vm-form">
      <template v-for="item in WebData[props.type]" :key="item.label">
        <template v-if="item.value === 'partys'">
          <div :class="{ 'vm-form-item': true, block: item.isBlock }">
            <div class="vm-form-item__content">
              <div class="vm-certificate">
                <template v-for="(node, index) in model.partys" :key="index">
                  <template v-if="index === 0">
                    <div class="vm-certificate-item">
                      <label class="vm-certificate-item__label"
                        >{{ item.label }}{{ index + 1 }}</label
                      >
                      <div
                        class="vm-certificate-item__content"
                        style="padding: 16px"
                      >
                        <template
                          v-for="(row, rowIndex) in item.children"
                          :key="`${rowIndex}${index}`"
                        >
                          <div style="display: inline-block; width: 45%">
                            <span style="color: #666">{{ row }}：</span>
                            {{ node[rowIndex] }}
                          </div>
                        </template>
                      </div>
                    </div>
                    <template v-if="isMoreBtn">
                      <div align="center">
                        <a-link
                          href="javascript:;"
                          :hoverable="false"
                          @click="WebData.ofnFun"
                        >
                          查看更多
                        </a-link>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <div class="vm-certificate-item" v-show="WebData.isInfo">
                      <label class="vm-certificate-item__label"
                        >{{ item.label }}{{ index + 1 }}</label
                      >
                      <div
                        class="vm-certificate-item__content"
                        style="padding: 16px"
                      >
                        <template
                          v-for="(row, rowIndex) in item.children"
                          :key="`${rowIndex}${index}`"
                        >
                          <div style="display: inline-block; width: 45%">
                            <span style="color: #666">{{ row }}：</span
                            >{{ node[rowIndex] }}
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div :class="{ 'vm-form-item': true, block: item.isBlock }">
            <template v-if="item.label">
              <label class="vm-form-item__label">{{ item.label }}</label>
              <div class="vm-form-item__content">
                <template v-if="item.type === 'date'">
                  {{ model[`${item.value}`] }}
                </template>
                <template v-else>
                  {{ model[`${item.value}`] ? model[`${item.value}`] : '' }}
                </template>
              </div>
            </template>
            <template v-else>
              <div class="vm-form-item__content">
                <div class="vm-certificate">
                  <div class="vm-certificate-item">
                    <label class="vm-certificate-item__label">内容</label>
                    <div
                      class="vm-certificate-item__content"
                      style="padding: 16px"
                    >
                      <div v-html="model?.body"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, PropType, computed } from 'vue'
import Config from './config'

import type { Type } from './type'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<Type>,
    default: 'cpws',
  },
  model: {
    type: Object as PropType<any>,
    default: null,
  },
})

const WebData = reactive({
  ...Config.tabs,
  isInfo: false,
  ofnFun: () => {
    WebData.isInfo = true
  },
})

// 是否显示更多按钮
const isMoreBtn = computed(() => {
  if (props.model.partys === null) return false && !WebData.isInfo
  return props.model.partys.length > 1 && !WebData.isInfo
})
// onMounted(() => {})
</script>

<style lang="less" rel="stylesheet/less" scoped>
.document {
  position: relative;
  max-height: calc(var(--vh) - 240px);
}
.vm-form__title {
  margin-bottom: 16px;
  color: #333;
  font-size: 16px;
  line-height: 23px;
}

.vm-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  border-top: 1px solid #f1f1f1;
  border-left: 1px solid #f1f1f1;

  &-item {
    flex: 50% 0 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-bottom: 1px solid #f1f1f1;

    &.block {
      flex: 100% 0 0;
    }

    &__label {
      flex: 140px 0 0;
      padding: 15px 8px;
      font-size: 14px;
      color: #333;
      background-color: rgba(243, 245, 251, 0.5);
      border-right: 1px solid #f1f1f1;
    }

    &__content {
      flex: auto;
      padding: 15px 8px;
      font-size: 14px;
      color: #333;
      border-right: 1px solid #f1f1f1;

      & > * {
        line-height: 1.6em;
      }
    }
  }
}

.vm-certificate {
  position: relative;

  &-item {
    padding: 8px;

    &__label {
      position: relative;
      padding-left: 8px;
      color: #333;
      font-size: 14px;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 4px;
        height: 100%;
        background-color: #317ef6;
      }
    }
  }
}
</style>
