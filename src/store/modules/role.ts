import { defineStore } from 'pinia'
import {
  roleAll,
  getRoleList,
  getRoleAllMenuTree,
  createRole,
  deleteRole,
  readPermission,
  updateRole,
} from '@/api/modules'
import { piniaPersistConfig } from '@/utils'

import type { Role } from '@/api/interface'
import type {
  RoleAllItem,
  RoleMenuItem,
  RoleState,
  RoleTableItem,
} from '../interface'

// RoleStore
export const RoleStore = defineStore({
  id: 'RoleState',
  state: (): RoleState => ({
    all: [],
    table: {
      data: [],
      pagination: {
        total: 0,
        current: 1,
      },
    },
    allMenuTree: [],
    permission: [],
    tree: {
      checkedKeys: [],
      indeterminateKeys: [],
      default: {},
    },
  }),
  getters: {
    getList: (state) => state.table.data,
    getPagination: (state) => state.table.pagination,
    getTreeCheckedKeys: (state) => state.tree.checkedKeys,
    getTreeIndeterminateKeys: (state) => state.tree.indeterminateKeys,
    getTreeDefault: (state) => state.tree.default,
  },
  actions: {
    /// Set
    async setAll(values: RoleAllItem[]) {
      this.all = values
    },
    async setTableData(values: RoleTableItem[]) {
      this.table.data = values
    },
    async setTableTotal(total: number) {
      this.table.pagination.total = total
    },
    async setTableCurrent(current: number) {
      this.table.pagination.current = current
    },
    async setAllMenuTree(values: RoleMenuItem[]) {
      this.allMenuTree = values
    },
    async setPermission(value: RoleMenuItem[]) {
      this.permission = value
    },
    async setTreeCheckedKeys(values: number[]) {
      this.tree.checkedKeys = values
    },
    async setTreeIndeterminateKeys(values: number[]) {
      this.tree.indeterminateKeys = values
    },
    async setTreeDefault(rows: { [key: number]: number[] }) {
      this.tree.default = rows
    },
    /// Api
    // apiRoleGetAll
    async apiRoleGetAll() {
      try {
        const { code, data: res, msg } = await roleAll()
        if (code === 0) {
          this.setAll(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiRoleGetList
    async apiRoleGetList(page = 1, per_page = 10) {
      try {
        const { code, data: res, msg } = await getRoleList({ page, per_page })
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
    // apiRoleGetAllMenuTree
    async apiRoleGetAllMenuTree() {
      try {
        const { code, data: res, msg } = await getRoleAllMenuTree()
        if (code === 0) {
          this.setAllMenuTree(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiRoleCreate
    async apiRoleCreate(data: Role.ReqRoleCreateParams) {
      try {
        const { code, data: res, msg } = await createRole(data)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiRoleDelete
    async apiRoleDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteRole(id)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    async apiRoleUpdate(params: Role.ReqRoleUpdateParams) {
      try {
        const { code, data: res, msg } = await updateRole(params)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiPermissionRead
    async apiPermissionRead() {
      try {
        const { code, data: res, msg } = await readPermission()
        if (code === 0) {
          this.setPermission(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
  },
  persist: piniaPersistConfig('RoleState'),
})
