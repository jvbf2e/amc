export type ByteType =
  | 'Byte'
  | 'KiloByte'
  | 'MegaByte'
  | 'GigaByte'
  | 'TrillionByte'

export const isSize = (size: number, max: number, type: ByteType = 'Byte') => {
  let base = 0
  switch (type) {
    case 'KiloByte':
      base = max * 1024
      break
    case 'MegaByte':
      base = max * 1024 * 1024
      break
    case 'GigaByte':
      base = max * 1024 * 1024 * 1024
      break
    case 'TrillionByte':
      base = max * 1024 * 1024 * 1024 * 1024
      break
    default:
      base = max
      break
  }
  return size > base
}

export const getFileName = (path: string) => {
  const rows = path.split('\\')
  return rows[rows.length - 1]
}
