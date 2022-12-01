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
      debt_amount: 0,
      debt_capital: 0,
      debt_interest: 0,
      deal_platform: '',
      deal_opponent: '',
      project_leader: '',
      project_member: [],
      invest_date: '',
      invest_amount: 0,
      disposal_cycle: '',
      collection_target: 0,
      collection_total: 0,
      profit_target: 0,
      project_desc: '',
    } as Package.ReqCreateParams,
    rules: {
      project_name: [{ required: true, message: '请输入资产包名称' }],
    } as { [key: string]: FieldRule[] },
  },
}
