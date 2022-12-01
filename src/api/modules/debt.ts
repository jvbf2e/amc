import http from '@/api'
import { getStamp } from '@/utils'

import type { Debt } from '@/api/interface'

/**
 * 新增债权
 * @returns
 */
export const createDebt = (data: Debt.ReqCreateParams) => {
  const stamp = getStamp(`${data.debt_no}`)
  return http({
    url: '/web/assetDebt/createAssetDebt',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除债权
 * @returns
 */
export const deleteDebt = (asset_debt_ids: number[]) => {
  const stamp = getStamp()
  return http({
    url: '/web/assetDebt/deleteAssetDebt',
    method: 'post',
    data: {
      asset_debt_ids,
      ...stamp,
    },
  })
}

/**
 * 编辑债权
 * @returns
 */
export const updateDebt = (data: Debt.ReqUpdateParams) => {
  const stamp = getStamp(`${data.asset_debt_id}${data.debt_no}`)
  return http({
    url: '/web/assetDebt/updateAssetDebt',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 债权详情
 * @returns
 */
export const readDebt = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadData>({
    url: '/web/assetDebt/getAssetDebt',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/**
 * 获取资产包
 * @returns
 */
export const getDebtPackageList = () => {
  const stamp = getStamp()
  return http({
    url: '/web/assetDebt/getListsAssertPackage',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 债权列表
 * @param data
 * @returns
 */
export const getDebtList = (data?: Debt.ReqGetListParams) => {
  const pagination = { page: 1, per_page: 10 }
  const stamp = getStamp()
  return http<any, Debt.ResListData>({
    url: '/web/assetDebt/listsAssetDebt',
    method: 'post',
    data: {
      ...Object.assign(pagination, data),
      ...stamp,
    },
  })
}

/* 担保人信息 */
/**
 * 修改担保人信息
 * @param data
 * @returns
 */
export const updateDebtDebtor = (data: Debt.ReqUpdateDebtorParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtDebtor',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}
/**
 * 获取担保人信息
 * @param asset_debt_id
 * @returns
 */
export const readDebtDebtor = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadDebtorData>({
    url: '/web/assetDebt/getAssetDebtDebtor',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 处置节点设置 */
/**
 * 修改处置节点设置
 * @param data
 * @returns
 */
export const updateDebtNode = (data: Debt.ReqUpdateNodeParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtNode',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}
/**
 * 获取处置节点设置
 * @param asset_debt_id
 * @returns
 */
export const readDebtNode = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadNodeData>({
    url: '/web/assetDebt/getAssetDebtNode',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 担保信息 */
/**
 * 添加担保
 * @param data
 * @returns
 */
export const createDebtGuarantee = (data: Debt.ReqCreateGuaranteeParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtGuarantee',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除担保
 * @param id
 * @returns
 */
export const deleteDebtGuarantee = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtGuarantee',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑担保
 * @param data
 * @returns
 */
export const updateDebtGuarantee = (data: Debt.ReqUpdateGuaranteeParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtGuarantee',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 担保详情
 */
export const getDebtGuaranteeInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadGuaranteeData>({
    url: '/web/assetDebt/getDetailsGuarantee',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 查询担保
 * @returns
 */
export const getDebtGuaranteeList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadGuaranteeData[]>({
    url: '/web/assetDebt/getAssetDebtGuarantee',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 历史转让信息 */
/**
 * 添加历史转让信息
 * @param data
 * @returns
 */
export const createDebtTransfer = (data: Debt.ReqCreateTransferParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtTransfer',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除历史转让信息
 * @param id
 * @returns
 */
export const deleteDebtTransfer = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtTransfer',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑历史转让信息
 * @param data
 * @returns
 */
export const updateDebtTransfer = (data: Debt.ReqUpdateTransferParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtTransfer',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取历史转让信息列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtTransferList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadTransferData[]>({
    url: '/web/assetDebt/getAssetDebtTransfer',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/**
 * 历史转让信息
 */
export const getDebtTransferInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadTransferData>({
    url: '/web/assetDebt/getDetailsTransfer',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/* 房产信息 */
/**
 * 添加房产信息
 * @param data
 * @returns
 */
export const createDebtHouse = (data: Debt.ReqCreateHouseParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtHouse',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除房产信息
 * @param id
 * @returns
 */
export const deleteDebtHouse = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtHouse',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑房产信息
 * @param data
 * @returns
 */
export const updateDebtHouse = (data: Debt.ReqUpdateHouseParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtHouse',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取房产信息
 * @param id
 * @returns
 */
export const getDebtHouseInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadHouseData>({
    url: '/web/assetDebt/getDetailsDebtHouse',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取房产信息列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtHouseList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadHouseData[]>({
    url: '/web/assetDebt/getAssetDebtHouse',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 车产信息 */
/**
 * 添加车产信息
 * @param data
 * @returns
 */
export const createDebtCar = (data: Debt.ReqCreateCarParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtCar',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除车产信息
 * @param id
 * @returns
 */
export const deleteDebtCar = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtCar',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑车产信息
 * @param data
 * @returns
 */
export const updateDebtCar = (data: Debt.ReqUpdateCarParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtCar',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取车产信息
 * @param id
 * @returns
 */
export const getDebtCarInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadCarData>({
    url: '/web/assetDebt/getDetailsDebtCar',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取车产信息列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtCarList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadCarData[]>({
    url: '/web/assetDebt/getAssetDebtCar',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 申请执行人变更 */
/**
 * 添加申请执行人变更
 * @param data
 * @returns
 */
export const createDebtExecutor = (data: Debt.ReqCreateExecutorParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtExecutor',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除申请执行人变更
 * @param id
 * @returns
 */
export const deleteDebtExecutor = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtExecutor',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑申请执行人变更
 * @param data
 * @returns
 */
export const updateDebtExecutor = (data: Debt.ReqUpdateExecutorParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtExecutor',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取申请执行人变更
 * @param id
 * @returns
 */
export const getDebtExecutorInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadExecutorData>({
    url: '/web/assetDebt/getDetailsExecutor',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取申请执行人变更列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtExecutorList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadExecutorData[]>({
    url: '/web/assetDebt/getAssetDebtExecutor',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 被执行人变更、追加信息 */
/**
 * 添加被执行人变更、追加信息
 * @param data
 * @returns
 */
export const createDebtPunished = (data: Debt.ReqCreatePunishedParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtPunished',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除被执行人变更、追加信息
 * @param id
 * @returns
 */
export const deleteDebtPunished = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtPunished',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑被执行人变更、追加信息
 * @param data
 * @returns
 */
export const updateDebtPunished = (data: Debt.ReqUpdatePunishedParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtPunished',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取被执行人变更、追加信息
 * @param id
 * @returns
 */
export const getDebtPunishedInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadPunishedData>({
    url: '/web/assetDebt/getDetailsPunished',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取被执行人变更、追加信息列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtPunishedList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadPunishedData[]>({
    url: '/web/assetDebt/getAssetDebtPunished',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 处置决策 */
/**
 * 添加处置决策
 * @param data
 * @returns
 */
export const createDebtDecision = (data: Debt.ReqCreateDecisionParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtDecision',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除处置决策
 * @param id
 * @returns
 */
export const deleteDebtDecision = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtDecision',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑处置决策
 * @param data
 * @returns
 */
export const updateDebtDecision = (data: Debt.ReqUpdateDecisionParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtDecision',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取处置决策
 * @param id
 * @returns
 */
export const getDebtDecisionInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadDecisionData>({
    url: '/web/assetDebt/getDetailsDecision',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取处置决策列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtDecisionList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadDecisionData[]>({
    url: '/web/assetDebt/getAssetDebtDecision',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 处置服务信息 */
/**
 * 添加处置服务信息
 * @param data
 * @returns
 */
export const createDebtService = (data: Debt.ReqCreateServiceParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtService',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除处置服务信息
 * @param id
 * @returns
 */
export const deleteDebtService = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtService',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑处置服务信息
 * @param data
 * @returns
 */
export const updateDebtService = (data: Debt.ReqUpdateServiceParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtService',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取处置服务信息
 * @param id
 * @returns
 */
export const getDebtServiceInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadServiceData>({
    url: '/web/assetDebt/getDetailsService',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取处置服务信息列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtServiceList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadServiceData[]>({
    url: '/web/assetDebt/getAssetDebtService',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 支出费用 */
/**
 * 添加支出费用
 * @param data
 * @returns
 */
export const createDebtExpense = (data: Debt.ReqCreateExpenseParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtExpense',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除支出费用
 * @param id
 * @returns
 */
export const deleteDebtExpense = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtExpense',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑支出费用
 * @param data
 * @returns
 */
export const updateDebtExpense = (data: Debt.ReqUpdateExpenseParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtExpense',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取支出费用
 * @param id
 * @returns
 */
export const getDebtExpenseInfo = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadExpenseData>({
    url: '/web/assetDebt/getDetailsExpense',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取支出费用列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtExpenseList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadExpenseData[]>({
    url: '/web/assetDebt/getAssetDebtExpense',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 跟进记录 */
/**
 * 新增进记录列表
 * @returns
 */
export const createDebtLog = (data: Debt.ReqCreateLogParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebtFollow/createAssetDebtFollow',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除进记录列表
 * @returns
 */
export const deleteDebtLog = (data: Debt.ReqDeleteLogParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebtFollow/deleteAssetDebtFollow',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 编辑进记录列表
 * @returns
 */
export const updateDebtLog = (data: Debt.ReqUpdateLogParams) => {
  const stamp = getStamp(`${data.asset_debt_id}${data.follow_id}`)
  return http({
    url: '/web/assetDebtFollow/updateAssetDebtFollow',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 进记录列表详情
 * @returns
 */
export const readDebtLog = (data: Debt.ReqReadLogParams) => {
  const stamp = getStamp(`${data.asset_debt_id}${data.follow_id}`)
  return http<any, Debt.ResReadLogData>({
    url: '/web/assetDebtFollow/getAssetDebtFollow',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 跟进记录列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtLogList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadLogData[]>({
    url: '/web/assetDebtFollow/listsAssetDebtFollow',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 回款记录 */
/**
 * 新增回款记录
 * @returns
 */
export const createDebtReturn = (data: Debt.ReqCreateReturnParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebtCollection/createAssetDebtCollection',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除回款记录
 * @returns
 */
export const deleteDebtReturn = (data: Debt.ReqDeleteReturnParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebtCollection/deleteAssetDebtCollection',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 编辑回款记录
 * @returns
 */
export const updateDebtReturn = (data: Debt.ReqUpdateReturnParams) => {
  const stamp = getStamp(`${data.asset_debt_id}${data.collection_id}`)
  return http({
    url: '/web/assetDebtCollection/updateAssetDebtCollection',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 回款记录详情
 * @returns
 */
export const readDebtReturn = (data: Debt.ReqReadReturnParams) => {
  const stamp = getStamp(`${data.asset_debt_id}${data.collection_id}`)
  return http<any, Debt.ResReadReturnData>({
    url: '/web/assetDebtCollection/getAssetDebtCollection',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 回款记录列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtReturnList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadReturnData[]>({
    url: '/web/assetDebtCollection/listsAssetDebtCollection',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 诉讼执行情况 */
/**
 * 新增诉讼执行情况
 * @returns
 */
export const createDebtLawsuits = (data: Debt.ReqCreateLawsuitsParams) => {
  const stamp = getStamp(`${data.asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtLawsuits',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除诉讼执行情况
 * @returns
 */
export const deleteDebtLawsuits = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/deleteAssetDebtLawsuits',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑诉讼执行情况
 * @returns
 */
export const updateDebtLawsuits = (data: Debt.ReqUpdateLawsuitsParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtLawsuits',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 诉讼执行情况详情
 * @param id
 * @returns
 */
export const readDebtLawsuits = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Debt.ResReadLawsuitsData>({
    url: '/web/assetDebt/getDetailsLawsuits',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 诉讼执行情况列表
 * @param asset_debt_id
 * @returns
 */
export const getDebtLawsuitsList = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http<any, Debt.ResReadLawsuitsData[]>({
    url: '/web/assetDebt/getAssetDebtLawsuits',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/* 个人工商 */
/**
 * 获取个人工商
 * @param asset_debt_id
 * @returns
 */
export const createDebtBusiness = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http({
    url: '/web/assetDebt/createAssetDebtQueryLogGrgs',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/**
 * 查询个人工商
 * @param asset_debt_id
 * @returns
 */
export const readDebtBusiness = (asset_debt_id: number) => {
  const stamp = getStamp(`${asset_debt_id}`)
  return http({
    url: '/web/assetDebt/getAssetDebtQueryLogGrgs',
    method: 'post',
    data: {
      asset_debt_id,
      ...stamp,
    },
  })
}

/**
 * 修改产调
 * @param params
 * @returns
 */
export const updateProduce = (params: Debt.ReqUpdateProduceParams) => {
  const stamp = getStamp(`${params.id}`)
  return http({
    url: '/web/assetDebt/updateAssetDebtHouseProduceFile',
    method: 'post',
    data: {
      ...params,
      ...stamp,
    },
  })
}

/**
 * 查询产调
 * @param id
 * @returns
 */
export const readProduce = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/assetDebt/getAssetDebtHouseProduceFile',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}
