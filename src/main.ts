import { createApp } from 'vue'
import App from './App.vue'
import * as CustomPlugin from './plugin'

const app = createApp(App)
app.use(CustomPlugin)
app.mount('#app')
