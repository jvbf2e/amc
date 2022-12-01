export default {
  car: {
    table: {
      columns: [
        {
          title: '车产号码',
          dataIndex: 'plate_number',
        },
        {
          title: '车辆类型',
          dataIndex: 'type',
        },
        {
          title: '车主',
          dataIndex: 'owner',
        },
        {
          title: '车辆用途',
          dataIndex: 'nature_of_use',
        },
        {
          title: '品牌及型号',
          dataIndex: 'brand_model',
        },
        {
          title: 'VIN码',
          dataIndex: 'vin',
        },
        {
          title: '发动机号码',
          dataIndex: 'engine_number',
        },
        {
          title: '评估价格',
          dataIndex: 'guarantee_amount',
        },
        {
          title: '查询',
          dataIndex: 'guarantee_amount',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  debtor: {
    table: {
      columns: [
        {
          title: '',
          dataIndex: 'name',
        },
        {
          title: '主债务人',
          dataIndex: 'debtor',
        },
        {
          title: '抵/质押人',
          dataIndex: 'mortgagor',
        },
        {
          title: '保证人',
          dataIndex: 'guarantor',
        },
      ],
    },
  },
  decision: {
    table: {
      columns: [
        {
          title: '提请决策事项',
          dataIndex: 'contract_no',
        },
        {
          title: '提请决策理由及方案',
          dataIndex: 'expect_complete_date',
        },
        {
          title: '项目负责人意见',
          dataIndex: 'actual_complete_date',
        },
        {
          title: '投决会议决',
          dataIndex: 'risk_control_tips',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  executor: {
    table: {
      columns: [
        {
          title: '原申请执行人',
          dataIndex: 'executor_name',
        },
        {
          title: '变更申请人申请书提交时间',
          dataIndex: 'submit_time',
        },
        {
          title: '变更申请人待完成事务',
          dataIndex: 'task_list',
        },
        {
          title: '变更申请人裁定做出时间',
          dataIndex: 'ruling_time',
        },
        {
          title: '备注',
          dataIndex: 'desc',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  expense: {
    table: {
      columns: [
        {
          title: '更新日期',
          dataIndex: 'update_date',
        },
        {
          title: '支出类型',
          dataIndex: 'expense_type',
        },
        {
          title: '支出金额',
          dataIndex: 'expense_amount',
        },
        {
          title: '备注',
          dataIndex: 'basic_cost',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  guarantee: {
    table: {
      columns: [
        {
          title: '担保合同编号',
          dataIndex: 'guarantee_no',
        },
        {
          title: '担保人',
          dataIndex: 'guarantee_person',
        },
        {
          title: '抵押方式',
          dataIndex: 'mortgage_mode',
        },
        {
          title: '抵押物品',
          dataIndex: 'mortgage_goods',
        },
        {
          title: '保证方式',
          dataIndex: 'guarantee_mode',
        },
        {
          title: '抵押金额',
          dataIndex: 'mortgage_amount',
        },
        {
          title: '质押金额',
          dataIndex: 'pledge_amount',
        },
        {
          title: '保证金额',
          dataIndex: 'guarantee_amount',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  house: {
    table: {
      columns: [
        {
          title: '城市',
          dataIndex: 'city',
        },
        {
          title: '权利人',
          dataIndex: 'obligee',
        },
        {
          title: '详细地址',
          dataIndex: 'house_location',
        },
        {
          title: '面积(m²)',
          dataIndex: 'built_up_area_of_house',
        },
        {
          title: '住宅类型',
          dataIndex: 'housing_types',
        },
        {
          title: '产调抵押状态',
          dataIndex: 'produce_status',
        },
        {
          title: '评估价格(万)',
          dataIndex: 'pledge_amount',
        },
        {
          title: '评估时间',
          dataIndex: 'guarantee_amount',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  node: {
    table: {
      columns: [
        {
          title: '处置节点设置',
          dataIndex: 'contract_no',
        },
        {
          title: '预设完成日期',
          dataIndex: 'expect_complete_date',
        },
        {
          title: '实际完成日期',
          dataIndex: 'actual_complete_date',
        },
        {
          title: '风控提示',
          dataIndex: 'risk_control_tips',
        },
        {
          title: '逾期原因分析',
          dataIndex: 'overdue_reason',
        },
        {
          title: '处理方式',
          dataIndex: 'handling',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  punished: {
    table: {
      columns: [
        {
          title: '借款合同编号',
          dataIndex: 'contract_no',
        },
        {
          title: '被追加主体',
          dataIndex: 'append_subject',
        },
        {
          title: '承债金额',
          dataIndex: 'compensate_amount',
        },
        {
          title: '裁定内容',
          dataIndex: 'ruling_content',
        },
        {
          title: '备注',
          dataIndex: 'desc',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  transfer: {
    table: {
      columns: [
        {
          title: '转让次序',
          dataIndex: 'transfer_no',
        },
        {
          title: '转让日期',
          dataIndex: 'transfer_date',
        },
        {
          title: '转让人',
          dataIndex: 'transfer_person',
        },
        {
          title: '受让人',
          dataIndex: 'accept_person',
        },
        {
          title: '转让本金数额',
          dataIndex: 'transfer_capital_amount',
        },
        {
          title: '转让利息数额',
          dataIndex: 'transfer_interest_amount',
        },
        {
          title: '转让通知方式',
          dataIndex: 'pledge_amount',
        },
        {
          title: '转让公告报纸名称、版面',
          dataIndex: 'guarantee_amount',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
  service: {
    table: {
      columns: [
        {
          title: '服务商名称',
          dataIndex: 'service_name',
        },
        {
          title: '所在区域',
          dataIndex: 'area_name',
        },
        {
          title: '委托限期',
          dataIndex: 'entrust_term',
        },
        {
          title: '基础费用',
          dataIndex: 'basic_cost',
        },
        {
          title: '回款分配比例',
          dataIndex: 'partition_rate',
        },
        {
          title: '已付费用',
          dataIndex: 'fee_paid',
        },
        {
          title: '节点考核',
          dataIndex: 'node_check',
        },
        {
          title: '能力评级',
          dataIndex: 'power_rating',
        },
        {
          title: '续约意见',
          dataIndex: 'renewal_opinion',
        },
        {
          title: '操作',
          dataIndex: 'options',
          slotName: 'options',
          width: 100,
        },
      ],
    },
  },
}
