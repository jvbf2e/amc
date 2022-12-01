import { defineStore } from 'pinia'
import {
  createLibrary,
  deleteLibrary,
  deleteLibraryFile,
  getLibrary,
  getLibraryFile,
  updateLibrary,
  updateLibraryFile,
  uploadLibraryFile,
} from '@/api/modules'
import { Library } from '@/api/interface'
import { piniaPersistConfig } from '@/utils'

import type { LibraryState, PaginationState } from '../interface'

type PackageType = 'package' | 'debt'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const LibraryStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'LibraryState',
  // state: 返回对象的函数
  state: (): LibraryState => ({
    all: {},
    current: 0,
    selected: {
      current: 0,
      history: [],
    },
  }),
  getters: {},
  actions: {
    /// Set
    setCurrent(id: number) {
      this.current = id
    },
    setSelectedCurrent(id: number) {
      this.selected.current = id
    },
    /// Api
    // apiLibraryCreate
    async apiLibraryCreate(params: Library.ReqCreateParams) {
      try {
        const { code, data: res, msg } = await createLibrary(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiLibraryDelete
    async apiLibraryDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteLibrary(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiLibraryUpdate
    async apiLibraryUpdate(params: Library.ReqUpdateParams) {
      try {
        const { code, data: res, msg } = await updateLibrary(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiLibraryFileCreate
    async apiLibraryFileCreate(params: Library.ReqFileCreateParams) {
      try {
      } catch (error) {
        throw error
      }
    },
    // apiLibraryFileUpdate
    async apiLibraryFileUpdate(params: Library.ReqFileUpdateParams) {
      try {
        const { code, data: res, msg } = await updateLibraryFile(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiLibraryFileUpload
    async apiLibraryFileUpload(params: Library.ReqFileCreateParams) {
      try {
        const { code, data: res, msg } = await uploadLibraryFile(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiLibraryFileDelete
    async apiLibraryFileDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteLibraryFile(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiUpdateLibraryFile
    async apiUpdateLibraryFile(params: Library.ReqFileUpdateParams) {
      try {
        const { code, data: res, msg } = await updateLibraryFile(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
  },
  persist: piniaPersistConfig('LibraryState'),
})
