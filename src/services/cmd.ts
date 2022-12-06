import { invoke } from '@tauri-apps/api/tauri'

import type { QucentConfig } from '@/store/interface'
import type { IAmcConfig, IQucentConfig } from './types'

export async function getAmcConfig() {
  return invoke<IAmcConfig>('get_amc_config')
}

export async function patchAmcConfig(payload: IAmcConfig) {
  return invoke<void>('patch_amc_config', { payload })
}

export async function getQucentConfig() {
  return invoke<QucentConfig>('get_qucent_config')
}

export async function patchQucentConfig(payload: IQucentConfig) {
  return invoke<void>('patch_qucent_config', { payload })
}
