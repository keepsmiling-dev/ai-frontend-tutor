import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

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
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import'],
        },
      },
    },
    /*      server: {
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
    }, */

    server: {
      proxy: {
        // 本地开发所有 /deepseek 开头转发 DeepSeek 官方
        '/deepseek': {
          target: 'https://api.deepseek.com/v1',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/deepseek/, ''),
        },
      },
    },
  };
});
