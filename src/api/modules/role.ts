import http from '@/api'
import { getStamp } from '@/utils'

import type { ReqPage, Role } from '@/api/interface'

/**
 * 获取全部角色
 * @returns
 */
export const roleAll = () => {
  const stamp = getStamp()
  return http({
    url: '/web/role/getAll',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取角色列表
 * @returns
 */
export const getRoleList = (data: ReqPage) => {
  const stamp = getStamp()
  return http({
    url: '/web/role/getList',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取全部菜单树
 * @returns
 */
export const getRoleAllMenuTree = () => {
  const stamp = getStamp()
  return http({
    url: '/web/menu/getAllMenuTree',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 创建角色
 * @returns
 */
export const createRole = (data: Role.ReqRoleCreateParams) => {
  const stamp = getStamp(`${data.name}`)
  return http({
    url: '/web/role/create',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除角色
 * @returns
 */
export const deleteRole = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/role/delete',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 修改角色
 * @param data
 * @returns
 */
export const updateRole = (data: Role.ReqRoleUpdateParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/role/update',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取角色
 * @param id
 * @returns
 */
export const readRole = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/role/getOne',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取权限
 * @returns
 */
export const readPermission = () => {
  const stamp = getStamp()
  return http({
    url: '/web/menu/getAuthMenu',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}
