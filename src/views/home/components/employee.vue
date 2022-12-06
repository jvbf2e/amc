<template>
  <div class="c-card">
    <div class="c-card-body">
      <div class="user-info">
        <a-avatar class="user-info__avatar" :size="60">
          <template v-if="homeStore.employee.url === ''">
            {{ homeStore.employee.name.slice(0, 1) }}
          </template>
          <template v-else>
            <img :src="homeStore.employee.url" :alt="homeStore.employee.name" />
          </template>
        </a-avatar>
        <div class="user-info__msg">
          <span>{{ homeStore.employee.name }}</span>
          <span>{{ `账号：${homeStore.employee.phone}` }}</span>
        </div>
      </div>
      <div class="user-log">
        <span class="user-log__title">访问管理</span>
        <div class="user-log-list">
          <div class="user-log-list-item">
            <span class="title">用户数</span>
            <span class="count">{{ homeStore.employee.employee_count }}</span>
          </div>
          <div class="user-log-list-item">
            <span class="title">角色</span>
            <span class="count">{{ homeStore.employee.role_count }}</span>
          </div>
          <div class="user-log-list-item">
            <span class="title">当前在线</span>
            <span class="count">{{ homeStore.employee.online_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeStore } from '@/store'
import { onMounted } from 'vue'

const homeStore = HomeStore()

onMounted(async () => {
  await homeStore.apiHomeEmployeeInfo()
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
    color: rgb(var(--gray-10));
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

.user-info {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgb(var(--gray-10));

  &__avatar {
    position: relative;
    overflow: hidden;
  }

  &__msg {
    flex: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 20px;

    & > span {
      line-height: 1.6em;

      & + span {
        margin-top: 4px;
      }
    }
  }
}

.user-log {
  position: relative;
  margin-top: 24px;

  &__title {
    position: relative;
    color: rgb(var(--gray-10));
    font-size: 14px;
    font-weight: bold;
  }

  &-list {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 24px;

    &-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33%;

      & > .title {
        position: relative;
        color: rgb(var(--gray-10));
        font-size: 12px;
      }

      & > .count {
        position: relative;
        margin-top: 12px;
        color: rgb(var(--gray-10));
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
