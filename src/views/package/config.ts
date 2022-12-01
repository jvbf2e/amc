import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '项目编号',
        dataIndex: 'project_no',
        width: 120,
        ellipsis: true,
        tooltip: true,
        fixed: 'left',
      },
      {
        title: '资产包名称',
        dataIndex: 'project_name',
        slotName: 'project_name',
        width: 120,
        ellipsis: true,
        tooltip: true,
        fixed: 'left',
      },
      {
        title: '入库时间',
        dataIndex: 'create_date',
      },
      {
        title: '项目类型',
        dataIndex: 'project_type',
      },
      {
        title: '所属区域',
        dataIndex: 'area_name',
      },
      {
        title: '项目负责人',
        dataIndex: 'project_leader',
      },
      {
        title: '项目组成员',
        dataIndex: 'project_member',
      },
      {
        title: '交易对手',
        dataIndex: 'deal_opponent',
      },
      {
        title: '操作',
        dataIndex: 'options',
        slotName: 'options',
        width: 120,
        fixed: 'right',
      },
    ] as TableColumnData[],
    scroll: {
      x: 1500,
    },
  },
  form: {
    model: {
      project_no: '',
      project_name: '',
      process_id: 0,
      fund_source: undefined as undefined | number,
      fund_subject: '',
      project_type: undefined as undefined | number,
      area_name: '',
      debt_count: '',
      debt_amount: 0,
      debt_capital: 0,
      debt_interest: 0,
      deal_platform: '',
      deal_opponent: '',
      project_leader: undefined as undefined | number,
      project_member: [] as number[],
      invest_date: '',
      invest_amount: 0,
      disposal_cycle: '',
      collection_target: 0,
      collection_total: 0,
      profit_target: 0,
      project_desc: '',
    },
    rules: {
      project_name: [{ request: true, message: '请输入资产包名称' }],
    },
  },
}

export const addFormData = {
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
  f: '',
  g: '',
  h: '',
  i: '',
  j: '',
  k: '',
  l: '',
  m: '',
  n: '',
  o: '',
  p: '',
  q: '',
  r: '',
  s: '',
  t: '',
  u: '',
  v: '',
  w: '',
}

export const addFormColumn = [
  {
    prop: 'a',
    label: '项目编号',
  },
  {
    prop: 'b',
    label: '项目名称',
  },
  {
    prop: 'c',
    label: '项目阶段',
    type: 'select',
  },
  {
    prop: 'd',
    label: '创建时间',
    type: 'date',
  },
  {
    prop: 'e',
    label: '资金来源',
    type: 'select',
  },
  {
    prop: 'f',
    label: '出资主体',
    type: 'select',
  },
  {
    prop: 'g',
    label: '项目类型',
  },
  {
    prop: 'h',
    label: '所属地域',
  },
  {
    prop: 'i',
    label: '债权户数',
  },
  {
    prop: 'j',
    label: '债权总额',
    suffix: '元',
  },
  {
    prop: 'k',
    label: '债权本金',
    suffix: '元',
  },
  {
    prop: 'l',
    label: '债权利息',
    suffix: '元',
  },
  {
    prop: 'm',
    label: '交易平台',
  },
  {
    prop: 'n',
    label: '交易对手',
  },
  {
    prop: 'o',
    label: '项目负责人',
    type: 'select',
  },
  {
    prop: 'p',
    label: '项目组成员',
  },
  {
    prop: 'q',
    label: '投资日期',
    type: 'date',
  },
  {
    prop: 'r',
    label: '投资总额',
    suffix: '元',
  },
  {
    prop: 's',
    label: '处置周期',
  },
  {
    prop: 't',
    label: '回款目标',
  },
  {
    prop: 'u',
    label: '回款累计',
  },
  {
    prop: 'v',
    label: '利润目标',
  },
  {
    prop: 'w',
    label: '项目综述',
  },
]

export const addTableColumn = [
  {
    prop: 'a',
    label: '债权编号',
    minWidth: 100,
  },
  {
    prop: 'b',
    label: '债权合同编号',
    minWidth: 140,
  },
  {
    prop: 'c',
    label: '最新动态',
    minWidth: 140,
  },
  {
    prop: 'd',
    label: '所属资产包',
    minWidth: 140,
  },
  {
    prop: 'e',
    label: '主债务人',
    minWidth: 140,
  },
  {
    prop: 'f',
    label: '原始债务人',
    minWidth: 140,
  },
  {
    prop: 'g',
    label: '借款合同金额',
    minWidth: 140,
  },
  {
    prop: 'h',
    label: '借据金额',
    minWidth: 140,
  },
  {
    prop: 'i',
    label: '债权本金余额',
    minWidth: 140,
  },
  {
    prop: 'j',
    label: '利、罚息额度',
    minWidth: 140,
  },
  {
    prop: 'k',
    label: '本息合计',
    minWidth: 140,
  },
  {
    prop: 'l',
    label: '借款日',
    minWidth: 140,
  },
  {
    prop: 'm',
    label: '利息暂计日',
    minWidth: 140,
  },
  {
    prop: 'n',
    label: '逾期日',
    minWidth: 140,
  },
  {
    prop: 'o',
    label: '罚息利率',
    minWidth: 140,
  },
  {
    prop: 'p',
    label: '本债权转让价格',
    minWidth: 140,
  },
  {
    prop: 'q',
    label: '诉讼情况',
    minWidth: 140,
  },
  {
    prop: 'r',
    label: '是否超出诉讼时效',
    minWidth: 140,
  },
  {
    prop: 's',
    label: '生效法律文书',
    minWidth: 140,
  },
  {
    prop: 't',
    label: '是否超出申请执行时效',
    minWidth: 180,
  },
  {
    prop: 'u',
    label: '执行管辖法院',
    minWidth: 140,
  },
  {
    prop: 'v',
    label: '执行现状',
    minWidth: 140,
  },
]
