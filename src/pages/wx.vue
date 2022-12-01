<template>
  <div>success</div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { invoke } from '@tauri-apps/api/tauri'

import type { RouteLocationNormalizedLoaded } from 'vue-router'

const route = useRoute()

onMounted(() => {
  watch(route, async (newValue: RouteLocationNormalizedLoaded) => {
    const code = route.query.code
    if (code) {
      await invoke('login', { code })
    }
  })
})
</script>
