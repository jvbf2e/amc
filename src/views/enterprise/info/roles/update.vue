<template>
  <a-form
    ref="formRef"
    layout="vertical"
    :model="FormData.form.model"
    :rules="FormData.form.rules"
    @submit="FormData.form.handleSubmit"
  >
    <a-form-item field="name" label="角色名称">
      <a-input
        v-model="FormData.form.model.name"
        placeholder="请输入角色名称"
      />
    </a-form-item>
    <a-form-item field="phone" label="备注">
      <a-textarea
        v-model="FormData.form.model.remark"
        placeholder="请输入备注"
        :max-length="{ length: 255, errorOnly: true }"
        :auto-size="{
          minRows: 2,
        }"
      />
    </a-form-item>
    <a-form-item field="permission_ids" label="菜单权限">
      <div class="form-tree">
        <CTree
          v-model:checked-keys="FormData.form.model.permission_ids"
          :data="allMenuTree"
        />
      </div>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import lodash from 'lodash'
import { reactive, ref } from 'vue'
import { AppStore, RoleStore } from '@/store'

import CTree from './components/tree.vue'

import type { PropType } from 'vue'
import type { Role } from '@/api/interface'

import Config from './config'

const { allMenuTree, apiRoleUpdate } = RoleStore()

const Emits = defineEmits(['submitSuccess'])
const props = defineProps({
  model: {
    type: Object as PropType<Role.ReqRoleUpdateParams>,
  },
})

const formRef = ref()

const appStore = AppStore()

const FormData = reactive({
  form: {
    model: lodash.cloneDeep(props.model as Role.ReqRoleUpdateParams),
    rules: Config.drawerForm.rules,
    handleSubmit: () => {
      formRef.value.validate(async (errors: any) => {
        try {
          if (!errors) {
            await apiRoleUpdate(FormData.form.model)
            FormData.form.handleReset()
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
  },
})

defineExpose({
  handleSubmit: FormData.form.handleSubmit,
  handleReset: FormData.form.handleReset,
})
</script>

<style lang="less" scoped>
.form-tree {
  padding: 6px 12px;
}
.arco-form-item-error {
  .form-tree {
    background-color: var(--color-danger-light-1);
  }
}
</style>
