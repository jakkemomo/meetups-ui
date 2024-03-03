import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_APP_BASE_URL_API': JSON.stringify(env.BASE_URL_API),
      'process.env.VITE_APP_GOOGLE_MAP_API_KEY': JSON.stringify(env.GOOGLE_MAP_API_KEY),
      'process.env.VITE_APP_GOOGLE_MAP_ID': JSON.stringify(env.GOOGLE_MAP_ID),
    },
    resolve: {
      alias: [{find: "@", replacement: resolve(__dirname, "./src")}],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      watch: {
        usePolling: true
      }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        }
      }
    }
  }
})
