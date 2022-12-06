<template>
  <div class="c-card">
    <div class="c-card-body">
      <div class="home-info">
        <span class="home-info__tag">
          {{ homeStore.statistics.year }}
        </span>
        <a-row>
          <a-col :span="6">
            <div class="home-info__item">
              <b class="home-info__item-count">
                {{ homeStore.statistics.invest_amount }}
              </b>
              <span class="home-info__item-label">收购成本(万)</span>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="home-info__item">
              <b class="home-info__item-count">
                {{ homeStore.statistics.debt_amount }}
              </b>
              <span class="home-info__item-label">债权总额(万)</span>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="home-info__item">
              <b class="home-info__item-count">
                {{ homeStore.statistics.collection_total }}
              </b>
              <span class="home-info__item-label">回款金额(万)</span>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="home-info__item">
              <b class="home-info__item-count">
                {{ `${homeStore.statistics.rate}%` }}
              </b>
              <span class="home-info__item-label">实际回报率</span>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { AppStore, HomeStore } from '@/store'

const appStore = AppStore()
const homeStore = HomeStore()

onMounted(async () => {
  try {
    await homeStore.apiHomeGetPackageInfo()
  } catch (error) {
    appStore.setMessage({ content: error as string, type: 'danger' })
  }
})
</script>

<style lang="less" scoped>
.c-card {
  position: relative;
  width: 100%;
  background-color: var(--color-bg-1);
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
    padding: 24px;
  }

  &.no-padding &-body {
    padding: 0;
  }
}

.home-info {
  position: relative;
  padding: 24px 0;

  &__tag {
    position: absolute;
    top: -12px;
    right: 0;
    color: #999;
    font-size: 14px;
  }

  &__item {
    text-align: center;

    &-count {
      display: block;
      color: rgb(var(--gray-10));
      font-size: 18px;
    }

    &-label {
      display: block;
      margin-top: 12px;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>
