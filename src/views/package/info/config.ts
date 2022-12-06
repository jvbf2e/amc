import type { TableColumnData } from '@arco-design/web-vue'

export default {
  form: {},
  description: {
    project_no: '项目编号',
    project_name: '资产包名称',
    process_id: '项目阶段',
    create_date: '创建时间',
    fund_source: '资金来源',
    fund_subject: '出资主体',
    project_type: '项目类型',
    area_name: '所属地区',
    debt_count: '债权户数',
    debt_amount: '债权总额(元)',
    debt_capital: '债权本金(元)',
    debt_interest: '债权利息(元)',
    deal_platform: '交易平台',
    deal_opponent: '交易对手',
    project_leader: '项目负责人',
    project_member: '项目组成员',
    invest_date: '投资日期',
    invest_amount: '投资总额(元)',
    disposal_cycle: '处置周期(天)',
    collection_target: '回款目标(元)',
    collection_total: '回款累计(元)',
    profit_target: '利润目标(元)',
    project_desc: '项目综述',
  } as { [key: string]: string },
  table: {
    columns: [
      {
        title: '债权编号',
        dataIndex: 'debt_no',
        slotName: 'debt_no',
        width: 120,
        ellipsis: true,
        tooltip: true,
        fixed: 'left',
      },
      {
        title: '借款合同编号',
        dataIndex: 'contract_no',
        width: 120,
        ellipsis: true,
        tooltip: true,
        fixed: 'left',
      },
      {
        title: '最新动态',
        dataIndex: 'follow',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '主债务人',
        dataIndex: 'main_debtor_name',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '原始债务人',
        dataIndex: 'origin_debtor_name',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '借款合同金额',
        dataIndex: 'loan_contract_amount',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '借据金额',
        dataIndex: 'iou_amount',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '债权本金余额',
        dataIndex: 'debt_principal_balance',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '利、罚息额度',
        dataIndex: 'interest_penalty_amount',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '本息合计',
        dataIndex: 'principal_interest_amount',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '借款日期',
        dataIndex: 'loan_date',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '利息暂计日期',
        dataIndex: 'interest_pause_date',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      // {
      //   title: '逾期日期',
      //   dataIndex: '',
      //   width: 120,
      //   ellipsis: true,
      //   tooltip: true,
      // },
      {
        title: '罚息利率',
        dataIndex: 'penalty_interest_rate',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '本债权转让价格',
        dataIndex: 'debt_transfer_price',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '诉讼情况',
        dataIndex: 'lawsuits_condition',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '是否超出诉讼时效',
        dataIndex: 'lawsuits_validity',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '生效法律文书',
        dataIndex: 'lawsuits_body',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '是否超出申请执行时效',
        dataIndex: 'execute_validity',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: '执行管辖法院',
        dataIndex: 'executive_court',
        width: 120,
        ellipsis: true,
        tooltip: true,
      },
      // {
      //   title: '执行现状',
      //   dataIndex: '',
      //   width: 120,
      //   ellipsis: true,
      //   tooltip: true,
      // },
      {
        title: '操作',
        dataIndex: 'operates',
        slotName: 'operates',
        width: 120,
        fixed: 'right',
      },
    ] as TableColumnData[],
  },
}
