<template>
  <div class="container-item">
    <h2 class="container-item__title">
      {{ props.title }}
    </h2>
    <div class="container-item__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style lang="less" scoped>
.container-item {
  &__title {
    margin: 0;
    color: rgb(var(--gray-10));
    font-size: 18px;
    font-weight: 500;
  }

  &__body {
    margin-top: 24px;
    color: var(--color-text-2);
    font-size: 14px;

    .msg {
      color: var(--color-text-3);
    }

    .value {
      color: var(--color-text-1);
    }
  }
}
</style>
