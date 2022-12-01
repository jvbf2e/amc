import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '充值类型',
        dataIndex: 'recharge_type',
        slotName: 'recharge_type',
      },
      {
        title: '充值金额(元)',
        dataIndex: 'virtual_amount',
      },
      {
        title: '支付方式',
        dataIndex: 'pay_method',
        slotName: 'pay_method',
      },
      {
        title: '充值时间',
        dataIndex: 'create_time',
      },
    ] as TableColumnData[],
  },
}
