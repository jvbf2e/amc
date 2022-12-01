import http from '@/api'
import { getStamp } from '@/utils'

import type { Data } from '@/api/interface'

/**
 * 个人诉讼
 * @param asset_debt_id
 * @returns
 */
export const createDataLitigation = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtQueryLogGrss',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/**
 * 个人诉讼详情
 * @param data
 * @returns
 */
export const readDataLitigation = (data: Data.ReqReadLitigationParams) => {
  const stamp = getStamp(`${data.data_type}${data.lawsuit_id}`)
  return http({
    url: '/web/assetDebt/getAssetDebtQueryLogGrssDetails',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取个人工商裁判文书详情
 * @param data
 * @returns
 */
export const readDataBusiness = (data: Data.ReqReadBusinessParams) => {
  const stamp = getStamp(`${data.asset_debt_id}${data.documents_id}`)
  return http({
    url: '/web/assetDebt/getAssetDebtQueryLogGrgsDetails',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}
