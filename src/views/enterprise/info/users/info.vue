<template>
  <a-form ref="formRef" layout="vertical" :model="props.model">
    <a-form-item field="name" label="员工姓名">
      {{ props.model.name }}
    </a-form-item>
    <a-form-item field="phone" label="手机号码">
      {{ props.model.phone }}
    </a-form-item>
    <a-form-item field="role_list" label="角色">
      <a-space :size="12">
        <template v-for="item in props.model.role_list">
          {{ roleStore.all.filter((row: any) => row.id === item)[0].name }}
        </template>
      </a-space>
    </a-form-item>
    <a-form-item field="remark" label="备注">
      {{ props.model.remark }}
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { PropType, reactive, ref, watch } from 'vue'
import lodash from 'lodash'
import { UserStore, RoleStore } from '@/store'

import type { InfoType } from './type'

import Config from './config'

const userStore = UserStore()
const roleStore = RoleStore()

const formRef = ref()

const props = defineProps({
  model: {
    type: Object as PropType<InfoType>,
    default: Config.drawerForm.model,
  },
})
const Emits = defineEmits(['submitSuccess'])

const FormData = reactive({
  form: {
    model: lodash.cloneDeep(props.model as InfoType),
  },
})

watch(
  () => props.model,
  (model) => {
    FormData.form.model = model as InfoType
  }
)
</script>
