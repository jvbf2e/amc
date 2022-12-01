type LoginType = 'password' | 'wechat'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Login {
  export interface ReqLoginForm {
    phone?: string
    password?: string
    login_type: LoginType
    code?: string
  }

  export interface ResLogin {
    access_token: string
  }

  export interface ResAuthButtons {
    [propName: string]: any
  }

  export interface ReqSmsParams {
    phone: string
    type: number
  }

  export interface ReqForgotPasswordParams {
    phone: string
    new_password: string
    new_password_repeat: string
    code: string
  }
}
