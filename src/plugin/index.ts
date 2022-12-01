import NProgress from './nprogress'
// pinia store
import pinia from '@/store'
// vue router
import router from '@/router/index'
// vue i18n
// import I18n from '@/language'
// layouts
import layouts from '@/layout'
// 第三方图标
import icons from './icon'
// 样式
import './style'

const install = (app: any) => {
  app.use(pinia)
  app.use(router)
  app.use(layouts)
  app.use(icons)
  // app.use(I18n)
}

export { install, NProgress }
