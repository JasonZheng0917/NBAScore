import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/NBAScore/",
  server: {
    proxy: {
      '/api': {
        target: 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/NBAScore\/api/, '')
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
// export default defineConfig(({ command, mode }) => {
//   // 根据当前工作目录中的 `mode` 加载 .env 文件
//   // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
//   const env = loadEnv(mode, process.cwd())
//   const { VITE_BACKEND_HOST } = env;
//   return {
//     server: {
//       proxy: {
//         '/api': {
//           target: VITE_BACKEND_HOST,
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//         },
//       },
//     },
//     plugins: [vue()],
//     base: "/NBAScore",
//     resolve: {
//       alias: {
//         "@": fileURLToPath(new URL("./src", import.meta.url)),
//       },
//     },
//   }
// })

