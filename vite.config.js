import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/stan-center/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          `@use "@/styles/_variables.scss" as *;` +
          `@use "@/styles/_mixins.scss" as *;` +
          `@use "@/styles/_breakpoints.scss" as *;`
      }
    }
  },
  server: {
    allowedHosts: [
      '.trycloudflare.com', // Разрешить все поддомены cloudflare tunnel
    ],
  },
})
