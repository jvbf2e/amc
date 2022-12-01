import type { TableColumnData } from '@arco-design/web-vue'

export default {
  dynamic: {
    table: {
      columns: [
        {
          title: '项目',
          dataIndex: 'project_name',
          slotName: 'project_name',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '最新动态',
          dataIndex: 'title',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '债权编号',
          dataIndex: 'debt_no',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '立项时间',
          dataIndex: 'create_time',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '累计天数',
          dataIndex: 'days',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '项目等级',
          dataIndex: 'project_level',
          slotName: 'project_level',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '任务进度',
          dataIndex: 'process_name',
          ellipsis: true,
          tooltip: true,
        },
      ] as TableColumnData[],
    },
  },
}
