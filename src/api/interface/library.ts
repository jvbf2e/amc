import type { ReqPage } from '.'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Library {
  export interface ReqCreateParams {
    name: string
    parent_id: number
    source_type: number
    asset_package_id?: number
    asset_debt_id?: number
  }
  export interface ReqUpdateParams extends ReqCreateParams {
    id: number
  }
  export interface ResReadLibraryData extends ReqUpdateParams {}
  export interface TreeItem {
    id: number
    name: string
    children?: TreeItem[]
  }
  export interface ResReadTreeData extends TreeItem {}
  export interface ReqListParams extends ReqPage {
    group_id: number
  }
  // 文件
  export interface ReqFileCreateParams {
    group_id: number
    file: File
    source_type: number
    asset_package_id?: number
    asset_debt_id?: number
  }
  export interface ReqFileUpdateParams {
    id: number
    name: string
  }
  export interface ResFileListItemData {
    id: number
    name: string
    file_ext: string
    domain: string
    file_path: string
    employee_name: string
    file_size: number
    update_time: string
  }
  export interface ResFileListData {
    data: Library.ResFileListItemData[]
    total: number
  }

  //
  export interface ReqListAllParams {
    asset_package_id: number
    group_id: number
    source_type: number
    asset_debt_id: number
  }
}
