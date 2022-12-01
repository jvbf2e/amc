import http from '@/api'
import { getStamp } from '@/utils'

import type { ReqPage, User } from '@/api/interface'

/**
 * 添加用户
 */
export const createUser = (data: User.ReqCreateUserParams) => {
  const stamp = getStamp(`${data.name}${data.phone}`)
  return http({
    url: '/web/employee/create',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除用户
 */
export const deleteUser = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/employee/delete',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑用户
 * @param data
 * @returns
 */
export const updateUser = (data: User.ReqUpdateUserParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/employee/update',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 用户详情
 */
export const infoUser = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/employee/getOne',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取用户列表
 * @returns
 */
export const getUserList = (data: ReqPage) => {
  const stamp = getStamp()
  return http({
    url: '/web/employee/getList',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}
