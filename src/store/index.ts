import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default createPinia().use(piniaPluginPersistedstate)

export * from './modules/app'
export * from './modules/auth'
export * from './modules/debt'
export * from './modules/enterprise'
export * from './modules/home'
export * from './modules/global'
export * from './modules/library'
export * from './modules/package'
export * from './modules/role'
export * from './modules/user'
