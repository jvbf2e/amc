import type { FieldRule, TableColumnData } from '@arco-design/web-vue'

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
        title: '员工姓名',
        dataIndex: 'name',
        ellipsis: true,
        width: 80,
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
        ellipsis: true,
        width: 110,
      },
      {
        title: '角色',
        dataIndex: 'role_list',
        slotName: 'roleList',
        width: 160,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        ellipsis: true,
        width: 130,
      },
      {
        title: '操作',
        dataIndex: 'operates',
        slotName: 'operates',
        width: 80,
      },
    ] as TableColumnData[],
  },
  drawerForm: {
    model: {
      name: '',
      phone: '',
      role_list: [] as number[],
      password: '',
      remark: '',
    },
    rules: {
      name: [{ required: true, message: '员工姓名不能为空' }],
      phone: [
        { required: true, message: '手机号码不能为空' },
        {
          match: /^1[3-9][0-9]{9}$/,
          message: '请输入正确的手机号码',
        },
      ],
      password: [
        { required: true, message: '密码不能为空' },
        {
          match: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
          message: '长度为6-16个字符，必须包含字母、数字，并且不能数字开头',
        },
      ],
    } as { [key: string]: FieldRule[] },
  },
}
