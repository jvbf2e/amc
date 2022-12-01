export default {
  table: {
    columns: [
      {
        title: '汇报日期',
        dataIndex: 'report_date',
      },
      {
        title: '债权编号',
        dataIndex: 'debt_no',
      },
      {
        title: '债务人名称',
        dataIndex: 'main_debtor_name',
      },
      {
        title: '本周进展、遇到问题及解决方案',
        dataIndex: 'this_week_progress',
      },
      {
        title: '下周计划',
        dataIndex: 'next_week_plan',
      },
      {
        title: '操作',
        dataIndex: 'options',
        slotName: 'options',
        with: 100,
      },
    ],
  },
}
