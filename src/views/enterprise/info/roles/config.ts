import type { FieldRule, TableColumnData } from '@arco-design/web-vue'
import type { Role } from '@/api/interface'

export default {
  table: {
    columns: [
      {
        title: '#',
        dataIndex: 'index',
        slotName: 'index',
        align: 'center',
        width: 40,
      },
      {
        title: '角色名称',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 240,
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        width: 130,
      },
      {
        title: '操作',
        dataIndex: 'operates',
        slotName: 'operates',
        width: 80,
      },
    ] as TableColumnData[],
    pagination: {
      total: 0,
      current: 1,
    },
  },
  drawerForm: {
    model: {
      name: '',
      remark: '',
      permission_ids: [] as number[],
    } as Role.ReqRoleCreateParams,
    rules: {
      name: [{ required: true, message: '员工姓名不能为空' }],
      permission_ids: [{ required: true, message: '请选择权限' }],
    } as { [key: string]: FieldRule[] },
  },
}
