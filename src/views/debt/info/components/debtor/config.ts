import type { TableColumnData } from '@arco-design/web-vue'

export default {
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
    ] as TableColumnData[],
  },
}
