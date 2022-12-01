import type { InjectionKey, Slot } from 'vue'
import type { TreeNodeData, Node, Key2TreeNode, TreeNodeKey } from './interface'

export const TreeInjectionKey: InjectionKey<TreeContext> =
  Symbol('TreeInjectionKey')

export type TreeContext = Readonly<{
  treeProps: TreeNodeData
  treeData: Node[]
  flattenTreeData: Node[]
  key2TreeNode: Key2TreeNode
  checkedKeys: TreeNodeKey[]
  indeterminateKeys: TreeNodeKey[]
  onCheck: (checked: boolean, key: TreeNodeKey, e?: Event) => void
}>
