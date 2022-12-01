import type { FieldRule } from '@arco-design/web-vue'
import type { Library } from '@/api/interface'

export default {
  table: {
    columns: [
      {
        title: '文件名',
        dataIndex: 'name',
      },
      {
        title: '文件大小',
        dataIndex: 'file_size',
        slotName: 'file_size',
      },
      {
        title: '修改时间',
        dataIndex: 'update_time',
      },
      {
        title: '上传人',
        dataIndex: 'employee_name',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        slotName: 'operate',
        width: 120,
      },
    ],
  },
  form: {
    model: {
      name: '',
      parent_id: 0,
      source_type: 0,
    } as Library.ReqCreateParams,
    rules: {
      name: [{ required: true, message: '请输入目录名称' }] as FieldRule[],
    },
  },
}
