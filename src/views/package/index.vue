<template>
  <div class="package">
    <div class="package-search">
      <a-row>
        <a-col :span="12">
          <a-input-search
            size="large"
            placeholder="搜索"
            :style="{ width: '320px' }"
          />
        </a-col>
        <a-col :span="12">
          <div align="right">
            <a-space :size="12">
              <a-link href="javascript:;">
                <IconShareExternal :style="{ fontSize: '20px' }" />
              </a-link>
              <a-link href="javascript:;" status="danger">
                <IconDelete :style="{ fontSize: '20px' }" />
              </a-link>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="package-body">
      <a-row :gutter="24">
        <a-col :span="6">
          <div class="package-body__item">
            <h3 class="package-body__item-title">
              <span>项目备案()</span>
              <IconRight />
            </h3>
            <div class="package-body__list"></div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="package-body__item">
            <h3 class="package-body__item-title">
              <span>初步尽调()</span>
              <IconRight />
            </h3>
            <div class="package-body__list"></div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="package-body__item">
            <h3 class="package-body__item-title">
              <span>立项审查()</span>
              <IconRight />
            </h3>
            <div class="package-body__list"></div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="package-body__item">
            <h3 class="package-body__item-title">
              <span>补充尽调()</span>
              <IconRight />
            </h3>
            <div class="package-body__list"></div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconShareExternal,
  IconDelete,
  IconRight,
} from '@arco-design/web-vue/es/icon'
</script>

<style lang="less" scoped>
.package {
  position: relative;

  &-search {
    position: relative;
    padding: 12px 0;
  }

  &-body {
    &__item {
      border: 1px solid var(--color-border-2);

      &-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 12px;
      }
    }

    &__list {
      padding: 18px 12px;
      border-top: 1px solid var(--color-border-2);
    }
  }
}
</style>
