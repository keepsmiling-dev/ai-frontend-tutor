import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => { // 2. 改为函数式写法
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.deepseek.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_DEEPSEEK_API_KEY}`,
          },
        },
      },
    },
  }
})

