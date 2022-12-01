export default {
  form: {},
  description: {
    debt_no: '债权编号',
    contract_no: '借款合同编号',
    asset_package_id: '所属资产包',
    debt_type: '债权类型',
    main_debtor_name: '主债务人名称',
    origin_debtor_name: '原始债务人',
    loan_contract_amount: '借款合同金额',
    iou_amount: '借据金额',
    area_name: '所属地区',
    debt_principal_balance: '债权本金余额',
    interest_penalty_amount: '利、罚息数额',
    principal_interest_amount: '本息合计',
    loan_date: '借款日期',
    overdue_date: '逾期日期',
    loan_term_rate: '借款期利率',
    interest_pause_date: '利息暂计日期',
    penalty_interest_rate: '罚息/违约金利率',
    debt_transfer_price: '本债权转让价格',
    project_level: '项目等级',
  } as { [key: string]: string },
  table: {
    columns: [
      {
        title: '债权编号',
        dataIndex: 'debt_no',
      },
      {
        title: '借款合同编号',
        dataIndex: 'contract_no',
      },
      {
        title: '最新动态',
        dataIndex: 'follow',
      },
      {
        title: '主债务人',
        dataIndex: 'main_debtor_name',
      },
      {
        title: '原始债务人',
        dataIndex: 'origin_debtor_name',
      },
      {
        title: '借款合同金额',
        dataIndex: 'loan_contract_amount',
      },
      {
        title: '借据金额',
        dataIndex: 'iou_amount',
      },
      {
        title: '债权本金余额',
        dataIndex: 'debt_principal_balance',
      },
      {
        title: '利、罚息额度',
        dataIndex: 'interest_penalty_amount',
      },
      {
        title: '本息合计',
        dataIndex: 'principal_interest_amount',
      },
      {
        title: '借款日期',
        dataIndex: 'loan_date',
      },
      {
        title: '利息暂计日期',
        dataIndex: 'interest_pause_date',
      },
      {
        title: '逾期日期',
        dataIndex: '',
      },
      {
        title: '罚息利率',
        dataIndex: 'penalty_interest_rate',
      },
      {
        title: '本债权转让价格',
        dataIndex: 'debt_transfer_price',
      },
      {
        title: '诉讼情况',
        dataIndex: 'lawsuits_condition',
      },
      {
        title: '是否超出诉讼时效',
        dataIndex: 'lawsuits_validity',
      },
      {
        title: '生效法律文书',
        dataIndex: 'lawsuits_body',
      },
      {
        title: '是否超出申请执行时效',
        dataIndex: 'execute_validity',
      },
      {
        title: '执行管辖法院',
        dataIndex: 'executive_court',
      },
      {
        title: '执行现状',
        dataIndex: '',
      },
    ],
  },
  log: {
    table: {
      columns: [
        {
          title: '回款日期',
          dataIndex: 'collection_date',
        },
        {
          title: '回款金额',
          dataIndex: 'collection_amount',
        },
        {
          title: '回款类型',
          dataIndex: 'collection_type',
          slotName: 'collection_type',
        },
        {
          title: '备注',
          dataIndex: 'desc',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 120,
        },
      ],
    },
  },
}
