<template>
  <div class="enterprise-info no-padding">
    <a-space :size="24" direction="vertical" fill>
      <div class="enterprise-info__card">
        <h3 class="enterprise-info__card-title">基础信息</h3>
        <div class="enterprise-info__card-body">
          <a-row>
            <a-col :span="12">
              <div class="info">
                <a-image
                  :src="enterpriseStore.info.logo_url.url"
                  :height="60"
                />
                <b class="info-name">
                  {{ enterpriseStore.info.enterprise_name }}
                </b>
                <div class="info-extend">
                  <b>当前版本</b>
                  <br />
                  <span class="type">{{
                    enterpriseStore.info.version_type
                  }}</span>
                </div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="list">
                <div class="list-item">
                  <span class="suffix">账户数量</span>
                  <a-progress
                    :percent="
                      enterpriseStore.info.use_number /
                      enterpriseStore.info.accounts_number
                    "
                    size="large"
                    color="#00b42a"
                    :animation="true"
                  >
                    <template v-slot:text="scope">
                      {{
                        `${enterpriseStore.info.use_number}/${enterpriseStore.info.accounts_number}`
                      }}
                    </template>
                  </a-progress>
                </div>
                <div class="list-item">
                  <span class="suffix">剩余天数</span>
                  <a-progress
                    :percent="compCurrentDay / compTotalDay"
                    size="large"
                    color="#00b42a"
                    :animation="true"
                  >
                    <template v-slot:text="scope">
                      {{ `${compCurrentDay}/${compTotalDay}` }}
                    </template>
                  </a-progress>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="enterprise-info__card">
        <h3 class="enterprise-info__card-title">活跃成员</h3>
        <div class="enterprise-info__card-body">
          <a-row>
            <a-col :span="6">
              <div align="center">
                <p>昨日活跃人数</p>
                <p>{{ enterpriseStore.info.yesterday_online_number }}人</p>
              </div>
            </a-col>
            <a-col :span="6">
              <div align="center">
                <p>今日活跃人数</p>
                <p>{{ enterpriseStore.info.today_online_number }}人</p>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { EnterpriseStore } from '@/store'

const enterpriseStore = EnterpriseStore()

const compCurrentDay = computed(() => {
  const current = new Date().getTime()
  const begin = enterpriseStore.info.begin_time * 1000
  return Math.floor((current - begin) / (24 * 60 * 60 * 1000))
})

const compTotalDay = computed(() => {
  const begin = enterpriseStore.info.begin_time * 1000
  const end = enterpriseStore.info.end_time * 1000
  return Math.floor((end - begin) / (24 * 60 * 60 * 1000))
})

onMounted(async () => {
  await enterpriseStore.apiEnterpriseInfo()
})
</script>

<style lang="less" scoped>
.enterprise-info {
  position: relative;

  &.no-padding {
    padding: 0;
  }

  .version {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    color: rgb(var(--primary-6));
    background-color: var(--color-primary-light-1);
    border: 1px solid var(--color-primary-light-2);
    border-radius: 6px;

    & > .msg {
      color: var(--color-text-3);
      font-size: 12px;
    }
  }

  &__card {
    padding: 18px 12px;
    background-color: var(--color-bg-1);
    border: 1px solid var(--color-border-2);
    border-radius: 6px;

    &-title {
      margin: 0;
      color: rgb(var(--gray-10));
      text-indent: 0.4em;
      border-left: 4px solid rgb(var(--primary-6));
    }

    &-body {
      padding: 24px 0 12px;
      color: rgb(var(--gray-10));

      .info {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgb(var(--gray-10));

        & > * + * {
          margin-top: 24px;
        }

        &-extend {
          text-align: center;

          & > b {
            font-size: 16px;
          }

          & > .type {
            display: inline-block;
            margin-top: 12px;
            color: rgb(var(--green-6));
          }
        }
      }

      .list {
        position: relative;

        &-item {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          color: rgb(var(--gray-10));

          & + .list-item {
            margin-top: 24px;
          }

          .suffix {
            flex: 100px 0 0;
          }
        }
      }
    }
  }
}
</style>
