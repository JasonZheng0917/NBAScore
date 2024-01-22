import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/todaysScoreboard_00.json': 'https://cdn.nba.com/static/json/liveData/scoreboard/',
    },
  },
  plugins: [vue()],
  base: "/NBAScore",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
