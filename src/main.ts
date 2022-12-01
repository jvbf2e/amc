import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'

import { createApp } from 'vue'
import App from './App.vue'
import * as CustomPlugin from './plugin'

const app = createApp(App)
app.use(CustomPlugin)
app.mount('#app')
;(async () => {
  const autoStarted = await invoke('autostart')
  if (!autoStarted) {
    appWindow.show()
  }
})()
