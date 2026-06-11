// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router';
import { constantRoute } from './router';

let router = createRouter({
  history: createWebHistory(),
  routes:constantRoute
});

export default router;
