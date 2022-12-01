import { defineStore } from 'pinia'
import {
  createDataLitigation,
  createDebt,
  createDebtBusiness,
  createDebtCar,
  createDebtDecision,
  createDebtExecutor,
  createDebtExpense,
  createDebtGuarantee,
  createDebtHouse,
  createDebtLawsuits,
  createDebtLog,
  createDebtPunished,
  createDebtReturn,
  createDebtService,
  createDebtTransfer,
  deleteDebt,
  deleteDebtCar,
  deleteDebtDecision,
  deleteDebtExecutor,
  deleteDebtExpense,
  deleteDebtGuarantee,
  deleteDebtHouse,
  deleteDebtLawsuits,
  deleteDebtLog,
  deleteDebtPunished,
  deleteDebtReturn,
  deleteDebtService,
  deleteDebtTransfer,
  getDebtLawsuitsList,
  getDebtList,
  getDebtLogList,
  getDebtReturnList,
  updateDebt,
  updateDebtCar,
  updateDebtDebtor,
  updateDebtDecision,
  updateDebtExecutor,
  updateDebtExpense,
  updateDebtGuarantee,
  updateDebtHouse,
  updateDebtLawsuits,
  updateDebtLog,
  updateDebtNode,
  updateDebtPunished,
  updateDebtReturn,
  updateDebtService,
  updateDebtTransfer,
} from '@/api/modules'
import { piniaPersistConfig } from '@/utils'

import type { Debt } from '@/api/interface'
import type { DebtState, PaginationState } from '../interface'

type PackageType = 'weekly' | 'log'

