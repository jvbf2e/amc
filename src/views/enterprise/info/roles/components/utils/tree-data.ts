import type { Node, NodeOptions, TreeNodeData, TreeNodeKey } from '../interface'

export const generateKey = (() => {
  let i = 0
  return () => {
    i += 1
    return `__amc_tree${i}`
  }
})()

function generateNode(options: NodeOptions): Node {
  const { treeNodeData, parentNode, isTail = true } = options

  const isLeaf = !treeNodeData.children?.length
  const level = parentNode ? parentNode.level + 1 : 0

  const { id, ...nodeData } = treeNodeData
  const treeNodeProps = {
    ...nodeData,
    key: id ?? generateKey(),
    isLeaf,
    isTail,
    level,
  }

  const node = {
    ...treeNodeProps,
    treeNodeProps,
    treeNodeData,
    parent: parentNode,
    parentKey: parentNode?.key,
    pathParentKeys: parentNode
      ? [...parentNode.pathParentKeys, parentNode.key as TreeNodeKey]
      : [],
  } as Node

  return node
}

export function generateTreeData(treeData: TreeNodeData[]) {
  function preOrder(tree: TreeNodeData[] | undefined, parentNode?: Node) {
    if (!tree) return undefined
    const nodes: Node[] = []
    tree.forEach((treeNodeData, index) => {
      const node = generateNode({
        treeNodeData,
        parentNode,
        isTail: index === tree.length - 1,
      })
      node.children = preOrder(treeNodeData.children, node)
      nodes.push(node)
    })
    return nodes
  }
  return preOrder(treeData) as Node[]
}
