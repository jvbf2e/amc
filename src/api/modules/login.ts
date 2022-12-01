import http from '@/api'
import { getStamp } from '@/utils'

import type { App, Login } from '@/api/interface'

/**
 * 用户登录接口
 * @param data
 * @returns
 */
export const loginApi = (data: Login.ReqLoginForm) => {
  const stamp = getStamp(`${data.login_type}`)
  return http({
    url: '/web/login/login',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

// 获取用户信息
export const getInfo = () => {
  const stamp = getStamp()
  return http({
    url: '/web/employee/getUserInfo',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

// 获取菜单列表
export const getMenuList = () => {
  const stamp = getStamp()
  return http<any, App.ResMenuItemData[]>({
    url: '/web/menu/getAuthMenu',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取验证码
 * @param params
 * @returns
 */
export const getLoginCode = (params: Login.ReqSmsParams) => {
  const stamp = getStamp(`${params.phone}`)
  return http({
    url: '/web/sms/sendSms',
    method: 'post',
    data: {
      ...params,
      ...stamp,
    },
  })
}

/**
 * 忘记密码
 * @param params
 * @returns
 */
export const forgotPassword = (params: Login.ReqForgotPasswordParams) => {
  const stamp = getStamp(`${params.code}${params.phone}`)
  return http({
    url: '/web/employee/forgotPassword',
    method: 'post',
    data: {
      ...params,
      ...stamp,
    },
  })
}
