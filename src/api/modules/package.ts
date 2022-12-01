import http from '@/api'
import { getStamp } from '@/utils'

import type { Package } from '@/api/interface'

/**
 * 新增资产包
 * @returns
 */
export const createPackage = (data: Package.ReqCreateParams) => {
  const stamp = getStamp(`${data.project_name}`)
  return http({
    url: '/web/assetPackage/createAssertPackage',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除资产包
 * @returns
 */
export const deletePackage = (asset_package_ids: number[]) => {
  const stamp = getStamp()
  return http({
    url: '/web/assetPackage/deleteAssertPackage',
    method: 'post',
    data: {
      asset_package_ids,
      ...stamp,
    },
  })
}

/**
 * 编辑资产包
 * @returns
 */
export const updatePackage = (data: Package.ReqUpdateParams) => {
  const stamp = getStamp(`${data.asset_package_id}${data.project_name}`)
  return http({
    url: '/web/assetPackage/updateAssertPackage',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 资产包详情
 * @returns
 */
export const readPackage = (asset_package_id: number) => {
  const stamp = getStamp(`${asset_package_id}`)
  return http<any, Package.ResGetInfoData>({
    url: '/web/assetPackage/getAssertPackage',
    method: 'post',
    data: {
      asset_package_id,
      ...stamp,
    },
  })
}

/**
 * 资产包列表
 * @param data
 * @returns
 */
export const getPackageList = (data?: Package.ReqGetListParams) => {
  const pagination = { page: 1, per_page: 10 }
  const stamp = getStamp()
  return http({
    url: '/web/assetPackage/listsAssertPackage',
    method: 'post',
    data: {
      ...Object.assign(pagination, data),
      ...stamp,
    },
  })
}

/**
 * 删除资产包内债权
 * @param data
 * @returns
 */
export const deletePackageDebt = (data: Package.ReqDeletePackageDebtParams) => {
  const stamp = getStamp(`${data.asset_package_id}`)
  return http({
    url: '/web/assetPackage/deleteAssertDebt',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/* 处置周报 */
/**
 * 添加处置周报
 */
export const createPackageWeekly = (data: Package.ReqWeeklyCreateParams) => {
  const stamp = getStamp(`${data.asset_package_id}`)
  return http({
    url: '/web/assetPackageWeekly/createWeekly',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除处置周报
 */
export const deletePackageWeekly = (data: Package.ReqWeeklyDeleteParams) => {
  const stamp = getStamp(`${data.asset_package_id}`)
  return http({
    url: '/web/assetPackageWeekly/deleteWeekly',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 编辑处置周报
 */
export const updatePackageWeekly = (data: Package.ReqWeeklyUpdateParams) => {
  const stamp = getStamp(`${data.asset_package_id}${data.weekly_id}`)
  return http({
    url: '/web/assetPackageWeekly/updateWeekly',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 处置周报详情
 */
export const readPackageWeekly = (data: Package.ReqWeeklyReadParams) => {
  const stamp = getStamp(`${data.asset_package_id}${data.weekly_id}`)
  return http<any, Package.ResReadWeekly>({
    url: '/web/assetPackageWeekly/getWeekly',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取债权列表
 * @returns
 */
export const getPackageWeeklyDebtList = (asset_package_id: number) => {
  const stamp = getStamp(`${asset_package_id}`)
  return http({
    url: '/web/assetPackageWeekly/getListsAssetDebt',
    method: 'post',
    data: {
      asset_package_id,
      ...stamp,
    },
  })
}

/**
 * 获取处置周报列表
 * @returns
 */
export const getPackageWeeklyList = (data?: Package.ReqGetWeeklyListParams) => {
  const pagination = { page: 1, per_page: 10 }
  const stamp = getStamp(`${data?.asset_package_id}`)
  return http({
    url: '/web/assetPackageWeekly/getListsWeekly',
    method: 'post',
    data: {
      ...Object.assign(pagination, data),
      ...stamp,
    },
  })
}

/* 工作日志 */
/**
 * 添加工作日志
 */
export const createPackageLog = (data: Package.ReqCreateLogParams) => {
  const stamp = getStamp(`${data.asset_package_id}`)
  return http({
    url: '/web/assetPackageLog/createAssetPackageLog',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除工作日志
 */
export const deletePackageLog = (data: Package.ReqDeleteLogParams) => {
  const stamp = getStamp(`${data.asset_package_id}`)
  return http({
    url: '/web/assetPackageLog/deleteAssetPackageLog',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 编辑工作日志
 */
export const updatePackageLog = (data: Package.ReqUpdateLogParams) => {
  const stamp = getStamp(`${data.asset_package_id}${data.log_id}`)
  return http({
    url: '/web/assetPackageLog/updateAssetPackageLog',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 工作日志详情
 */
export const readPackageLog = (data: Package.ReqLogReadParams) => {
  const stamp = getStamp(`${data.asset_package_id}${data.log_id}`)
  return http<any, Package.ReqUpdateLogParams>({
    url: '/web/assetPackageLog/getAssetPackageLog',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取工作日志列表
 */
export const getPackageLogList = (data: Package.ReqGetLogListParams) => {
  const stamp = getStamp(`${data?.asset_package_id}`)
  return http({
    url: '/web/assetPackageLog/getListsAssetPackageLog',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 上次文件
 * @param file
 */
export const uploadPackageLog = (file: File[]) => {
  const stamp = getStamp()
  const formData = new FormData()
  file.forEach((item, index) => {
    formData.set(`file[${index}]`, item)
  })
  formData.set('string', stamp.string)
  formData.set('stamp', `${stamp.stamp}`)
  return http({
    url: '/web/file/fileUploads',
    method: 'post',
    data: formData,
  })
}

/**
 * 获取所有员工
 */
export const getPackageLogEmployeeList = () => {
  const stamp = getStamp()
  return http({
    url: '/web/assetPackageLog/getAllEmployee',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}
