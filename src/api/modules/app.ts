import http from '@/api'
import { getStamp } from '@/utils'

/**
 * 上传图片
 * @param file
 * @returns
 */
export const fileImage = (file: File) => {
  const stamp = getStamp()
  const formData = new FormData()
  formData.set('file', file)
  formData.set('string', stamp.string)
  formData.set('stamp', `${stamp.stamp}`)
  return http({
    url: '/web/file/fileImageUpload',
    method: 'post',
    data: formData,
  })
}

/**
 * 获取字典
 * @returns
 */
export const getDict = () => {
  const stamp = getStamp()
  return http({
    url: '/web/system/getSystemDict',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 获取城市
 */
export const getCity = () => {
  const stamp = getStamp()
  return http({
    url: '/web/assetDebt/getCity',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}

/**
 * 修改头像
 * @param photo
 * @returns
 */
export const updateAppAvatar = (file: File) => {
  const stamp = getStamp()
  const formData = new FormData()
  formData.set('photo', file)
  formData.set('string', stamp.string)
  formData.set('stamp', `${stamp.stamp}`)
  return http({
    url: '/web/employee/updatePhoto',
    method: 'post',
    data: formData,
  })
}

/**
 * 获取最新版本
 * @returns
 */
export const readAmcVersion = () => {
  const stamp = getStamp()
  return http({
    url: '/web/version/getLatestVersion',
    method: 'post',
    data: {
      ...stamp,
    },
  })
}
