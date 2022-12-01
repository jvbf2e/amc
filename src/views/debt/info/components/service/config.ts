import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '服务商名称',
        dataIndex: 'service_name',
        width: 120,
      },
      {
        title: '所在区域',
        dataIndex: 'area_name',
        width: 120,
      },
      {
        title: '委托限期',
        dataIndex: 'entrust_term',
        width: 120,
      },
      {
        title: '基础费用',
        dataIndex: 'basic_cost',
        width: 120,
      },
      {
        title: '回款分配比例',
        dataIndex: 'partition_rate',
        width: 120,
      },
      {
        title: '已付费用',
        dataIndex: 'fee_paid',
        width: 120,
      },
      {
        title: '节点考核',
        dataIndex: 'node_check',
        width: 120,
      },
      {
        title: '能力评级',
        dataIndex: 'power_rating',
        width: 120,
      },
      {
        title: '续约意见',
        dataIndex: 'renewal_opinion',
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
      service_name: '',
      area_name: '',
      entrust_term: '',
      basic_cost: 0,
      partition_rate: 0,
      fee_paid: 0,
      node_check: '',
      power_rating: '',
      renewal_opinion: '',
    } as Debt.ReqCreateServiceParams,
  },
}
