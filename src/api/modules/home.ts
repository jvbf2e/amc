import http from '@/api'
import { getStamp } from '@/utils'

import type { Home, ResPage } from '../interface'

/**
 * 获取资产统计
 * @returns
 */
export const getHomePackageInfo = () => {
  const stamp = getStamp()
  return http<any, Home.ResReadHomePackageInfoData>({
    url: '/web/capital/getPackageStats',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取员工信息
 * @returns
 */
export const getHomeEmployeeInfo = () => {
  const stamp = getStamp()
  return http<any, Home.EmployeeInfo>({
    url: '/web/capital/getEmployeeInfo',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取代办清单
 * @returns
 */
export const getHomeInventoryList = () => {
  const stamp = getStamp()
  return http<any, Home.ResReadHomeInventoryListData>({
    url: '/web/capital/getTeedToDoList',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取最新动态
 * @returns
 */
export const getHomeDynamicList = () => {
  const stamp = getStamp()
  return http<any, Home.DynamicItem[]>({
    url: '/web/capital/getNewestDynamic',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取最新公告
 * @returns
 */
export const getHomeNoticeList = () => {
  const stamp = getStamp()
  return http<any, ResPage<Home.NoticeItem>>({
    url: '/web/capital/getNewestNotice',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取公告详情
 * @params record_id 公告id
 * @returns
 */
export const getHomeNoticeRead = (record_id: number) => {
  const stamp = getStamp(`${record_id}`)
  return http<any, Home.ResReadHomeNotice>({
    url: '/web/capital/getNewestNoticeDetail',
    method: 'post',
    data: {
      record_id,
      ...stamp,
    },
  })
}

/**
 * 修改密码
 * @param data
 * @returns
 */
export const updatePassword = (data: Home.ResUpdatePassword) => {
  const stamp = getStamp(`${data.new_password}`)
  return http({
    url: '/web/employee/updatePassword',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 绑定微信
 * @param code
 * @returns
 */
export const createWechat = (code: string) => {
  const stamp = getStamp(`${code}`)
  return http({
    url: '/web/employee/createWechatBind',
    method: 'post',
    data: {
      code,
      ...stamp,
    },
  })
}

/**
 * 解除绑定
 * @returns
 */
export const deleteWechat = () => {
  const stamp = getStamp()
  return http({
    url: '/web/employee/deleteWechatBind',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}
