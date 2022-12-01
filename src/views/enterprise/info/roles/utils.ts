export const setTreeDeep = (rows: any[], data: { [key: number]: number[] }) => {
  rows.forEach((item) => {
    if (data[item.parent_id]) {
      data[item.parent_id].push(item.id)
    } else {
      data[item.parent_id] = [item.id]
    }
    if (item.children) {
      setTreeDeep(item.children, data)
    }
    if (item.auth_list) {
      setTreeDeep(item.auth_list, data)
    }
  })
}

export const setTreeDefaultFun = (rows: any[]) => {
  let data = {} as { [key: number]: number[] }
  setTreeDeep(rows, data)
  return data
}
