import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
  return {
    plugins: [react()],
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
