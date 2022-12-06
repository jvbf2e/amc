import type { Debt } from '@/api/interface'
import type { FieldRule } from '@arco-design/web-vue'

export default {
  form: {
    model: {
      debt_no: '',
      contract_no: '',
      asset_package_id: '',
      debt_type: '',
      main_debtor_name: '',
      origin_debtor_name: '',
      loan_contract_amount: undefined,
      iou_amount: undefined,
      area_name: '',
      debt_principal_balance: undefined,
      interest_penalty_amount: undefined,
      principal_interest_amount: undefined,
      loan_date: '',
      overdue_date: '',
      loan_term_rate: undefined,
      interest_pause_date: '',
      penalty_interest_rate: undefined,
      debt_transfer_price: undefined,
      project_level: '',
    } as Debt.ReqCreateParams,
    rules: {
      debt_no: [{ required: true, message: '请输入债权编号' }],
      contract_no: [{ required: true, message: '请输入借款合同编号' }],
      asset_package_id: [{ required: true, message: '请选择所属资产包' }],
    } as { [key: string]: FieldRule[] },
  },
}
