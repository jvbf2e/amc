import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '车产号码',
        dataIndex: 'plate_number',
        width: 120,
      },
      {
        title: '车辆类型',
        dataIndex: 'type',
        width: 120,
      },
      {
        title: '车主',
        dataIndex: 'owner',
        width: 120,
      },
      {
        title: '车辆用途',
        dataIndex: 'nature_of_use',
        slotName: 'nature_of_use',
        width: 120,
      },
      {
        title: '品牌及型号',
        dataIndex: 'brand_model',
        width: 120,
      },
      {
        title: 'VIN码',
        dataIndex: 'vin',
        width: 120,
      },
      {
        title: '发动机号码',
        dataIndex: 'engine_number',
        width: 180,
      },
      // {
      //   title: '评估价格',
      //   dataIndex: 'guarantee_amount',
      // },
      // {
      //   title: '查询',
      //   dataIndex: 'guarantee_amount',
      // },
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
      plate_number: '',
      type: '',
      owner: '',
      nature_of_use: '',
      brand_model: '',
      vin: '',
      engine_number: '',
      guarantee_amount: '',
    } as Debt.ReqCreateCarParams,
  },
}
