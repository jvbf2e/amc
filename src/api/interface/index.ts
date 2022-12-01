export * from './app'
export * from './data'
export * from './debt'
export * from './enterprise'
export * from './home'
export * from './library'
export * from './login'
export * from './package'
export * from './role'
export * from './user'

// * 请求响应参数(不包含data)
export interface Result {
  code: string
  desc: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data?: T
}

// * 分页响应参数
export interface ResPage<T> {
  data: T[]
  total: number
}

// * 分页请求参数
export interface ReqPage {
  per_page?: number
  page?: number
}
