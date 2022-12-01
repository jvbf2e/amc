import type { Debt } from '@/api/interface'
import type { TableColumnData } from '@arco-design/web-vue'

export default {
  table: {
    columns: [
      {
        title: '城市',
        dataIndex: 'city',
        width: 120,
      },
      {
        title: '权利人',
        dataIndex: 'obligee',
        width: 120,
      },
      {
        title: '详细地址',
        dataIndex: 'house_location',
        width: 120,
      },
      {
        title: '面积(m²)',
        dataIndex: 'built_up_area_of_house',
        width: 120,
      },
      {
        title: '住宅类型',
        dataIndex: 'housing_types',
        slotName: 'housing_types',
        width: 120,
      },
      {
        title: '产调抵押状态',
        dataIndex: 'produce_status',
        slotName: 'produce_status',
        width: 160,
      },
      {
        title: '评估价格(万)',
        dataIndex: 'enquiry_price',
        slotName: 'enquiry_price',
        width: 160,
      },
      {
        title: '评估时间',
        dataIndex: 'enquiry_date',
        slotName: 'enquiry_date',
        width: 120,
      },
      {
        title: '操作',
        dataIndex: 'options',
        slotName: 'options',
        width: 160,
        ellipsis: true,
        tooltip: true,
        fixed: 'right',
      },
    ] as TableColumnData[],
  },
  form: {
    model: {
      asset_debt_id: 0,
      city: '',
      city_code: '',
      obligee: '',
      house_location: '',
      built_up_area_of_house: 0,
      housing_types: '',
      cert_type: 1,
      produce_status: '',
      enquiry_mode: 2,
      file: [],
    } as Debt.ReqCreateHouseParams,
  },
}
