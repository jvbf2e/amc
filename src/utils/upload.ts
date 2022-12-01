import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'

import type { OpenDialogOptions } from '@tauri-apps/api/dialog'

export const getFileName = (path: string) => {
  const rows = path.split('\\')
  return rows[rows.length - 1]
}

export const uploadOpen = (options: OpenDialogOptions) => {
  return new Promise<{ file: File }>(async (resolve, reject) => {
    try {
      const file_path = (await open(options)) as string
      if (file_path) {
        await readBinaryFile(file_path).then((binaryData) => {
          const binaryDataArr = new Uint8Array(binaryData)
          const fileName = getFileName(file_path)
          const file = new File([binaryDataArr], fileName)
          resolve({ file })
        })
      }
    } catch (error: any) {
      reject(error)
    }
  })
}
