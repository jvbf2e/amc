// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Home {
  export interface ResReadHomePackageInfoData {
    year: string
    invest_amount: number
    debt_amount: number
    collection_total: number
    rate: number
  }

  export interface EmployeeInfo {
    name: string
    phone: string
    image: string
    url: string
    employee_count: number
    role_count: number
    online_count: number
  }
  export interface NoticeItem {
    notice_id: number
    status_view: number
    title: string
    create_time: string
  }
  export interface DynamicItem {
    asset_debt_id: number
    asset_package_id: number
    project_name: string
    title: string
    debt_no: string
    create_time: string
    days: number
    project_level: string
    process_name: string
  }
  export interface InventoryCarbonCopyItem {
    object_id: number
    object_type: number
    status_view: number
    title: string
    create_time: string
  }
  export interface ResReadHomeInventoryListData {
    unfinished: any[]
    finished: any[]
    carbon_copy: Home.InventoryCarbonCopyItem[]
  }

  export interface ResUpdatePassword {
    old_password: string
    new_password: string
    new_password_repeat: string
  }

  export interface ResReadHomeNotice {
    record_id: number
    title: string
    content: string
    files: { name: string; file: string; type: 'file' | 'image' | 'video' }[]
  }
}
