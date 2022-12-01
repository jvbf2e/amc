import type { RouteLocationNormalized } from 'vue-router'

export const isAuth = (to: RouteLocationNormalized) => {
  return to.matched.some((record) => {
    const redirect = record.redirect
    const current = redirect
      ? record.children.filter((item) => item.path === redirect)[0]
      : record
    return current?.meta?.requiresAuth ?? false
  })
}
