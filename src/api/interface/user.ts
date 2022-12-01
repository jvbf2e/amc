import type { ReqPage } from '.'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace User {
  export interface ReqCreateUserParams {
    name: string
    phone: string
    password: string
    remark: string
    role_list: number[]
  }
  export interface ReqUpdateUserParams extends ReqCreateUserParams {
    id: number
    is_admin: number
  }
  export interface ReqGetUserParams extends ReqPage {
    username: string
    gender: number
    idCard: string
    email: string
    address: string
    createTime: string[]
    status: number
  }
  export interface ResUserList {
    id: string
    username: string
    gender: string
    age: number
    idCard: string
    email: string
    address: string
    createTime: string
    status: number
    avatar: string
    children?: ResUserList[]
  }
}
