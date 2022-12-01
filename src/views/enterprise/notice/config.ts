import { Enterprise } from '@/api/interface'
import type { FieldRule, TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
        width: 340,
      },
      {
        title: '发布时间',
        dataIndex: 'create_time',
        width: 180,
      },
      {
        title: '操作',
        dataIndex: 'operates',
        slotName: 'operates',
        width: 80,
      },
    ] as TableColumnData[],
  },
  form: {
    model: {
      title: '',
      content: '',
      file: [],
    } as Enterprise.ReqEnterpriseNoticeCreateParams,
    rules: {
      title: [{ required: true, message: '请输入标题' }],
      content: [{ required: true, message: '请输入内容' }],
    } as { [key: string]: FieldRule[] },
  },
}
