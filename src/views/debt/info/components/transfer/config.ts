import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '转让次序',
        dataIndex: 'transfer_no',
        width: 120,
      },
      {
        title: '转让日期',
        dataIndex: 'transfer_date',
        width: 120,
      },
      {
        title: '转让人',
        dataIndex: 'transfer_person',
        width: 120,
      },
      {
        title: '受让人',
        dataIndex: 'accept_person',
        width: 120,
      },
      {
        title: '转让本金数额',
        dataIndex: 'transfer_capital_amount',
        width: 120,
      },
      {
        title: '转让利息数额',
        dataIndex: 'transfer_interest_amount',
        width: 120,
      },
      {
        title: '转让通知方式',
        dataIndex: 'transfer_newspaper_name',
        width: 120,
      },
      {
        title: '转让公告报纸名称、版面',
        dataIndex: 'transfer_notice_record',
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
      transfer_no: '',
      transfer_date: '',
      transfer_person: '',
      accept_person: '',
      transfer_capital_amount: 0,
      transfer_interest_amount: 0,
      transfer_newspaper_name: '',
      transfer_notice_record: '',
    } as Debt.ReqCreateTransferParams,
  },
}
