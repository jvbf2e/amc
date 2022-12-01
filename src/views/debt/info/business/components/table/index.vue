<template>
  <div class="card">
    <div class="card-header">
      <span class="card-header__title">
        <template v-if="props.icon">
          <img class="icon" :src="props.icon" />
        </template>
        <span>{{ props.name }}</span>
      </span>
    </div>
    <div class="card-body">
      <div class="c-table" v-if="props.columns">
        <div
          class="c-table_tr"
          :class="color"
          v-for="(item, index) in props.data"
          :key="index"
        >
          <div
            class="c-table_td"
            v-for="(node, nodeIndex) in props.columns"
            :key="nodeIndex"
            :style="node.width"
          >
            <div class="c-table_td__label">{{ node.label }}</div>
            <div class="c-table_td__value">
              <a-tooltip
                class="item"
                placement="bottomLeft"
                :title="
                  node.prop === 'index'
                    ? index + 1 < 10
                      ? `0${index + 1}`
                      : index + 1
                    : item[node.prop]
                "
              >
                <div class="space">
                  {{
                    node.prop === 'index'
                      ? index + 1 < 10
                        ? `0${index + 1}`
                        : index + 1
                      : item[node.prop]
                  }}
                </div>
              </a-tooltip>
            </div>
          </div>
          <div v-show="props.operate" class="c-table_td" style="width: 5%">
            <div class="c-table_td__label">操作</div>
            <div class="c-table_td__value">
              <a-link
                href="javascript:;"
                :hoverable="false"
                @click="WebData.openFun(item, props.name)"
              >
                详情
              </a-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue'

import type { PropsColumnsTypes } from './types'

const Emits = defineEmits(['open'])
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  data: Array as PropType<any[]>,
  columns: {
    type: Array as PropType<PropsColumnsTypes[]>,
    default: [],
  },
  operate: {
    type: Boolean,
    default: false,
  },
  color: String,
})

const WebData = reactive({
  openFun: (row: any, name: string) => {
    Emits('open', { row, name })
  },
})
</script>

<style lang="less" rel="stylesheet/less" scoped>
.c-table {
  display: table;
  width: 100%;
  &_tr {
    position: relative;
    display: table-row;
    &::after {
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
      content: '';
      display: block;
      width: 3.65px;
      z-index: 1;
    }
    &.green::after {
      background-color: #38a856;
    }
    &.blue::after {
      background-color: #1890ff;
    }
    &.purple::after {
      background-color: #4c66ff;
    }
    &:nth-child(odd) {
      background-color: rgba(243, 245, 251, 0.5);
    }
    &:hover {
      background-color: rgba(243, 245, 251, 1);
    }
  }
  &_td {
    display: table-cell;
    padding: 0 5px;
    &__label {
      padding: 4px 8px;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.54);
    }
    &__value {
      font-size: 14px;
      line-height: 20px;
      padding: 4px 8px;
      color: #333;
      .item {
        line-height: 1.5715;
        min-height: 32px;
      }
      .ant-btn {
        padding: 0;
        height: initial;
      }
    }
  }
}

.card {
  position: relative;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  overflow: hidden;
  // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  &-header {
    padding: 16px;
    &__title {
      position: relative;
      .icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
    }
  }
  &-body {
    padding-bottom: 16px;
  }
  & + & {
    margin-top: 24px;
  }
}
</style>
