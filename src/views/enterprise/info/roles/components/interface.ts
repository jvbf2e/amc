export type TreeNodeKey = number | string

export interface TreeNodeData {
  /**
   * @zh 唯一标示
   * @en Unique key
   * */
  id?: number
  parent_id?: number
  /**
   * @zh 该节点显示的标题
   * @en The title of the node
   * */
  name?: string
  /**
   * @zh 子节点
   * @en Child node
   * */
  children?: TreeNodeData[]
  /**
   * @zh 操作节点
   * @en option node
   */
  auth_list?: TreeNodeData[]
}

export interface TreeNodeProps extends Omit<TreeNodeData, 'children'> {
  isLeaf: boolean
  isTail: boolean
  level: number
}

export interface Node extends TreeNodeProps {
  key: TreeNodeKey
  treeNodeProps: TreeNodeProps
  treeNodeData: TreeNodeData
  parent?: Node
  parentKey?: TreeNodeKey
  pathParentKeys: TreeNodeKey[]
  children?: Node[]
}

export type FilterTreeNode = (node: TreeNodeData) => boolean

export interface TreeProps {
  checked: boolean
}

export interface NodeOptions {
  treeNodeData: TreeNodeData
  parentNode?: Node
  isTail?: boolean
}

export type Key2TreeNode = Map<TreeNodeKey, Node>
