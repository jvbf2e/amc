import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '担保合同编号',
        dataIndex: 'guarantee_no',
        width: 160,
      },
      {
        title: '担保人',
        dataIndex: 'guarantee_person',
        width: 120,
      },
      {
        title: '抵押方式',
        dataIndex: 'mortgage_mode',
        width: 120,
      },
      {
        title: '抵押物品',
        dataIndex: 'mortgage_goods',
        width: 120,
      },
      {
        title: '保证方式',
        dataIndex: 'guarantee_mode',
        width: 120,
      },
      {
        title: '抵押金额',
        dataIndex: 'mortgage_amount',
        width: 120,
      },
      {
        title: '质押金额',
        dataIndex: 'pledge_amount',
        width: 120,
      },
      {
        title: '保证金额',
        dataIndex: 'guarantee_amount',
        width: 120,
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
      guarantee_no: '',
      guarantee_person: '',
      mortgage_mode: '',
      mortgage_goods: '',
      guarantee_mode: '',
      mortgage_amount: 0,
      pledge_amount: 0,
      guarantee_amount: 0,
    } as Debt.ReqCreateGuaranteeParams,
  },
}
