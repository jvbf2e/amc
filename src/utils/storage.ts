import CryptoJS from 'crypto-js'

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161')

// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a')

// 类型 window.localStorage, window.sessionStorage,
const config = {
  type: 'localStorage' as 'localStorage' | 'sessionStorage', // 本地存储类型 sessionStorage
  prefix: 'SDF_0.0.1', // 名称前缀 建议：项目名 + 项目版本
  expire: 1, //过期时间 单位：秒
  isEncrypt: false, // 默认加密 为了调试方便, 开发过程中可以不加密
}

// 名称前自动添加前缀
export const autoAddPrefix = (key: string) => {
  const prefix = config.prefix ? `${config.prefix}_` : ''
  return prefix + key
}

// 移除已添加的前缀
const autoRemovePrefix = (key: string) => {
  const len = config.prefix ? config.prefix.length + 1 : 0
  return key.slice(len)
}

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
const encrypt = (data: object | string): string => {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data)
    } catch (error) {
      throw new Error(error as string)
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
const decrypt = (data: string): string => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 判断是否支持 Storage
export const isSupportStorage = () => {
  return typeof Storage !== 'undefined' ? true : false
}

// 设置 setStorage
export const setStorage = (key: string, value?: string | null, expire = 0) => {
  if (value === '' || value === null || value === undefined) {
    value = null
  }

  if (Number.isNaN(expire) || expire < 0)
    throw new Error('Expire must be a number')

  expire = (expire ? expire : config.expire) * 1000
  const data = {
    value: value as string | null, // 存储值
    time: Date.now(), //存值时间戳
    expire, // 过期时间
  }

  const encryptString = config.isEncrypt
    ? encrypt(JSON.stringify(data))
    : JSON.stringify(data)

  window[config.type].setItem(autoAddPrefix(key), encryptString)
}

// 获取 getStorage
export const getStorage = (key: string) => {
  key = autoAddPrefix(key)
  const val = window[config.type].getItem(key)
  // key 不存在判断
  if (!val || JSON.stringify(val) === 'null') {
    return null
  }

  // 优化 持续使用中续期
  const storage = JSON.parse(config.isEncrypt ? decrypt(val) : val)

  const nowTime = Date.now()

  // 过期删除
  if (storage.expire && config.expire * 6000 < nowTime - storage.time) {
    removeStorage(key)
    return null
  } else {
    // 未过期期间被调用 则自动续期 进行保活
    setStorage(autoRemovePrefix(key), storage.value)
    return storage.value
  }
}

// 是否存在 hasStorage
export const hasStorage = (key: string) => {
  key = autoAddPrefix(key)
  const arr = getStorageAll().filter((item) => item.key === key)
  return arr.length ? true : false
}

// 获取所有key
export const getStorageKeys = () => {
  const items = getStorageAll()
  return items.map((item) => item.key)
}

// 根据索引获取key
export const getStorageForIndex = (index: number) => {
  return window[config.type].key(index)
}

// 获取localStorage长度
export const getStorageLength = () => {
  return window[config.type].length
}

// 获取全部 getAllStorage
export const getStorageAll = () => {
  const storages = window[config.type] // 获取长度
  return Object.keys(storages).map((key) => {
    return { key, val: storages[key] }
  })
}

// 删除 removeStorage
export const removeStorage = (key: string) => {
  window[config.type].removeItem(autoAddPrefix(key))
}

// 清空 clearStorage
export const clearStorage = () => {
  window[config.type].clear()
}
