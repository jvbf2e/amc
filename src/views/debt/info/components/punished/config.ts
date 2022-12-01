import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '借款合同编号',
        dataIndex: 'contract_no',
        width: 120,
      },
      {
        title: '被追加主体',
        dataIndex: 'append_subject',
        width: 120,
      },
      {
        title: '承债金额',
        dataIndex: 'compensate_amount',
        width: 120,
      },
      {
        title: '裁定内容',
        dataIndex: 'ruling_content',
        width: 120,
      },
      {
        title: '备注',
        dataIndex: 'desc',
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
      contract_no: '',
      append_subject: '',
      compensate_amount: 0,
      ruling_content: '',
      desc: '',
    } as Debt.ReqCreatePunishedParams,
  },
}
