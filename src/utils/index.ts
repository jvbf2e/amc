import md5 from 'js-md5'
import { API_KEY } from '@/config/config'
import { AppStore } from '@/store'
import lodash from 'lodash'

export * from './enums'
export * from './auth'
export * from './service'
export * from './piniaPersist'
export * from './storage'
export * from './upload'

export const getStamp = (
  val: string = '',
  isKey: boolean = true,
  isStamp: boolean = true
) => {
  const stamp = Math.round(new Date().getTime() / 1000)

  const ctx = isKey ? `${API_KEY}${val}` : val
  const date = isStamp ? stamp : ''
  return {
    string: md5(md5(ctx) + date),
    stamp,
  }
}

/**
 * 根据字典 type，获取值
 * @param type
 * @param key
 * @returns
 */
export const getDict = (type: string, key: string | number): string => {
  const dict = AppStore().dicts.filter((item: any) => item.key === type)[0]
    .children
  const row = dict.filter(
    (item: { key: string; value: string }) => item.key === `${key}`
  )
  return row.length > 0 ? row[0].value : ''
}

/**
 * 返回数字单位
 * @param number
 * @returns
 */
export const simplifyNum = (number: undefined | number): string => {
  if (!number) return '个'
  const value = Math.abs(Math.floor(number))
  let str_num = '个'
  if (value < 1e1) {
    str_num = '个'
  } else if (value >= 1e1 && value < 1e2) {
    str_num = '十'
  } else if (value >= 1e2 && value < 1e3) {
    str_num = '百'
  } else if (value >= 1e3 && value < 1e4) {
    str_num = '千'
  } else if (value >= 1e4 && value < 1e5) {
    str_num = '万'
  } else if (value >= 1e5 && value < 1e6) {
    str_num = '十万'
  } else if (value >= 1e6 && value < 1e7) {
    str_num = '百万'
  } else if (value >= 1e7 && value < 1e8) {
    str_num = '千万'
  } else if (value >= 1e8 && value < 1e9) {
    str_num = '亿'
  } else if (value >= 1e9 && value < 1e10) {
    str_num = '十亿'
  } else if (value >= 1e10 && value < 1e11) {
    str_num = '百亿'
  } else {
    str_num = '千亿'
  }
  return str_num
}

const BASE_KEY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
/**
 * 解析热键
 * @param key
 * @returns
 */
export const parseHotkey = (key: string) => {
  const temp = key.toUpperCase()
  return BASE_KEY.includes(temp)
}

/**
 * 是否存在
 * @param arr
 * @returns
 */
export const hasHotkeyByBaseKey = (arr: string[]) => {
  const int = lodash.intersection(arr, BASE_KEY)
  console.log(int)
}

/**
 * 热键排序
 * @param arr
 * @returns
 */
export const sortHotkey = (arr: string[]) => {
  const rows = [] as string[]
  const baseKey = ['Control', 'Alt', 'Shift']
  arr.forEach((key: string) => {
    if (baseKey.includes(key)) {
      rows.splice(baseKey.indexOf(key), 0, key)
    } else {
      rows.splice(arr.length - 1, 0, key)
    }
  })
  console.log(rows)
  return rows.filter((item) => item)
}

/**
 * 获取系统
 * @returns
 */
export default function getSystem() {
  const ua = navigator.userAgent

  if (ua.includes('Mac OS X')) return 'macos'

  if (/win64|win32/i.test(ua)) return 'windows'

  if (/linux/i.test(ua)) return 'linux'

  return 'unknown'
}
