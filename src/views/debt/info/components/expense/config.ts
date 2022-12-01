import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '更新日期',
        dataIndex: 'update_date',
        slotName: 'update_date',
      },
      {
        title: '支出类型',
        dataIndex: 'expense_type',
        slotName: 'expense_type',
      },
      {
        title: '支出金额',
        dataIndex: 'expense_amount',
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
      expense_type: '',
      expense_amount: 0,
    } as Debt.ReqCreateExpenseParams,
  },
}
