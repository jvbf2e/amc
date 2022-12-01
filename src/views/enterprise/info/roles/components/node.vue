<template>
  <div :class="classNames">
    <!-- 缩进 -->
    <span :class="`${prefixCls}-indent`">
      <span
        v-for="i in level"
        :key="i"
        :class="[`${prefixCls}-indent-block`]"
      />
    </span>
    <div :class="`${prefixCls}-main`">
      <div :class="`${prefixCls}-content`">
        <!-- checkbox -->
        <a-checkbox
          :disabled="disabled"
          :model-value="checked"
          :indeterminate="indeterminate"
          uninject-group-context
          @change="onCheckboxChange"
        />
        <!-- 内容 -->
        <span :class="`${prefixCls}-title`">
          <span :class="`${prefixCls}-title-text`">
            {{ props.name }}
          </span>
        </span>
      </div>
      <!-- 额外 -->
      <slot name="extra" v-bind="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import useNodeKey from './hooks/use-node-key'
import useTreeContext from './hooks/use-tree-context'

import type { PropType } from 'vue'
import type { Node } from './interface'

const props = defineProps({
  /** 唯一标示 */
  id: {
    type: [String, Number] as PropType<string | number>,
  },
  /** 标题 */
  name: {
    type: String,
  },
  /** 是否禁用节点 */
  disabled: {
    type: Boolean,
  },
  /** 是否显示多选框   */
  checkable: {
    type: Boolean,
  },
  /** 是否可以拖拽   */
  draggable: {
    type: Boolean,
  },
  /** 是否是叶子节点。动态加载时有效 */
  isLeaf: {
    type: Boolean,
  },
  isTail: {
    type: Boolean,
  },
  level: {
    type: Number,
    default: 0,
  },
})

const treeContext = useTreeContext()
const key = useNodeKey()

const { isLeaf, isTail, disabled } = toRefs(props)

const prefixCls = 'tree-node'

const classNames = computed(() => [
  `${prefixCls}`,
  {
    [`${prefixCls}-is-leaf`]: isLeaf.value,
    [`${prefixCls}-is-tail`]: isTail.value,
    [`${prefixCls}-disabled`]: disabled.value,
  },
])

const node = computed(() => treeContext.key2TreeNode?.get(key.value) as Node)
const treeNodeData = computed(() => node.value.treeNodeData)

const checked = computed(() => treeContext.checkedKeys?.includes?.(key.value))
const indeterminate = computed(() =>
  treeContext.indeterminateKeys?.includes?.(key.value)
)

const extra = computed(() => treeNodeData.value)

const onCheckboxChange = (
  checked: boolean | (string | number | boolean)[],
  e: Event
) => {
  treeContext.onCheck?.(checked as boolean, key.value, e)
}
</script>

<style lang="less" scoped>
.tree-node {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-left: 2px;
  color: var(--color-text-1);
  line-height: 1.5715;
  cursor: pointer;

  &-main {
    display: inline-block;
  }

  &-content {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  &-indent {
    position: relative;
    flex-shrink: 0;
    align-self: stretch;

    &-block {
      position: relative;
      display: inline-block;
      width: 12px;
      height: 100%;
      margin-right: 10px;
    }
  }

  .arco-checkbox {
    margin-right: 10px;
    padding-left: 0;
    line-height: 32px;
  }

  &-title {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: -4px;
    padding: 5px 4px;
    font-size: 14px;
    border-radius: var(--border-radius-small);
  }
}
</style>
