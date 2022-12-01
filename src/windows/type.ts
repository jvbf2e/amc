export type WinType =
  | 'show'
  | 'hide'
  | 'close'
  | 'min'
  | 'max'
  | 'max2min'
  | 'exit'
  | 'relaunch'
  | 'logout'

export type WinOptions = {
  label: string // 窗口唯一label
  title: string // 窗口标题
  url: string // 路由地址url
  width?: number // 窗口宽度
  height?: number // 窗口高度
  minWidth?: number // 窗口最小宽度
  minHeight?: number // 窗口最小高度
  x?: number // 窗口相对于屏幕左侧坐标
  y?: number // 窗口相对于屏幕顶端坐标
  center?: boolean // 窗口居中显示
  resizable?: boolean // 是否支持缩放
  maximized?: boolean // 最大化窗口
  decorations?: boolean // 窗口是否无边框及导航条
  alwaysOnTop?: boolean // 置顶窗口
  transparent?: boolean // 背景透明
  fullscreen?: boolean // 窗口是否全屏模式打开
  visible?: boolean // 窗口是否可见
}
