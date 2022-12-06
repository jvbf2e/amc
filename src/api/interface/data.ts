export namespace Data {
  /// 个人诉讼
  export interface ReadCPWSData {
    body: string
    dataType: string
    entryId: string
    matchRatio: number
    sortTime: number
    sortTimeString: string
    title: string
  }
  export interface ReqReadLitigationParams {
    asset_debt_id: number
    query_log_id: number
    lawsuit_id: string
    data_type: string
  }
  export interface ResReadLitigation {
    asset_debt_id: number
    query_log_id: number
    query_time: string
    params: {
      name: string
      idNumber: string
    }
    data: {
      cpws: ReadCPWSData[]
      zxgg: ReadCPWSData[]
      shixin: ReadCPWSData[]
      ktgg: ReadCPWSData[]
      fygg: ReadCPWSData[]
      ajlc: ReadCPWSData[]
      bgt: ReadCPWSData[]
    }
    status: number
    msg: string
  }

  export interface ReqReadBusinessParams {
    asset_debt_id: number
    documents_id: number
  }

  export interface ReqCreateHouseParams {
    asset_debt_id: number
    asset_debt_house_id: number
    floor: number
    total_floor: number
    toward: string
  }
}
