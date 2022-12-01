<template>
  <div class="debt-create no_drag">
    <div class="debt-create-title">添加债权信息</div>
    <CreatePage ref="createPageRef" @submit-success="WebData.handleForm" />
    <div class="debt-create-btn">
      <a-space :size="12">
        <a-button type="primary" @click="WebData.handleSubmit">提交</a-button>
        <a-button @click="WebData.handleReset">重置</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import CreatePage from './components/create.vue'

const router = useRouter()

const createPageRef = ref()

const WebData = reactive({
  handleSubmit: () => {
    createPageRef.value.handleSubmit()
  },
  handleReset: () => {
    createPageRef.value.handleReset()
  },
  handleForm: () => {
    router.push({ name: 'DebtList' })
  },
})
</script>

<style lang="less" scoped>
.debt-create {
  position: relative;
  margin: 0 auto;
  padding: 24px 0;
  width: 680px;

  &-title {
    margin-bottom: 24px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }

  &-btn {
    margin-top: 12px;
  }
}
</style>
