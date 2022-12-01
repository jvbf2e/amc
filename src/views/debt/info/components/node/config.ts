import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '处置节点设置',
        dataIndex: 'name',
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
    ] as TableColumnData[],
  },
}
