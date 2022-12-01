import { defineStore } from 'pinia'
import {
  enterpriseInfo,
  enterpriseEdit,
  getEnterpriseCostList,
  getEnterpriseCostDetailedList,
  createEnterpriseNotice,
  getEnterpriseNoticeList,
  deleteEnterpriseNotice,
} from '@/api/modules'
import { piniaPersistConfig } from '@/utils'

import type { Enterprise } from '@/api/interface'
import type {
  EnterpriseState,
  EnterpriseInfo,
  PaginationState,
} from '../interface'

type PackageType = 'cost' | 'detailed' | 'notice'

// AppStore
export const EnterpriseStore = defineStore({
  id: 'EnterpriseState',
  state: (): EnterpriseState => ({
    // 企业信息
    info: {
      enterprise_name: '',
      begin_time: 0,
      end_time: 0,
      use_number: 0,
      accounts_number: 0,
      version_type: '',
      logo_url: {
        url: '',
        uri: '',
      },
      today_online_number: 0,
      yesterday_online_number: 0,
    },
    // 费用中心
    cost: {
      enterprise_amount: 0,
      table: {
        data: [],
        pagination: {
          total: 0,
          current: 1,
        },
      },
    },
    detailed: {
      table: {
        data: [],
        pagination: {
          total: 0,
          current: 1,
        },
      },
    },
    notice: {
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
    getInfo: (state) => state.info,
    getCostPagination: (state) => state.cost.table.pagination,
    getDetailedPagination: (state) => state.detailed.table.pagination,
    getNoticePagination: (state) => state.notice.table.pagination,
  },
  actions: {
    /// Set
    async setInfo(info: EnterpriseInfo) {
      this.info = info
    },
    async setPagination(pagination: PaginationState, type: PackageType) {
      pagination.total && (this[type].table.pagination.total = pagination.total)
      pagination.current &&
        (this[type].table.pagination.current = pagination.current)
    },
    /// Api
    // apiEnterpriseInfo
    async apiEnterpriseInfo() {
      try {
        const { code, data: res, msg } = await enterpriseInfo()
        if (code === 0) {
          this.setInfo(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiEnterprise
    async apiEnterpriseEdit(data: Enterprise.ReqEnterpriseForm) {
      try {
        const { code, msg } = await enterpriseEdit(data)
        if (code === 0) {
          await this.apiEnterpriseInfo()
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiEnterpriseCostAccount
    async apiEnterpriseCostAccount(
      params?: Enterprise.ReqEnterpriseCostAccountListParams
    ) {
      try {
        const {
          code,
          data: res,
          msg,
        } = await getEnterpriseCostList(
          Object.assign({ page: 1, per_page: 10 }, params ?? {})
        )
        if (code === 0) {
          this.cost.enterprise_amount = res.enterprise_amount
          this.cost.table.data = res.page_list.data
          this.setPagination({ total: res.page_list.total }, 'cost')
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiEnterpriseCostDetailed
    async apiEnterpriseCostDetailed(
      params?: Enterprise.ReqEnterpriseCostAccountListParams
    ) {
      try {
        const {
          code,
          data: res,
          msg,
        } = await getEnterpriseCostDetailedList(
          Object.assign({ page: 1, per_page: 10 }, params ?? {})
        )
        if (code === 0) {
          this.detailed.table.data = res.data
          this.setPagination({ total: res.total }, 'detailed')
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // Notice
    async apiEnterpriseNoticeCreate(
      params: Enterprise.ReqEnterpriseNoticeCreateParams
    ) {
      try {
        const { code, msg } = await createEnterpriseNotice(params)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    async apiEnterpriseNoticeDelete(id: number) {
      try {
        const { code, msg } = await deleteEnterpriseNotice(id)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    async apiEnterpriseNoticeGetList(
      params?: Enterprise.ReqGetEnterpriseNoticeListParams
    ) {
      try {
        const {
          code,
          data: res,
          msg,
        } = await getEnterpriseNoticeList(
          Object.assign({ page: 1, per_page: 10 }, params ?? {})
        )
        if (code === 0) {
          this.notice.table.data = res.data
          this.setPagination({ total: res.total }, 'notice')
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
  },
  persist: piniaPersistConfig('EnterpriseState'),
})
