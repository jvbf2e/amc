import type { Debt, ReqPage } from '.'

type ObjectType = {
  [key: string]: any
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Package {
  export interface ReqCreateParams extends ObjectType {
    project_no: string
    project_name: string
    process_id: string | number
    create_date: string
    fund_source: string | number
    fund_subject: string
    project_type: string | number
    area_name: string
    debt_count: string
    debt_amount: undefined | number
    debt_capital: undefined | number
    debt_interest: undefined | number
    deal_platform: string
    deal_opponent: string
    project_leader: string | number
    project_member: number[]
    invest_date: string
    invest_amount: undefined | number
    disposal_cycle: string
    collection_target: undefined | number
    collection_total: undefined | number
    profit_target: undefined | number
    project_desc: string
  }
  export interface ReqDeletePackageDebtParams {
    asset_package_id: number
    asset_debt_ids: number[]
  }
  export interface ReqUpdateParams extends ReqCreateParams {
    asset_package_id: number
  }
  export interface ReqGetListParams {
    keywords?: string
    page?: number
    per_page?: number
  }
  // info
  export interface ResGetInfoData {
    assert_package: AssetPackageInfo
    asset_package_process: {
      process_id: number
      process_name: string
    }[]
    employee_lists: {
      employee_id: number
      employee_name: string
    }[]
    assert_debt_lists: Debt.ReqUpdateParams[]
  }
  export interface AssetPackageInfo extends ReqUpdateParams {}

  // weekly
  export interface ReqWeeklyCreateParams {
    asset_package_id: number
    asset_debt_id: string | number
    report_date: string
    this_week_progress?: string
    next_week_plan?: string
  }
  export interface ReqWeeklyDeleteParams {
    asset_package_id: number
    weekly_ids: number[]
  }
  export interface ReqWeeklyUpdateParams extends ReqWeeklyCreateParams {
    weekly_id: number
  }
  export interface ReqWeeklyReadParams {
    asset_package_id: number
    weekly_id: number
  }
  export interface ResReadWeekly {
    weekly_id: number
    asset_package_id: number
    asset_debt_id: number
    report_date: string
    this_week_progress: string
    next_week_plan: string
  }
  export interface ReqGetWeeklyListParams extends ReqPage {
    asset_package_id: number
  }

  // log
  export interface ReqCreateLogParams {
    asset_package_id: number
    title: string
    type: string | number
    issue_date: string
    label: string | number
    content: string
    file: {
      name: string
      file: string
    }[]
    employee_ids: number[]
  }
  export interface ReqDeleteLogParams {
    asset_package_id: number
    log_ids: number[]
  }
  export interface ReqUpdateLogParams extends ReqCreateLogParams {
    log_id: number
  }
  export interface ResReadLogData extends ReqUpdateLogParams {}
  export interface ReqLogReadParams {
    asset_package_id: number
    log_id: number
  }
  export interface ReqGetLogListParams extends ReqPage {
    asset_package_id: number
  }
}
