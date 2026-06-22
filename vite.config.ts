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
    server: {
      proxy: {
        '/deepseek': {
          target: 'https://api.deepseek.com/v1',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/deepseek/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_DEEPSEEK_KEY}`
          }
        },
      },
    },
  };
});
