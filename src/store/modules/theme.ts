import { defineStore } from 'pinia';
import { setHighlightTheme } from '@/utils/theme';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light', // 从本地存储读取，默认 light
  }),
  actions: {
    initTheme() {
      this.theme = (localStorage.getItem('theme') || 'light') as | 'light' | 'dark';
      this.applyTheme();
    },
    applyTheme() {
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
      this.applyTheme();
      setHighlightTheme(this.theme); // 切换代码高亮主题
    },
  },
});
