import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '消费类型',
        dataIndex: 'data_name',
      },
      {
        title: '查询状态',
        dataIndex: 'is_charge',
      },
      {
        title: '扣费金额(元)',
        dataIndex: 'pay_amount',
      },
      {
        title: '操作人',
        dataIndex: 'name',
      },
      {
        title: '操作时间',
        dataIndex: 'create_time',
      },
    ] as TableColumnData[],
  },
}
