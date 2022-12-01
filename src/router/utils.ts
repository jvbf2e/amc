import { AppStore } from '@/store'
import Router from '@/router'

import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import type { App } from '@/api/interface'

const viewModules = import.meta.glob('@/views/**/*.vue')

/**
 *  Function
 * */
// 添加路由
export function addRoute(routes: App.ResMenuItemData[]) {
  routes.forEach((route) => {
    Router.addRoute(route.name_en, generateRoute(route))
  })
}

// 构建 Route
function generateRoute(row: any): RouteRecordRaw {
  const data = {
    path: row.route_url,
    name: row.name_en,
    meta: setMeta(row),
  } as unknown as RouteRecordRaw

  row.file_url && (data.component = viewModules[`/src/views${row.file_url}`])
  row.redirect && (data.redirect = { name: row.redirect })
  row.children &&
    (data.children = row.children.map((item: any) => generateRoute(item)))
  return data
}

// 设置 Route-Meta
function setMeta(row: any): RouteMeta {
  const data = {
    requiresAuth: false,
    title: row.title,
    key: row.name_en,
  } as RouteMeta
  row.view_url && (data.layout = row.view_url)
  return data
}

// 设置 Route-Path
export function setRouterPath(url: string, parent_path?: string) {
  return parent_path ? `${parent_path}/${url}` : url
}

// 添加菜单
export function addMenu(key: string, menus: App.ResMenuItemData[]) {
  menus.forEach((menu) => {
    menu.children && addMenu(menu.name_en, menu.children)
  })
  generateMenu(key, menus)
}

// 构建 Menu
function generateMenu(key: string, menus: any[]) {
  const data = menus
    .filter((item: any) => item.is_view === 1)
    .map((item: any) => {
      return {
        key: item.name_en,
        name: item.name,
        icon: item.icon,
      }
    })
  AppStore().addMenu(key, data)
}
