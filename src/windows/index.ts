/**
 * @desc 封装新开多窗体
 */
import { WebviewWindow, appWindow, getAll } from '@tauri-apps/api/window'
import { relaunch, exit } from '@tauri-apps/api/process'
import { emit, listen } from '@tauri-apps/api/event'

import { setWin } from './actions'

import type { WinOptions } from './type'
import { AppStore } from '@/store'

// 系统参数配置
export const windowConfig: WinOptions = {
  label: '', // 窗口唯一label
  title: '', // 窗口标题
  url: '', // 路由地址url
  width: 900, // 窗口宽度
  height: 640, // 窗口高度
  center: true, // 窗口居中显示
  resizable: true, // 是否支持缩放
  maximized: false, // 最大化窗口
  decorations: false, // 窗口是否无边框及导航条
  alwaysOnTop: false, // 置顶窗口
}

class Windows {
  mainWin?: null | WebviewWindow

  constructor() {
    this.mainWin = null
  }

  // 获取窗口
  getWin(label: string) {
    return WebviewWindow.getByLabel(label)
  }

  // 获取全部窗口
  getAllWin() {
    return getAll()
  }

  // 创建新窗口
  async createWin(options: WinOptions) {
    const args = Object.assign({}, windowConfig, options)

    // 是否主窗口
    if (args.label.indexOf('main') > -1) {
      console.log('该窗口是主窗口')
      this.mainWin = getAll().find((w) => {
        return w.label.indexOf('main') > -1 && w.label != args.label
      })
      await this.mainWin?.hide()
    }

    // 创建窗口对象
    let win = new WebviewWindow(args.label, args)

    // 是否最大化
    if (args.maximized && args.resizable) {
      win.maximize()
    }

    // 窗口创建完毕/失败
    win.once('tauri://created', async () => {
      console.log('window create success!')
      await win?.show()
      await this.mainWin?.close()
    })

    win.once('tauri://error', async () => {
      console.log('window create error!')
    })
  }

  // 开启主进程监听事件
  async listen() {
    // 创建新窗体
    await listen('win-create', (event: any) => {
      console.log(event)
      this.createWin(JSON.parse(event.payload))
    })

    // 显示窗体
    await listen('win-show', async (event) => {
      if (appWindow.label.indexOf('main') == -1) return
      await appWindow.show()
      await appWindow.unminimize()
      await appWindow.setFocus()
    })

    // 隐藏窗体
    await listen('win-hide', async (event) => {
      console.log(appWindow.label)
      if (appWindow.label.indexOf('main') == -1) return
      console.log('hide - start')
      await appWindow.hide().then(() => {
        console.log('隐藏成功')
      })
    })

    // 退出应用
    await listen('win-exit', async (event) => {
      setWin('logout')
      await exit()
    })

    // 重启应用
    await listen('win-relaunch', async (event) => {
      await relaunch()
    })

    // 主/渲染进程传参
    await listen('win-setdata', async (event: any) => {
      await emit('win-postdata', JSON.parse(event.payload))
    })

    // 刷新页面
    await listen('win-refresh', async (event: any) => {
      await emit('refresh-web')
    })
  }

  //
}

export default Windows
