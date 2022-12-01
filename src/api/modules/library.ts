import http from '@/api'
import { getStamp } from '@/utils'

import type { Library } from '@/api/interface'

/**
 * 添加目录
 * @param data
 * @returns
 */
export const createLibrary = (data: Library.ReqCreateParams) => {
  const stamp = getStamp(`${data.name}`)
  return http({
    url: '/web/documentLibrary/createMakeDir',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 删除目录
 * @param id
 * @returns
 */
export const deleteLibrary = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/documentLibrary/deleteDir',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑目录
 * @param data
 * @returns
 */
export const updateLibrary = (data: Library.ReqUpdateParams) => {
  const stamp = getStamp(`${data.name}`)
  return http({
    url: '/web/documentLibrary/updateDir',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取目录信息
 * @param id
 * @returns
 */
export const readLibrary = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http<any, Library.ResReadLibraryData>({
    url: '/web/documentLibrary/getDetailsDir',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取目录树
 * @param asset_package_id
 * @returns
 */
export const getLibrary = (asset_package_id?: number) => {
  const stamp = getStamp()
  return http<any, Library.ResReadTreeData[]>({
    url: '/web/documentLibrary/getDirTree',
    method: 'post',
    data: {
      asset_package_id,
      ...stamp,
    },
  })
}

/**
 * 上传文件
 * @param data
 * @returns
 */
export const uploadLibraryFile = (data: Library.ReqFileCreateParams) => {
  const stamp = getStamp()
  const formData = new FormData()
  formData.set('group_id', `${data.group_id}`)
  formData.set('file', data.file)
  formData.set('source_type', `${data.source_type}`)
  if (data.asset_package_id) {
    formData.set('asset_package_id', `${data.asset_package_id}`)
  }
  formData.set('string', stamp.string)
  formData.set('stamp', `${stamp.stamp}`)
  return http({
    url: '/web/documentLibrary/createUploadLibrary',
    method: 'post',
    data: formData,
  })
}

/**
 * 删除文件
 * @param id
 * @returns
 */
export const deleteLibraryFile = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/documentLibrary/deleteLibraryFile',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 编辑文件
 * @param data
 * @returns
 */
export const updateLibraryFile = (data: Library.ReqFileUpdateParams) => {
  const stamp = getStamp(`${data.id}`)
  return http({
    url: '/web/documentLibrary/updateFileName',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取文件信息
 * @param id
 * @returns
 */
export const readLibraryFile = (id: number) => {
  const stamp = getStamp(`${id}`)
  return http({
    url: '/web/documentLibrary/getDetailsFile',
    method: 'post',
    data: {
      id,
      ...stamp,
    },
  })
}

/**
 * 获取文件列表
 * @param data
 * @returns
 */
export const getLibraryFile = (data: Library.ReqListParams) => {
  const stamp = getStamp()
  return http<any, Library.ResFileListData>({
    url: '/web/documentLibrary/getFileList',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}

/**
 * 获取全部文件
 * @param data
 * @returns
 */
export const getAllFile = (data?: Library.ReqListAllParams) => {
  const stamp = getStamp()
  return http({
    url: '/web/documentLibrary/getAllFile',
    method: 'post',
    data: {
      ...data,
      ...stamp,
    },
  })
}
