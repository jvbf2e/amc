// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace App {
  export interface ResMenuItemData {
    id: number
    parent_id: number
    type: number
    view_url: string
    route_url: string
    name: string
    name_en: string
    auth_mark: null | string
    sort: number
    icon: null | string
    children: App.ResMenuItemData[]
  }
}
