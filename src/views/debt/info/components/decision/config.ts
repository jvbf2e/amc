import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '提请决策事项',
        dataIndex: 'matters',
        width: 120,
      },
      {
        title: '提请决策理由及方案',
        dataIndex: 'scheme',
        width: 120,
      },
      {
        title: '项目负责人意见',
        dataIndex: 'opinion',
        width: 120,
      },
      {
        title: '投决会议决',
        dataIndex: 'results',
        width: 120,
      },
      {
        title: '操作',
        dataIndex: 'options',
        slotName: 'options',
        width: 120,
        ellipsis: true,
        tooltip: true,
        fixed: 'right',
      },
    ] as TableColumnData[],
  },
  form: {
    model: {
      asset_debt_id: 0,
      matters: '',
      scheme: '',
      opinion: '',
      results: '',
    } as Debt.ReqCreateDecisionParams,
  },
}
