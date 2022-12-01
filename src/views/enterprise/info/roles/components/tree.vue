<template>
  <div class="tree">
    <TreeNode
      v-for="item in visibleNodeList"
      :key="item.key"
      :id="item.id"
      :name="item.name"
      :isLeaf="item.isLeaf"
      :isTail="item.isTail"
      :level="item.level"
    >
      <template #extra="nodeData">
        <div class="tree-extra">
          <TreeOptionNode
            v-for="node in nodeData.auth_list"
            :key="node.id"
            :parent_key="node.parent_id"
            :name="node.name"
          />
        </div>
      </template>
    </TreeNode>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, reactive, toRefs } from 'vue'
import { TreeInjectionKey } from './context'
import useTreeData from './hooks/use-tree-data'
import useCheckedState from './hooks/use-checked-state'
import { getCheckedStateByCheck } from './utils/check-utils'

import TreeNode from './node.vue'
import TreeOptionNode from './option-node.vue'

import type { PropType } from 'vue'
import type { TreeNodeData, TreeNodeKey } from './interface'

const emits = defineEmits(['check', 'update:checkedKeys'])
const props = defineProps({
  /**
   * @zh 传入`data`,生成对应的树结构
   * @en Pass in `data` to generate the corresponding tree structure
   * */
  data: {
    type: Array as PropType<TreeNodeData[]>,
    default: () => [],
  },
  /**
   * @zh 选中复选框的树节点
   * @en Tree node with check box selected
   * @vModel
   */
  checkedKeys: {
    type: Array as PropType<Array<string | number>>,
  },
})

const { data: propTreeData, checkedKeys: propCheckedKeys } = toRefs(props)

const { treeData, flattenTreeData, key2TreeNode } = useTreeData(
  reactive({
    treeData: propTreeData,
  })
)
const { checkedKeys, indeterminateKeys, setCheckedState } = useCheckedState(
  reactive({
    defaultCheckedKeys: undefined,
    checkedKeys: propCheckedKeys,
    checkStrictly: false,
    key2TreeNode,
    halfCheckedKeys: undefined,
    onlyCheckLeaf: false,
  })
)

function getPublicCheckedKeys(rawCheckedKeys: TreeNodeKey[]) {
  let publicCheckedKeys = [...rawCheckedKeys]
  return publicCheckedKeys
}

function getNodes(keys: TreeNodeKey[]) {
  return keys
    .map((key) => key2TreeNode.value.get(key)?.treeNodeData || undefined)
    .filter(Boolean)
}

function emitCheckEvent(options: {
  targetKey?: TreeNodeKey
  targetChecked?: boolean
  newCheckedKeys: TreeNodeKey[]
  newIndeterminateKeys: TreeNodeKey[]
  event?: Event
}) {
  const {
    targetKey,
    targetChecked,
    newCheckedKeys,
    newIndeterminateKeys,
    event,
  } = options
  const targetNode = targetKey ? key2TreeNode.value.get(targetKey) : undefined
  const publicCheckedKeys = getPublicCheckedKeys(newCheckedKeys)
  emits('check', publicCheckedKeys, {
    checked: targetChecked,
    node: targetNode?.treeNodeData,
    checkedNodes: getNodes(publicCheckedKeys) as TreeNodeData[],
    halfCheckedKeys: newIndeterminateKeys,
    halfCheckedNodes: getNodes(newIndeterminateKeys) as TreeNodeData[],
    e: event,
  })
  emits('update:checkedKeys', publicCheckedKeys)
}

function onCheck(checked: boolean, key: TreeNodeKey, e?: Event) {
  const node = key2TreeNode.value.get(key)
  if (!node) return

  const [newCheckedKeys, newIndeterminateKeys] = getCheckedStateByCheck({
    node,
    checked,
    checkedKeys: checkedKeys.value,
    indeterminateKeys: indeterminateKeys.value,
    checkStrictly: false,
  })

  setCheckedState(newCheckedKeys, newIndeterminateKeys)
  emitCheckEvent({
    targetKey: key,
    targetChecked: checked,
    newCheckedKeys,
    newIndeterminateKeys,
    event: e,
  })
}

const visibleNodeList = computed(() => flattenTreeData.value)

const treeContext = reactive({
  treeProps: props as any,
  treeData,
  flattenTreeData,
  key2TreeNode,
  checkedKeys,
  indeterminateKeys,
  onCheck,
})

onMounted(() => {
  console.log(visibleNodeList)
})

provide(TreeInjectionKey, treeContext)
</script>

<style lang="less" scoped>
.tree {
  color: var(--color-text-1);
  font-size: 14px;

  &-extra {
    padding-left: 22px;

    .arco-checkbox {
      margin-right: 10px;
      padding-left: 0;
      line-height: 32px;
    }
  }
}
</style>
