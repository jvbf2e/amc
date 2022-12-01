import { defineStore } from 'pinia'
import {
  createPackage,
  createPackageLog,
  createPackageWeekly,
  deletePackage,
  deletePackageDebt,
  deletePackageLog,
  deletePackageWeekly,
  getPackageList,
  getPackageLogList,
  getPackageWeeklyList,
  updatePackage,
  updatePackageLog,
  updatePackageWeekly,
} from '@/api/modules'
import { piniaPersistConfig } from '@/utils'

import type { PackageState, PaginationState } from '../interface'
import type { Package } from '@/api/interface'

type PackageType = 'weekly'

// PackageStore
export const PackageStore = defineStore({
  id: 'PackageState',
  state: (): PackageState => ({
    table: {
      data: [],
      pagination: {
        total: 0,
        current: 1,
      },
    },
    info: {
      asset_package_id: 0,
    },
    weekly: {
      table: {
        data: [],
        pagination: {
          total: 0,
          current: 1,
        },
      },
    },
    log: {
      table: {
        data: [],
        pagination: {
          total: 0,
          current: 1,
        },
      },
    },
  }),
  getters: {
    getList: (state) => state.table.data,
    getPagination: (state) => state.table.pagination,
    getWeeklyList: (state) => state.weekly.table.data,
    getWeeklyPagination: (state) => state.weekly.table.pagination,
    getLogList: (state) => state.log.table.data,
    getLogPagination: (state) => state.log.table.pagination,
  },
  actions: {
    /// Set
    setPagination(pagination: PaginationState, type?: PackageType) {
      pagination.total && type
        ? (this[type].table.pagination.total = pagination.total)
        : (this.table.pagination.total = pagination.total)
      pagination.current && type
        ? (this[type].table.pagination.current = pagination.current)
        : (this.table.pagination.current = pagination.current)
    },
    /// Api
    // apiPackageCreate
    async apiPackageCreate(row: Package.ReqCreateParams) {
      try {
        const { code, data: res, msg } = await createPackage(row)
        if (code === 0) {
          this.info.asset_package_id = res.asset_package_id
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageUpdate
    async apiPackageUpdate(row: Package.ReqUpdateParams) {
      try {
        const { code, data: res, msg } = await updatePackage(row)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageDelete
    async apiPackageDelete(id: number) {
      try {
        // const {code, data: res, msg} = await
        const { code, msg } = await deletePackage([id])
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageDebtDelete
    async apiPackageDebtDelete(params: Package.ReqDeletePackageDebtParams) {
      try {
        const { code, data: res, msg } = await deletePackageDebt(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageGetList
    async apiPackageGetList(params?: Package.ReqGetListParams) {
      try {
        const { code, data: res, msg } = await getPackageList(params)
        if (code === 0) {
          this.table.data = res.data
          this.setPagination({ total: res.total })
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // - weekly
    // apiPackageWeeklyCreate
    async apiPackageWeeklyCreate(params: Package.ReqWeeklyCreateParams) {
      try {
        const { code, data: res, msg } = await createPackageWeekly(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageWeeklyDelete
    async apiPackageWeeklyDelete(params: Package.ReqWeeklyDeleteParams) {
      try {
        const { code, data: res, msg } = await deletePackageWeekly(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageWeeklyUpdate
    async apiPackageWeeklyUpdate(params: Package.ReqWeeklyUpdateParams) {
      try {
        const { code, data: res, msg } = await updatePackageWeekly(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageWeeklyGetList
    async apiPackageWeeklyGetList(params?: Package.ReqGetWeeklyListParams) {
      try {
        const { code, data: res, msg } = await getPackageWeeklyList(params)
        if (code === 0) {
          this.weekly.table.data = res
          // this.setPagination({ total: res.total }, 'weekly')
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // - log
    // apiPackageLogCreate
    async apiPackageLogCreate(params: Package.ReqCreateLogParams) {
      try {
        const { code, data: res, msg } = await createPackageLog(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageLogDelete
    async apiPackageLogDelete(params: Package.ReqDeleteLogParams) {
      try {
        const { code, data: res, msg } = await deletePackageLog(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageLogUpdate
    async apiPackageLogUpdate(params: Package.ReqUpdateLogParams) {
      try {
        const { code, data: res, msg } = await updatePackageLog(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPackageLogGetList
    async apiPackageLogGetList(params: Package.ReqGetLogListParams) {
      try {
        const { code, data: res, msg } = await getPackageLogList(params)
        if (code === 0) {
          this.log.table.data = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
  },
  persist: piniaPersistConfig('PackageState'),
})
