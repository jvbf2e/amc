import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

const API_URL = 'https://api.amccs.qucent.cn'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: API_URL,
        /* 允许跨域 */
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path)
          return path.replace(/^\/api/, '')
        },
      },
    },
  },
})
