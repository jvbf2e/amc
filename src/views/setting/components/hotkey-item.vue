<template>
  <div class="hotkey-item">
    <div class="hotkey-item__label">{{ props.label }}</div>
    <div class="hotkey-item__input" :style="{ width: `${props.width}px` }">
      <span class="arco-input-wrapper">
        <input
          class="arco-input arco-input-size-medium"
          type="text"
          :value="computedValue"
          :placeholder="WebData.isFocus ? FOURS_MSG : DEFAULT_MSG"
          @focus="WebData.handleFocus"
          @blur="WebData.handleBlur"
          @keydown="WebData.handleKeydown"
          @keyup="WebData.handleKeyup"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { parseHotkey, sortHotkey } from '@/utils'

const Emits = defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: String,
  width: {
    type: Number,
    default: 240,
  },
})

const DEFAULT_MSG = '点击设置快捷键'
const FOURS_MSG = '键盘按下要设置的快捷键组合'

const WebData = reactive({
  isFocus: false,
  value: '',
  current: [] as string[],
  key: '',
  handleFocus: () => {
    WebData.isFocus = true
  },
  handleBlur: () => {
    WebData.isFocus = false
  },
  handleKeydown: (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const baseKey = ['Control', 'Alt', 'Shift']
    const key = e.key
    // current 是否存在 key
    if (!WebData.current.includes(key)) {
      if (WebData.current.length === 0 && baseKey.includes(key)) {
        WebData.key = key
        WebData.current.push(key)
      } else if (WebData.current.length > 0 && WebData.current.length <= 4) {
        // 上个 key 是否是 基础key
        if (parseHotkey(WebData.key)) {
          // current 删除
          WebData.current.splice(WebData.current.indexOf(WebData.key), 1)
        }
        // current 添加 key
        if (parseHotkey(key) || baseKey.includes(key)) {
          WebData.key = key
          WebData.current.push(key)
          WebData.current = sortHotkey([...WebData.current])
        }
        if (parseHotkey(key)) {
          Emits('update:modelValue', WebData.current.join('+'))
        }
      }
    }
  },
  handleKeyup: (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const key = e.key
    WebData.current.splice(WebData.current.indexOf(key), 1)
  },
})

const computedValue = computed(() =>
  WebData.current.length === 0 ? props.modelValue : WebData.current.join('+')
)
</script>

<style lang="less" scoped>
.hotkey-item {
  &__input {
    margin-top: 12px;
  }

  & + & {
    margin-top: 6px;
  }
}
</style>
