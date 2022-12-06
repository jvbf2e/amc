import { getAmcConfig, patchAmcConfig } from '@/services/cmd'

import type { IAmcConfig } from '@/services/types'

export const useAmc = async () => {
  const amc = await getAmcConfig()

  const patchAmc = async (value: Partial<IAmcConfig>) => {
    await patchAmcConfig(value)
  }

  return {
    amc,
    patchAmc,
  }
}
