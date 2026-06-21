import { createApp} from 'vue'
import '@/style/index.scss'
import './style.css'

import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { Icon } from 'vant'
import 'vant/es/icon/style/index'
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Icon) 
app.mount('#app')

// 初始化主题
import { useThemeStore } from './store/modules/theme.ts'
useThemeStore().initTheme()