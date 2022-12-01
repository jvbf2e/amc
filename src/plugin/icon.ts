import { App } from 'vue'
import { Icon } from '@arco-design/web-vue'

const IconFont = Icon.addFromIconFontCn({
  src: 'https://at.alicdn.com/t/c/font_3768720_y1qqzbfzfd.js',
})

export default {
  install: (app: App) => {
    app.component('IconFont', IconFont)
  },
}
