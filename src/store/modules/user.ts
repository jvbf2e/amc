import { defineStore } from 'pinia'
import {
  createUser,
  deleteUser,
  infoUser,
  getUserList,
  updateUser,
} from '@/api/modules'
import { piniaPersistConfig } from '@/utils'

import type { UserState, UserTableItem } from '../interface'
import { User } from '@/api/interface'
import { update } from 'js-md5'

// UserStore
export const UserStore = defineStore({
  id: 'UserState',
  state: (): UserState => ({
    table: {
      data: [],
      pagination: {
        total: 0,
        current: 1,
      },
    },
  }),
  getters: {
    getList: (state) => state.table.data,
    getPagination: (state) => state.table.pagination,
  },
  actions: {
    /// Set
    async setTableData(user: UserTableItem[]) {
      this.table.data = user
    },
    async setTableTotal(total: number) {
      this.table.pagination.total = total
    },
    async setTableCurrent(current: number) {
      this.table.pagination.current = current
    },
    /// Api
    // apiUserCreate
    async apiUserCreate(data: User.ReqCreateUserParams) {
      try {
        const { code, data: res, msg } = await createUser(data)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiUserDelete
    async apiUserDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteUser(id)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiUserUpdate
    async apiUserUpdate(data: User.ReqUpdateUserParams) {
      try {
        const { code, data: res, msg } = await updateUser(data)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },

    // apiUserGetList
    async apiUserGetList(page = 1, per_page = 10) {
      try {
        const { code, data: res, msg } = await getUserList({ page, per_page })
        if (code === 0) {
          this.setTableData(res.data)
          this.setTableTotal(res.total)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
  },
  persist: piniaPersistConfig('UserState'),
})
