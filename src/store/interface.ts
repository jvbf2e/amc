import type { App, Debt, Enterprise, Home, Library } from '@/api/interface'
import type { TreeNodeData } from '@arco-design/web-vue'

/* PaginationState */
export interface PaginationState {
  total?: number
  current?: number
}

/* themeConfigProp */
export interface ThemeConfigProp {
  primary: string
  isDark: boolean
}

/* GlobalState */
export interface GlobalState {
  token: string
  userInfo: any
  assemblySize: string
  language: string
  themeConfig: ThemeConfigProp
  sign: boolean
  autoStart: number
}

/* TabsState */
export interface TabsState {
  tabsMenuValue: string
}

/* HomeState */
export interface HomeState {
  statistics: Home.ResReadHomePackageInfoData
  inventory: Home.ResReadHomeInventoryListData
  dynamic: Home.DynamicItem[]
  notice: Home.NoticeItem[]
  employee: Home.EmployeeInfo
}

/* AuthState */
export interface AppMenuItem {
  name: string
  path: string
  icon: string
  children: AppMenuItem[]
}
export interface AuthState {
  router: AppMenuItem[]
  authButtons: {
    [propName: string]: any
  }
  authRouter: string[]
}

/* AppStore */
export type MessageType = 'success' | 'warning' | 'danger' | 'info' | 'loading'
export interface MessageConfig {
  id?: string
  content?: string
  duration?: number
  type?: MessageType
  closable?: boolean
}
export interface AppInfo {
  ent_id: number
  ent_name: string
  name: string
  phone: string
  role_list: string[]
  is_bind_wechat: number
  wechat_nickname: string
  image: string
}
export interface AppState {
  routes: App.ResMenuItemData[]
  menus: {
    [key: string]: any
  }
  info: AppInfo
  dicts: {
    [key: string]: any
  }
  city: { label: string; key: string }[]
  messages: MessageConfig[]
  loading: boolean
}

/* EnterpriseStore */
export interface EnterpriseInfo {
  enterprise_name: string
  begin_time: number
  end_time: number
  use_number: number
  accounts_number: number
  version_type: string
  logo_url: {
    url: string
    uri: string
  }
  today_online_number: number
  yesterday_online_number: number
}
export interface EnterpriseState {
  info: EnterpriseInfo
  cost: {
    enterprise_amount: number
    table: {
      data: Enterprise.ResEnterpriseCostAccountItemData[]
      pagination: PaginationState
    }
  }
  detailed: {
    table: {
      data: Enterprise.ResEnterpriseCostDetailedItemData[]
      pagination: PaginationState
    }
  }
  notice: {
    table: {
      data: Enterprise.ResEnterpriseNoticeItemData[]
      pagination: PaginationState
    }
  }
}

/* UserState */
export interface UserTableItem {
  id: number
  name: string
  phone: string
  remark: string
  is_admin: number
  role_list: string[]
}
export interface UserState {
  table: {
    data: UserTableItem[]
    pagination: PaginationState
  }
}

/* RoleState */
export interface RoleAllItem {
  id: number
  name: string
}
export interface RoleTableItem {
  id: number
  name: string
  remark: string
  create_time: string
}
export interface RoleMenuItem {
  id: number
  parent_id: number
  name: string
  status_delete: number
  view_url: string
  file_url: string
  router_url: string
  icon: string | null
  sort: number
  type: number
  create_time: number
  auth_mark: string | null
  children?: RoleMenuItem[]
  auth_list?: RoleMenuItem[]
}
export interface RoleState {
  all: RoleAllItem[]
  table: {
    data: RoleTableItem[]
    pagination: PaginationState
  }
  allMenuTree: RoleMenuItem[]
  permission: RoleMenuItem[]
  tree: {
    checkedKeys: number[]
    indeterminateKeys: number[]
    default: { [key: number]: number[] }
  }
}

/* PackageState */
export interface PackageListItem {
  asset_package_id: number
  project_no: string
  project_name: string
  create_time: string
  project_type: string
  area_name: string
  project_leader: string
  project_member: number
  deal_opponent: string
}
export interface PackageState {
  table: {
    data: PackageListItem[]
    pagination: PaginationState
  }
  info: {
    asset_package_id: number
  }
  weekly: {
    table: {
      data: PackageListItem[]
      pagination: PaginationState
    }
  }
  log: {
    table: {
      data: PackageListItem[]
      pagination: PaginationState
    }
  }
}

/* DebtState */
export interface DebtState {
  table: {
    data: Debt.ResListItemData[]
    pagination: PaginationState
  }
  info: {
    asset_package_id: number
    debt_type: number
  }
  weekly: {
    table: {
      data: Debt.ResListItemData[]
      pagination: PaginationState
    }
  }
  log: {
    table: {
      data: Debt.ResReadLogData[]
      pagination: PaginationState
    }
  }
  return: {
    table: {
      data: Debt.ResReadReturnData[]
      pagination: PaginationState
    }
  }
  lawsuits: {
    table: {
      data: Debt.ResReadLawsuitsData[]
      pagination: PaginationState
    }
  }
}

/* LibraryState */
export interface LibraryState {
  all: {
    [key: number]: any
  }
  current: number
  selected: {
    current: number
    history: number[]
  }
}
