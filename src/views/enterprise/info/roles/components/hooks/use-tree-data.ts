import { computed, ref, toRefs, watchEffect } from 'vue'

import type { TreeNodeData, Node } from '../interface'
import { getKey2TreeNode, getFlattenTreeData } from '../utils'
import { generateTreeData } from '../utils/tree-data'

export default function useTreeData(props: { treeData: TreeNodeData[] }) {
  const { treeData: propTreeData } = toRefs(props)
  const treeData = ref<Node[]>([])

  watchEffect(() => {
    treeData.value = generateTreeData(propTreeData.value || [])
  })

  const flattenTreeData = computed(() => getFlattenTreeData(treeData.value))
  const key2TreeNode = computed(() => getKey2TreeNode(flattenTreeData.value))

  return { treeData, flattenTreeData, key2TreeNode }
}
