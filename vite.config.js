import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/NBAScore/",
  server: {
    port: 3000,
    proxy: {
      '/static': {
        target: 'https://cdn.nba.com/',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/static/, '')
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})

