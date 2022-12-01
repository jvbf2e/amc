<template>
  <div class="home-body">
    <div class="content">
      <a-row :gutter="24">
        <a-col :span="16">
          <CStatistics />
          <CInventory />
          <CDynamic />
        </a-col>
        <a-col :span="8">
          <CEmployee />
          <div class="c-card">
            <div class="c-card__title">圈讯不良交易平台</div>
            <div class="c-card-body">
              <a-link href="javascript:;" :hoverable="false">
                <IconWechat :size="18" />
                <span style="font-size: 16px">
                  点击跳转前往圈讯不良交易平台
                </span>
              </a-link>
              <a-space :size="24">
                <p style="color: var(--color-text-3)">
                  圈讯为用户提供移动管理工具，帮助使用者在手机上快捷访问AMC交易平台
                </p>
                <IconFont type="icon-chui" :size="80" />
              </a-space>
            </div>
          </div>
          <CNotice />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconWechat } from '@arco-design/web-vue/es/icon'

import CDynamic from './components/dynamic.vue'
import CEmployee from './components/employee.vue'
import CInventory from './components/inventory.vue'
import CNotice from './components/notice.vue'
import CStatistics from './components/statistics.vue'
</script>

<style lang="less" scoped>
.home {
  &-body {
    position: relative;
    padding: 24px;
    min-height: calc(var(--vh) - 44px);
    background-color: var(--color-neutral-2);

    & > .content {
      margin: 80px auto 40px;
      width: 1024px;
    }

    &::before {
      content: '';
      transition: opacity 0.4s ease-out;
      display: block;
      opacity: 1;
      width: 100%;
      height: 187px;
      background-image: url(@/assets/image/bg.png);
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: top;
      background-color: #1e232e;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.c-card {
  position: relative;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;

  & + & {
    margin-top: 20px;
  }

  &__title {
    position: relative;
    padding: 12px 24px;
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }

  &-body {
    position: relative;
    padding: 12px 24px;
  }

  &.no-padding &-body {
    padding: 0;
  }
}
</style>
