// ? 全局不动配置项 只做导出不做修改
import { version } from '../../package.json'

// 默认布局
export const DEFAULT_LAYOUT = 'default'

// * 首页地址（默认）
export const HOME_URL = '/home/index'
export const HOME_URL_NAME = 'Home'

// * 图片地址
export const IMAGE_URL = 'https://amcfile.qucent.cn'
// * 文档库地址
export const FILE_URL = 'https://qucent-amc.oss-cn-shanghai.aliyuncs.com'

// API key
export const API_URL = 'https://api.amccs.qucent.cn'
export const API_KEY = '195cb41531d685c25904fe31532aaf6f'

// * Tabs（黑名单地址，不需要添加到 tabs 的路由地址）
export const TABS_BLACK_LIST: string[] = [
  '/403',
  '/404',
  '/500',
  '/layout',
  '/login/',
  '/login',
  '/dataScreen',
]

// * 高德地图key
export const MAP_KEY = ''

// 版本号
export const VERSION = version