// DebtStore
export const DebtStore = defineStore({
  id: 'DebtState',
  state: (): DebtState => ({
    table: {
      data: [],
      pagination: {
        total: 0,
        current: 1,
      },
    },
    info: {
      asset_package_id: 0,
      debt_type: 1,
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
    return: {
      table: {
        data: [],
        pagination: {
          total: 0,
          current: 1,
        },
      },
    },
    lawsuits: {
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
    setInfoDebtType(value: number) {
      this.info.debt_type = value
    },
    /// Api
    // apiDebtCreate
    async apiDebtCreate(row: Debt.ReqCreateParams) {
      try {
        const { code, data: res, msg } = await createDebt(row)
        if (code === 0) {
          this.info.asset_package_id = res.asset_package_id
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtUpdate
    async apiDebtUpdate(row: Debt.ReqUpdateParams) {
      try {
        const { code, data: res, msg } = await updateDebt(row)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtDelete
    async apiDebtDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebt([id])
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtGetList
    async apiDebtGetList(params?: Debt.ReqGetListParams) {
      try {
        const { code, data: res, msg } = await getDebtList(params)
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
    // Debt - debtor
    //apiDebtDebtorUpdate
    async apiDebtDebtorUpdate(params: Debt.ReqUpdateDebtorParams) {
      try {
        const { code, data: res, msg } = await updateDebtDebtor(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // Debt - node
    //apiDebtNodeUpdate
    async apiDebtNodeUpdate(params: Debt.ReqUpdateNodeParams) {
      try {
        const { code, data: res, msg } = await updateDebtNode(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - guarantee
    // apiDebtGuaranteeCreate
    async apiDebtGuaranteeCreate(params: Debt.ReqCreateGuaranteeParams) {
      try {
        const { code, data: res, msg } = await createDebtGuarantee(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtGuaranteeDelete
    async apiDebtGuaranteeDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtGuarantee(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtGuaranteeUpdate
    async apiDebtGuaranteeUpdate(params: Debt.ReqUpdateGuaranteeParams) {
      try {
        const { code, data: res, msg } = await updateDebtGuarantee(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - transfer
    // apiDebtTransferCreate
    async apiDebtTransferCreate(params: Debt.ReqCreateTransferParams) {
      try {
        const { code, data: res, msg } = await createDebtTransfer(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtTransferDelete
    async apiDebtTransferDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtTransfer(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtTransferUpdate
    async apiDebtTransferUpdate(params: Debt.ReqUpdateTransferParams) {
      try {
        const { code, data: res, msg } = await updateDebtTransfer(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - house
    // apiDebtHouseCreate
    async apiDebtHouseCreate(params: Debt.ReqCreateHouseParams) {
      try {
        const { code, data: res, msg } = await createDebtHouse(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtHouseDelete
    async apiDebtHouseDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtHouse(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtHouseUpdate
    async apiDebtHouseUpdate(params: Debt.ReqUpdateHouseParams) {
      try {
        const { code, data: res, msg } = await updateDebtHouse(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - car
    // apiDebtCarCreate
    async apiDebtCarCreate(params: Debt.ReqCreateCarParams) {
      try {
        const { code, data: res, msg } = await createDebtCar(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtCarDelete
    async apiDebtCarDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtCar(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtCarUpdate
    async apiDebtCarUpdate(params: Debt.ReqUpdateCarParams) {
      try {
        const { code, data: res, msg } = await updateDebtCar(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - executor
    // apiDebtExecutorCreate
    async apiDebtExecutorCreate(params: Debt.ReqCreateExecutorParams) {
      try {
        const { code, data: res, msg } = await createDebtExecutor(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtExecutorDelete
    async apiDebtExecutorDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtExecutor(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtExecutorUpdate
    async apiDebtExecutorUpdate(params: Debt.ReqUpdateExecutorParams) {
      try {
        const { code, data: res, msg } = await updateDebtExecutor(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - punished
    // apiDebtPunishedCreate
    async apiDebtPunishedCreate(params: Debt.ReqCreatePunishedParams) {
      try {
        const { code, data: res, msg } = await createDebtPunished(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtPunishedDelete
    async apiDebtPunishedDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtPunished(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtPunishedUpdate
    async apiDebtPunishedUpdate(params: Debt.ReqUpdatePunishedParams) {
      try {
        const { code, data: res, msg } = await updateDebtPunished(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - decision
    // apiDebtDecisionCreate
    async apiDebtDecisionCreate(params: Debt.ReqCreateDecisionParams) {
      try {
        const { code, data: res, msg } = await createDebtDecision(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtDecisionDelete
    async apiDebtDecisionDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtDecision(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtDecisionUpdate
    async apiDebtDecisionUpdate(params: Debt.ReqUpdateDecisionParams) {
      try {
        const { code, data: res, msg } = await updateDebtDecision(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - service
    // apiDebtServiceCreate
    async apiDebtServiceCreate(params: Debt.ReqCreateServiceParams) {
      try {
        const { code, data: res, msg } = await createDebtService(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtServiceDelete
    async apiDebtServiceDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtService(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtServiceUpdate
    async apiDebtServiceUpdate(params: Debt.ReqUpdateServiceParams) {
      try {
        const { code, data: res, msg } = await updateDebtService(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    /// Debt - expense
    // apiDebtExpenseCreate
    async apiDebtExpenseCreate(params: Debt.ReqCreateExpenseParams) {
      try {
        const { code, data: res, msg } = await createDebtExpense(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtExpenseDelete
    async apiDebtExpenseDelete(id: number) {
      try {
        const { code, data: res, msg } = await deleteDebtExpense(id)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtExpenseUpdate
    async apiDebtExpenseUpdate(params: Debt.ReqUpdateExpenseParams) {
      try {
        const { code, data: res, msg } = await updateDebtExpense(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // Debt - Log
    // apiDebtLogCreate
    async apiDebtLogCreate(row: Debt.ReqCreateLogParams) {
      try {
        const { code, data: res, msg } = await createDebtLog(row)
        if (code === 0) {
          this.info.asset_package_id = res.asset_package_id
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtLogUpdate
    async apiDebtLogUpdate(row: Debt.ReqUpdateLogParams) {
      try {
        const { code, data: res, msg } = await updateDebtLog(row)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtLogDelete
    async apiDebtLogDelete(params: Debt.ReqDeleteLogParams) {
      try {
        const { code, data: res, msg } = await deleteDebtLog(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtLogGetList
    async apiDebtLogGetList(id: number) {
      try {
        const { code, data: res, msg } = await getDebtLogList(id)
        if (code === 0) {
          this.log.table.data = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // Debt - Return
    // apiDebtReturnCreate
    async apiDebtReturnCreate(row: Debt.ReqCreateReturnParams) {
      try {
        const { code, data: res, msg } = await createDebtReturn(row)
        if (code === 0) {
          this.info.asset_package_id = res.asset_package_id
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtReturnUpdate
    async apiDebtReturnUpdate(row: Debt.ReqUpdateReturnParams) {
      try {
        const { code, data: res, msg } = await updateDebtReturn(row)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtReturnDelete
    async apiDebtReturnDelete(params: Debt.ReqDeleteReturnParams) {
      try {
        const { code, data: res, msg } = await deleteDebtReturn(params)
        if (code === 0) {
          console.log(res)
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtReturnGetList
    async apiDebtReturnGetList(id: number) {
      try {
        const { code, data: res, msg } = await getDebtReturnList(id)
        if (code === 0) {
          this.return.table.data = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // Debt- Lawsuits
    // apiDebtLawsuitsCreate
    async apiDebtLawsuitsCreate(params: Debt.ReqCreateLawsuitsParams) {
      try {
        const { code, msg } = await createDebtLawsuits(params)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtLawsuitsUpdate
    async apiDebtLawsuitsUpdate(params: Debt.ReqUpdateLawsuitsParams) {
      try {
        const { code, msg } = await updateDebtLawsuits(params)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtLawsuitsDelete
    async apiDebtLawsuitsDelete(id: number) {
      try {
        const { code, msg } = await deleteDebtLawsuits(id)
        if (code === 0) {
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtLawsuitsGetList
    async apiDebtLawsuitsGetList(id: number) {
      try {
        const { code, data: res, msg } = await getDebtLawsuitsList(id)
        if (code === 0) {
          this.lawsuits.table.data = res
        } else {
          throw msg
        }
      } catch (error) {
        throw error
      }
    },
    // apiDebtLawsuitsFast
    async apiDebtLawsuitsFast(asset_debt_id: number) {
      try {
        const { code, msg } = await createDataLitigation(asset_debt_id)
        if (code === 0) {
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
