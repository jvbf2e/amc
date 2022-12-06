// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Debt {
  export interface ReqCreateParams {
    area_name: string
    asset_debt_id: number
    asset_package_id: string | number
    contract_no: string
    debt_no: string
    debt_principal_balance: undefined | number
    debt_transfer_price: undefined | number
    debt_type: string | number
    employee_id: number
    enterprise_id: number
    interest_pause_date: string
    interest_penalty_amount: undefined | number
    iou_amount: undefined | number
    loan_contract_amount: undefined | number
    loan_date: string
    loan_term_rate: undefined | number
    main_debtor_name: string
    origin_debtor_name: string
    overdue_date: string
    penalty_interest_rate: undefined | number
    principal_interest_amount: undefined | number
    project_level: string | number
  }
  export interface ReqUpdateParams extends ReqCreateParams {
    asset_debt_id: number
  }
  export interface ReqGetListParams {
    keywords?: string
    page?: number
    per_page?: number
  }
  export interface ResListItemData extends ReqUpdateParams {}
  export interface ResListData {
    data: Debt.ResListItemData[]
    total: number
  }
  export interface ResReadData extends ReqUpdateParams {}
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
  interface ObjTypes {
    [key: string]: any
  }
  export interface AssetPackageInfo extends ObjTypes {
    area_name: string
    asset_package_id: number
    collection_target: number
    collection_total: number
    deal_opponent: string
    deal_platform: string
    debt_amount: number
    debt_capital: number
    debt_count: string
    debt_interest: number
    disposal_cycle: string
    fund_source: number
    fund_subject: string
    invest_amount: number
    invest_date: string
    process_id: number
    profit_target: number
    project_desc: string
    project_leader: number
    project_member: number[]
    project_name: string
    project_no: string
    project_type: number
  }

  // debtor
  export interface DebtorItemType {
    debtor: string
    mortgagor: string
    guarantor: string
  }
  export interface ReqCreateDebtorParams {
    asset_debt_id: number
    debtor_name: DebtorItemType
    id_number: DebtorItemType
    register_address: DebtorItemType
    actual_address: DebtorItemType
    contact_way: DebtorItemType
    repayment_willing: DebtorItemType
    external_claim: DebtorItemType
    lawsuits_count: DebtorItemType
    possibility_assess: DebtorItemType
    solvency_assess: DebtorItemType
    desc: DebtorItemType
  }
  export interface ReqUpdateDebtorParams extends ReqCreateDebtorParams {}
  export interface ResReadDebtorData extends ReqUpdateDebtorParams {}

  // node
  export interface NodeItemType {
    expect_complete_date: string
    actual_complete_date: string
    risk_control_tips: string
    overdue_reason: string
    handling: string
  }
  export interface ReqCreateNodeParams {
    asset_debt_id: number
    data_connect: NodeItemType
    transfers_notice: NodeItemType
    executor_change: NodeItemType
    enforce_resume: NodeItemType
    disposal_transfer: NodeItemType
    execute_opposition: NodeItemType
    outsider_opposition: NodeItemType
    property_report: NodeItemType
    customer_lock: NodeItemType
    auction_notice: NodeItemType
    auction_success: NodeItemType
    ruling_related: NodeItemType
    auction_return: NodeItemType
    back_data: NodeItemType
    profit_date: NodeItemType
  }
  export interface ReqUpdateNodeParams {
    id: number
    asset_debt_id: number
    data_connect: string
    transfers_notice: string
    executor_change: string
    enforce_resume: string
    disposal_transfer: string
    execute_opposition: string
    outsider_opposition: string
    property_report: string
    customer_lock: string
    auction_notice: string
    auction_success: string
    ruling_related: string
    auction_return: string
    back_data: string
    profit_date: string
  }
  export interface ResReadNodeData extends ReqCreateNodeParams {
    id: number
  }

  // guarantee
  export interface ReqCreateGuaranteeParams {
    asset_debt_id: number
    guarantee_no: string
    guarantee_person: string
    mortgage_mode: string
    mortgage_goods: string
    guarantee_mode: string
    mortgage_amount: number
    pledge_amount: number
    guarantee_amount: number
  }
  export interface ReqUpdateGuaranteeParams extends ReqCreateGuaranteeParams {
    id: number
  }
  export interface ResReadGuaranteeData extends ReqUpdateGuaranteeParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // transfer
  export interface ReqCreateTransferParams {
    asset_debt_id: number
    transfer_no: string
    transfer_date: string
    transfer_person: string
    accept_person: string
    transfer_capital_amount: number
    transfer_interest_amount: number
    transfer_newspaper_name: string
    transfer_notice_record: string
  }
  export interface ReqUpdateTransferParams extends ReqCreateTransferParams {
    id: number
  }
  export interface ResReadTransferData extends ReqUpdateTransferParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // house
  export interface ReqCreateHouseParams {
    asset_debt_id: number
    city: string
    city_code: string
    obligee: string
    house_location: string
    built_up_area_of_house: number
    housing_types: string | number
    cert_type: string | number
    produce_status: string | number
    enquiry_mode: string | number
    file: { name: string; file: string }[]
  }
  export interface ReqUpdateHouseParams extends ReqCreateHouseParams {
    id: number
  }
  export interface ResReadHouseData extends ReqUpdateHouseParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // car
  export interface ReqCreateCarParams {
    asset_debt_id: number
    plate_number: string
    type: string
    owner: string
    nature_of_use: string
    brand_model: string
    vin: string
    engine_number: string
    guarantee_amount: string
  }
  export interface ReqUpdateCarParams extends ReqCreateCarParams {
    id: number
  }
  export interface ResReadCarData extends ReqUpdateCarParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // executor
  export interface ReqCreateExecutorParams {
    asset_debt_id: number
    executor_name: string
    submit_time: string
    task_list: string
    ruling_time: string
    desc: string
  }
  export interface ReqUpdateExecutorParams extends ReqCreateExecutorParams {
    id: number
  }
  export interface ResReadExecutorData extends ReqUpdateExecutorParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // Punished
  export interface ReqCreatePunishedParams {
    asset_debt_id: number
    contract_no: string
    append_subject: string
    compensate_amount: number
    ruling_content: string
    desc: string
  }
  export interface ReqUpdatePunishedParams extends ReqCreatePunishedParams {
    id: number
  }
  export interface ResReadPunishedData extends ReqUpdatePunishedParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // Decision
  export interface ReqCreateDecisionParams {
    asset_debt_id: number
    matters: string
    scheme: string
    opinion: string
    results: string
  }
  export interface ReqUpdateDecisionParams extends ReqCreateDecisionParams {
    id: number
  }
  export interface ResReadDecisionData extends ReqUpdateDecisionParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // Service
  export interface ReqCreateServiceParams {
    asset_debt_id: number
    service_name: string
    area_name: string
    entrust_term: undefined | number
    basic_cost: undefined | number
    partition_rate: undefined | number
    fee_paid: undefined | number
    node_check: string
    power_rating: string
    renewal_opinion: string
  }
  export interface ReqUpdateServiceParams extends ReqCreateServiceParams {
    id: number
  }
  export interface ResReadServiceData extends ReqUpdateServiceParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // Expense
  export interface ReqCreateExpenseParams {
    asset_debt_id: number
    expense_type: string | number
    expense_amount: number
  }
  export interface ReqUpdateExpenseParams extends ReqCreateExpenseParams {
    id: number
  }
  export interface ResReadExpenseData extends ReqUpdateExpenseParams {
    status_delete: number
    update_time: string
    create_time: string
  }

  // log
  export interface ReqCreateLogParams {
    asset_debt_id: number
    title: string
    issue_date: string
    content: string
    file: {
      name: string
      file: string
      type?: string
      size?: number
    }[]
    employee_ids: number[]
  }
  export interface ReqDeleteLogParams {
    asset_debt_id: number
    follow_ids: number[]
  }
  export interface ReqUpdateLogParams extends ReqCreateLogParams {
    follow_id: number
  }
  export interface ReqReadLogParams {
    asset_debt_id: number
    follow_id: number
  }
  export interface ResReadLogData extends ReqUpdateLogParams {}

  // Return
  export interface ReqCreateReturnParams {
    asset_debt_id: number
    collection_date: string
    collection_amount: number
    collection_type: string | number
    desc: string
  }
  export interface ReqDeleteReturnParams {
    asset_debt_id: number
    collection_ids: number[]
  }
  export interface ReqUpdateReturnParams extends ReqCreateReturnParams {
    collection_id: number
  }
  export interface ReqReadReturnParams {
    asset_debt_id: number
    collection_id: number
  }
  export interface ResReadReturnData extends ReqUpdateReturnParams {}

  // Lawsuits
  export interface ReqCreateLawsuitsParams {
    asset_debt_id: number
    lawsuits_title: string
    jurisdiction_court: string
    lawsuits_body: string
    trial_date: string
    execute_condition: string
    execute_validity: string | number
    executive_court: string
    executive_current: string
  }
  export interface ReqUpdateLawsuitsParams extends ReqCreateLawsuitsParams {
    id: number
  }
  export interface ResReadLawsuitsData extends ReqUpdateLawsuitsParams {
    match_ratio: number
    entry_id: string
    data_type: string
    status_delete: number
  }
  export interface ResListLawsuitsData {
    id: number
    asset_debt_id: number
    create_mode: number
    query_log_id: number
    lawsuits_title: string
    trial_date: string
    match_ratio: number
    entry_id: string
    data_type: string
    lawsuits_body: string
  }
  export interface ReqUpdateProduceParams {
    id: number
    file: { file: string; name: string }[]
  }
}
