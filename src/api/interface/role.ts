// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Role {
  export interface ReqRoleCreateParams {
    name: string
    remark?: string
    permission_ids: number[]
  }
  export interface ReqRoleUpdateParams {
    id: number
    name: string
    remark: string
    permission_ids: number[]
  }
}
