import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/NBAScore/",
  server: {
    proxy: {
      '/': {
        target: 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, '')
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

