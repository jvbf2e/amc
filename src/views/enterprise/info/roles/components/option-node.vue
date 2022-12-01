<template>
  <a-checkbox :disabled="true" :model-value="true" uninject-group-context>
    {{ props.name }}
  </a-checkbox>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
  },
})
</script>

<style lang="less" scoped></style>
