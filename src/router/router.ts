//对外暴露配置路由
export const constantRoute = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/chat',
    meta: {
      title: 'layout',
      hidden: true,
    },
    children: [
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('@/view/chat/index.vue'),
        meta: {
          title: 'AI学习回答',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    component: () => import('@/view/roadmap/index.vue'),
    meta: { title: '学习路线', hidden: false },
  },
  {
    path: '/interview',
    name: 'Interview',
    component: () => import('@/layout/index.vue'),
    redirect: '/html',
    meta: { title: '面试题', hidden: false },
    children: [
      {
        path: '/html',
        name: 'HTML',
        component: () => import('@/view/interview/index.vue'),
        meta: { title: 'HTML', hidden: false },
      },
      {
        path: '/css',
        name: 'CSS',
        component: () => import('@/view/interview/index.vue'), // 暂时用同一个组件，后面可以替换
        meta: { title: 'CSS', hidden: false },
      },
      {
        path: '/javascript',
        name: 'JS',
        component: () => import('@/view/interview/index.vue'), // 暂时用同一个组件，后面可以替换
        meta: { title: 'JavaScript', hidden: false },
      },
      {
        path: '/vue',
        name: 'VUE',
        component: () => import('@/view/interview/index.vue'), // 暂时用同一个组件，后面可以替换
        meta: { title: 'Vue', hidden: false },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/view/404/index.vue'),
    meta: { title: '404', hidden: true },
  },
  {
    path: '/:pathMath(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: { title: '任意路由', hidden: true },
  },
];
