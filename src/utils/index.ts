import md5 from 'js-md5'
import { API_KEY } from '@/config/config'
import { AppStore } from '@/store'

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
