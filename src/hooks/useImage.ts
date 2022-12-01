export const getImage = (path: string) =>
  new URL(`/src/assets/${path}`, import.meta.url).href
