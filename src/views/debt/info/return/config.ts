import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '回款日期',
        dataIndex: 'collection_date',
        width: 100,
      },
      {
        title: '回款金额',
        dataIndex: 'collection_amount',
        width: 100,
      },
      {
        title: '回款类型',
        dataIndex: 'collection_type',
        width: 100,
      },
      {
        title: '备注',
        dataIndex: 'desc',
        slotName: 'desc',
        width: 220,
      },
      {
        title: '操作',
        dataIndex: 'options',
        slotName: 'options',
        width: 80,
      },
    ] as TableColumnData[],
  },
}
