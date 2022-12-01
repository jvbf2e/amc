<template>
  <div>
    <div class="vm-form">
      <div
        :class="{ 'vm-form-item': true, block: item.isBlock }"
        v-for="item in WebData[props.type]"
      >
        <template v-if="item.label">
          <label class="vm-form-item__label">{{ item.label }}</label>
          <div class="vm-form-item__content">{{ getValue(item.value) }}</div>
        </template>
        <template v-else>
          <div class="vm-form-item__content">
            <div class="vm-certificate">
              <div class="vm-certificate-item">
                <label class="vm-certificate-item__label">文书内容</label>
                <div class="vm-certificate-item__content">
                  <div v-html="props.model?.content"></div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue'

import type { Type } from './types'

import Config from './config'

const props = defineProps({
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
  ...Config,
})

const getValue = (key: string) => {
  return props.model[key] ?? ''
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
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
      flex: 170px 0 0;
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
