export default {
  table: {
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '发布人',
        dataIndex: 'employee_name',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '发布日期',
        dataIndex: 'issue_date',
      },
      {
        title: '事件内容',
        dataIndex: 'content',
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
