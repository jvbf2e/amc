import http from '@/api'
import { getStamp } from '@/utils'

import type { Enterprise, ResPage } from '@/api/interface'

/**
 * 查看企业信息
 * @returns
 */
export const enterpriseInfo = () => {
  const stamp = getStamp()
  return http({
    url: '/web/enterprise/getEnterpriseInfo',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取用户列表
 */
export const enterpriseEdit = (data: Enterprise.ReqEnterpriseForm) => {
  const stamp = getStamp()
  return http({
    url: '/web/enterprise/updateEnterpriseInfo',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/* 费用中心 */
/**
 * 我的账户
 * @param data
 * @returns
 */
export const getEnterpriseCostList = (
  data: Enterprise.ReqEnterpriseCostAccountListParams
) => {
  const stamp = getStamp()
  return http<any, Enterprise.ResEnterpriseCostAccountData>({
    url: '/web/amountCenter/getList',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 消费明细
 * @param data
 * @returns
 */
export const getEnterpriseCostDetailedList = (
  data: Enterprise.ReqEnterpriseCostDetailedListParams
) => {
  const stamp = getStamp()
  return http<any, ResPage<Enterprise.ResEnterpriseCostDetailedItemData>>({
    url: '/web/amountCenter/getConsumptionList',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取所有员工
 */
export const getAllEmployee = () => {
  const stamp = getStamp()
  return http({
    url: '/web/amountCenter/getAllEmployee',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/* 公告管理 */
/**
 * 添加公告
 * @param data
 * @returns
 */
export const createEnterpriseNotice = (
  data: Enterprise.ReqEnterpriseNoticeCreateParams
) => {
  const stamp = getStamp(`${data.title}`)
  return http({
    url: '/web/enterprise/createNotice',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除公告
 * @param id
 * @returns
 */
export const deleteEnterpriseNotice = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/enterprise/deleteNotice',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 公告详情
 * @param id
 * @returns
 */
export const readEnterpriseNotice = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Enterprise.ResEnterpriseNoticeReadData>({
    url: '/web/enterprise/getNoticeDetail',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 公告列表
 * @param data
 * @returns
 */
export const getEnterpriseNoticeList = (
  data?: Enterprise.ReqGetEnterpriseNoticeListParams
) => {
  const pagination = { page: 1, per_page: 10 }
  const stamp = getStamp()
  return http<any, ResPage<Enterprise.ResEnterpriseNoticeItemData>>({
    url: '/web/enterprise/getNoticeList',
    method: 'post',
    data: {
      ...Object.assign(pagination, data),
      ...stamp,
    },
  })
}
