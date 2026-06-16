import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
/* export default defineConfig(({ mode }) => { 
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
}) */

// https://vite.dev/config/
export default defineConfig(({ mode }) => { 
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
    // 新增 scss 全局变量配置，解决 $base-menu-width 未定义报错
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import']
        }
      }
    },
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

