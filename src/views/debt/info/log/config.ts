import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
        width: 100,
      },
      {
        title: '发布人',
        dataIndex: 'employee_name',
        width: 80,
      },
      {
        title: '内容',
        dataIndex: 'content',
        width: 120,
      },
      {
        title: '附件',
        dataIndex: 'file',
        slotName: 'file',
        width: 120,
      },
      {
        title: '发布日期',
        dataIndex: 'issue_date',
        width: 100,
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
