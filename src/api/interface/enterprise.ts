import type { ReqPage, ResPage } from '.'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Enterprise {
  export interface ReqEnterpriseForm {
    name: string
    logo_url: string
  }
  export interface ResLogin {
    access_token: string
  }
  export interface ResAuthButtons {
    [propName: string]: any
  }

  /// Cost
  // Cost - account
  export interface ReqEnterpriseCostAccountListParams extends ReqPage {
    recharge_type?: string | number
    pay_method?: string | number
    begin_time?: string
    end_time?: string
  }
  export interface ResEnterpriseCostAccountItemData {
    id: number
    amount: number
    virtual_amount: number
    create_time: string
    recharge_type: number
    pay_method: number
  }
  export interface ResEnterpriseCostAccountData {
    enterprise_amount: number
    page_list: ResPage<Enterprise.ResEnterpriseCostAccountItemData>
  }
  // Cost - detailed
  export interface ReqEnterpriseCostDetailedListParams extends ReqPage {
    d_id?: string | number
    employee_id?: string | number
    begin_time?: string
    end_time?: string
  }
  export interface ResEnterpriseCostDetailedItemData {
    name: string
    create_time: string
    pay_amount: string
    is_charge: string
    data_name: string
  }

  /// Notice
  export interface FileItem {
    file_name: string
    file_path: string
  }
  export interface ReqEnterpriseNoticeCreateParams {
    title: string
    content: string
    file: FileItem[]
  }
  export interface ReqEnterpriseNoticeUpdateParams {
    record_id: number
    title: string
    content: string
    files: { name: string; file: string; type: 'file' | 'image' | 'video' }[]
  }
  export interface ResEnterpriseNoticeReadData
    extends ReqEnterpriseNoticeUpdateParams {}
  export interface ReqGetEnterpriseNoticeListParams extends ReqPage {}
  export interface ResEnterpriseNoticeItemData
    extends ReqEnterpriseNoticeUpdateParams {}
}
