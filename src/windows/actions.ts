import { getAll, WebviewWindow } from '@tauri-apps/api/window'
import { emit } from '@tauri-apps/api/event'

import { useRouter } from 'vue-router'

import type { WinOptions, WinType } from './type'

// 创建新窗口
export async function createWin(args: WinOptions) {
  await emit('win-create', args)
}

// 获取窗口
export async function getWin(label: string) {
  return WebviewWindow.getByLabel(label)
}

/**
 * @desc 设置窗口
 * @param type {string} 'show'|'hide'|'close'|'min'|'max'|'max2min'|'exit'|'relaunch'
 */
export async function setWin(type: WinType) {
  await emit('win-' + type)
}

/**
 * @desc 登录窗口
 */
export async function loginWin() {
  console.log(2)
  await createWin({
    label: 'login',
    url: '/login',
    center: true,
    width: 800,
    height: 600,
    resizable: false,
    title: '登录 - AMC圈讯科技',
    fullscreen: false,
    transparent: true,
    visible: false,
    decorations: false,
    alwaysOnTop: true,
  })
  console.log(3)
}

/**
 * @desc 主窗口
 */
export async function mainWin() {
  await createWin({
    label: 'main',
    url: '/main',
    center: true,
    width: 1200,
    height: 768,
    resizable: true,
    title: 'AMC - 圈讯科技',
    fullscreen: false,
    transparent: true,
    visible: false,
    decorations: false,
  })
}
