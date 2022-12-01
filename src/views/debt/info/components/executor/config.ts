import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '原申请执行人',
        dataIndex: 'executor_name',
        width: 120,
      },
      {
        title: '变更申请人申请书提交时间',
        dataIndex: 'submit_time',
        width: 200,
      },
      {
        title: '变更申请人待完成事务',
        dataIndex: 'task_list',
        width: 180,
      },
      {
        title: '变更申请人裁定做出时间',
        dataIndex: 'ruling_time',
        width: 200,
      },
      {
        title: '备注',
        dataIndex: 'desc',
        width: 160,
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
      executor_name: '',
      submit_time: '',
      task_list: '',
      ruling_time: '',
      desc: '',
    } as Debt.ReqCreateExecutorParams,
  },
}
