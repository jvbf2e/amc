import { Package } from '@/api/interface'
import { FieldRule } from '@arco-design/web-vue'

export default {
  form: {
    model: {
      project_no: '',
      project_name: '',
      process_id: '',
      create_date: '',
      fund_source: '',
      fund_subject: '',
      project_type: '',
      area_name: '',
      debt_count: '',
      debt_amount: undefined,
      debt_capital: undefined,
      debt_interest: undefined,
      deal_platform: '',
      deal_opponent: '',
      project_leader: '',
      project_member: [],
      invest_date: '',
      invest_amount: undefined,
      disposal_cycle: '',
      collection_target: undefined,
      collection_total: undefined,
      profit_target: undefined,
      project_desc: '',
    } as Package.ReqCreateParams,
    rules: {
      project_name: [{ required: true, message: '请输入资产包名称' }],
    } as { [key: string]: FieldRule[] },
  },
}
