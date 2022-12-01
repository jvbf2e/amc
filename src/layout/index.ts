import DefaultLayout from './default.vue'
import BaseLayout from './base.vue'
import LoginLayout from './login.vue'

import type { App } from 'vue'

export default {
  install(app: App) {
    app.component('default-layout', DefaultLayout)
    app.component('base-layout', BaseLayout)
    app.component('login-layout', LoginLayout)
  },
}
