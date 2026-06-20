<<<<<<< HEAD
import { ref } from "vue";
import type {Stage} from '@/store/modules/type'
// 学习路线
export const stageList = ref<Stage[]>([
  {
    id: 1,
    name: '阶段一：前端三件套',
    icon: 'bookmark-o',
    learnTime: '3～4 周',
    level: '入门',
    target: '掌握网页基础结构、样式美化、简单页面交互，能独立完成基础网页制作',
    htmlText: '语义化标签、页面骨架、列表、链接、图片、表单、表格等结构搭建',
    cssText: '选择器、盒模型、浮动、Flex 布局、颜色字体、页面美化、基础响应式',
    jsText: '变量、运算符、流程控制、函数、DOM操作、事件监听、简单交互实现',
    tags: ['HTML', 'CSS', 'JavaScript'],
    docs: [
      {
        name: 'MDN 官方文档',
        url: 'https://developer.mozilla.org/zh-CN/docs/Learn',
      },
      { name: 'VS Code 编辑器', url: 'https://code.visualstudio.com/' },
      { name: 'Chrome 浏览器', url: 'https://www.google.com/chrome/' },
    ],
    videos: [
      {
        name: '【尚硅谷】HTML+CSS 教程',
        url: 'https://www.bilibili.com/video/BV1p84y1P7Z5',
      },
      {
        name: 'JavaScript 基础入门（黑马程序员）',
        url: 'https://www.bilibili.com/video/BV1Y84y1L7Nn',
      },
    ],
    tips: '学习顺序：先结构 → 再样式 → 最后交互，多敲代码比死记硬背更重要',
  },
  {
    id: 2,
    name: '阶段二：开发工具与版本控制',
    icon: 'description-o',
    learnTime: '1～2 周',
    level: '入门',
    target:
      '熟练使用开发工具提效，掌握代码版本管理，能独立托管项目。在学习期间每天在 GitHub 上提交代码，养成习惯。',
    content:
      'VSCode 常用插件及调试技巧\nGit 常用命令：clone, add, commit, push, pull, branch\nGitHub 远程仓库管理（创建仓库、提交代码、拉取更新）',
    tags: ['Git', 'GitHub', 'VSCode'],
    docs: [
      { name: 'Git 官方文档', url: 'https://git-scm.com/doc' },
      { name: 'GitHub 官网', url: 'https://github.com/' },
      { name: 'Gitee 码云', url: 'https://gitee.com/' },
    ],
    videos: [
      {
        name: 'Git 与 GitHub 基础教程（技术爬爬虾）',
        url: 'https://www.bilibili.com/video/BV1ySLc6QEcB',
      },
    ],
    tips: '命令不用一次记全，常用命令多敲几次自然熟练',
  },
  {
    id: 3,
    name: '阶段三：Vue 3 前端框架',
    icon: 'medal-o',
    learnTime: '4～6 周',
    level: '进阶',
    target: '掌握组件化开发，能独立开发一个小型项目（如 Todo 或博客前台）',
    content:
      'Vue 3 基础语法（模板、响应式、计算属性、指令）\n组合式 API（ref, reactive, computed, watch）\n组件通信（props, emit, provide/inject）\n路由 Vue Router（配置路由、导航守卫）\n状态管理 Pinia（定义 store、使用 state 和 actions）',
    tags: ['Vue3', 'Vite', 'Pinia', 'Router'],
    docs: [
      { name: 'Vue 官方文档', url: 'https://cn.vuejs.org/' },
      { name: 'Vite 官方文档', url: 'https://cn.vitejs.dev/' },
      { name: 'Pinia 文档', url: 'https://pinia.vuejs.org/zh/' },
    ],
    videos: [
      {
        name: '尚硅谷 Vue3 入门到实战',
        url: 'https://www.bilibili.com/video/BV1Zy4y1K7SH',
      },
    ],
    tips: '先掌握核心语法，再学生态工具，配合小项目巩固效果最好。\n掌握一个框架后，可快速迁移到其他框架。',
  },
  {
    id: 4,
    name: '阶段四：网络请求与工程化基础',
    icon: 'setting-o',
    learnTime: '2～3 周',
    level: '进阶',
    target: '具备基本的工程化认知，能按规范组织代码，并尝试做简单的性能优化。',
    content:
      '代码规范：ESLint + Prettier 基本配置\nVite 构建配置（代理、路径别名、环境变量）\n性能优化入门：路由懒加载、图片压缩、了解 WebP 格式',
    tags: ['工程化', '性能优化', '规范'],
    docs: [
      { name: 'Vite 构建文档', url: 'https://cn.vitejs.dev/guide/build.html' },
      { name: 'Webpack 中文文档', url: 'https://webpack.docschina.org/' },
      {
        name: '前端性能优化指南 (MDN)',
        url: 'https://developer.mozilla.org/zh-CN/docs/Web/Performance',
      },
    ],
    videos: [
      {
        name: '前端AJAX与前端框架（黑马程序员）',
        url: 'https://www.bilibili.com/video/BV1MN411y7pw',
      },
    ],
    tips: '优化是渐进式的，不用追求一步到位，先了解概念能应用即可。',
  },
  {
    id: 5,
    name: '阶段五：求职准备与项目总结',
    icon: 'friends-o',
    learnTime: '2～4 周',
    level: '高阶',
    target: '熟练应对前端面试，能独立梳理项目、输出优质简历、拿到 offer',
    content:
      '梳理项目亮点，用 STAR 法则描述项目\n准备常见面试题（JS 基础、Vue 原理、网络等）\n优化简历描述，模拟面试',
    tags: ['面试', '简历', '求职'],
    docs: [
      {
        name: '前端铜九铁十面试必备八股文',
        url: 'https://juejin.cn/post/7270471613547249699',
      },
      {
        name: '前端专业面试题（牛客）',
        url: 'https://www.nowcoder.com/exam/interview?jobs=[11201]&input=%E5%89%8D%E7%AB%AF%E4%B8%93%E4%B8%9A&order=0',
      },
    ],
    videos: [],
    tips: '面试官更看重你对项目的理解，而不是背诵八股文。多用 STAR 法则描述项目，多模拟面试能大幅提升通过率。',
  },
]);
=======
import { ref } from "vue";
import type {Stage} from '@/store/modules/type'
// 学习路线
export const stageList = ref<Stage[]>([
  {
    id: 1,
    name: '阶段一：前端三件套',
    icon: 'bookmark-o',
    learnTime: '3～4 周',
    level: '入门',
    target: '掌握网页基础结构、样式美化、简单页面交互，能独立完成基础网页制作',
    htmlText: '语义化标签、页面骨架、列表、链接、图片、表单、表格等结构搭建',
    cssText: '选择器、盒模型、浮动、Flex 布局、颜色字体、页面美化、基础响应式',
    jsText: '变量、运算符、流程控制、函数、DOM操作、事件监听、简单交互实现',
    tags: ['HTML', 'CSS', 'JavaScript'],
    docs: [
      {
        name: 'MDN 官方文档',
        url: 'https://developer.mozilla.org/zh-CN/docs/Learn',
      },
      { name: 'VS Code 编辑器', url: 'https://code.visualstudio.com/' },
      { name: 'Chrome 浏览器', url: 'https://www.google.com/chrome/' },
    ],
    videos: [
      {
        name: '【尚硅谷】HTML+CSS 教程',
        url: 'https://www.bilibili.com/video/BV1p84y1P7Z5',
      },
      {
        name: 'JavaScript 基础入门（黑马程序员）',
        url: 'https://www.bilibili.com/video/BV1Y84y1L7Nn',
      },
    ],
    tips: '学习顺序：先结构 → 再样式 → 最后交互，多敲代码比死记硬背更重要',
  },
  {
    id: 2,
    name: '阶段二：开发工具与版本控制',
    icon: 'description-o',
    learnTime: '1～2 周',
    level: '入门',
    target:
      '熟练使用开发工具提效，掌握代码版本管理，能独立托管项目。在学习期间每天在 GitHub 上提交代码，养成习惯。',
    content:
      'VSCode 常用插件及调试技巧\nGit 常用命令：clone, add, commit, push, pull, branch\nGitHub 远程仓库管理（创建仓库、提交代码、拉取更新）',
    tags: ['Git', 'GitHub', 'VSCode'],
    docs: [
      { name: 'Git 官方文档', url: 'https://git-scm.com/doc' },
      { name: 'GitHub 官网', url: 'https://github.com/' },
      { name: 'Gitee 码云', url: 'https://gitee.com/' },
    ],
    videos: [
      {
        name: 'Git 与 GitHub 基础教程（技术爬爬虾）',
        url: 'https://www.bilibili.com/video/BV1ySLc6QEcB',
      },
    ],
    tips: '命令不用一次记全，常用命令多敲几次自然熟练',
  },
  {
    id: 3,
    name: '阶段三：Vue 3 前端框架',
    icon: 'medal-o',
    learnTime: '4～6 周',
    level: '进阶',
    target: '掌握组件化开发，能独立开发一个小型项目（如 Todo 或博客前台）',
    content:
      'Vue 3 基础语法（模板、响应式、计算属性、指令）\n组合式 API（ref, reactive, computed, watch）\n组件通信（props, emit, provide/inject）\n路由 Vue Router（配置路由、导航守卫）\n状态管理 Pinia（定义 store、使用 state 和 actions）',
    tags: ['Vue3', 'Vite', 'Pinia', 'Router'],
    docs: [
      { name: 'Vue 官方文档', url: 'https://cn.vuejs.org/' },
      { name: 'Vite 官方文档', url: 'https://cn.vitejs.dev/' },
      { name: 'Pinia 文档', url: 'https://pinia.vuejs.org/zh/' },
    ],
    videos: [
      {
        name: '尚硅谷 Vue3 入门到实战',
        url: 'https://www.bilibili.com/video/BV1Zy4y1K7SH',
      },
    ],
    tips: '先掌握核心语法，再学生态工具，配合小项目巩固效果最好。\n掌握一个框架后，可快速迁移到其他框架。',
  },
  {
    id: 4,
    name: '阶段四：网络请求与工程化基础',
    icon: 'setting-o',
    learnTime: '2～3 周',
    level: '进阶',
    target: '具备基本的工程化认知，能按规范组织代码，并尝试做简单的性能优化。',
    content:
      '代码规范：ESLint + Prettier 基本配置\nVite 构建配置（代理、路径别名、环境变量）\n性能优化入门：路由懒加载、图片压缩、了解 WebP 格式',
    tags: ['工程化', '性能优化', '规范'],
    docs: [
      { name: 'Vite 构建文档', url: 'https://cn.vitejs.dev/guide/build.html' },
      { name: 'Webpack 中文文档', url: 'https://webpack.docschina.org/' },
      {
        name: '前端性能优化指南 (MDN)',
        url: 'https://developer.mozilla.org/zh-CN/docs/Web/Performance',
      },
    ],
    videos: [
      {
        name: '前端AJAX与前端框架（黑马程序员）',
        url: 'https://www.bilibili.com/video/BV1MN411y7pw',
      },
    ],
    tips: '优化是渐进式的，不用追求一步到位，先了解概念能应用即可。',
  },
  {
    id: 5,
    name: '阶段五：求职准备与项目总结',
    icon: 'friends-o',
    learnTime: '2～4 周',
    level: '高阶',
    target: '熟练应对前端面试，能独立梳理项目、输出优质简历、拿到 offer',
    content:
      '梳理项目亮点，用 STAR 法则描述项目\n准备常见面试题（JS 基础、Vue 原理、网络等）\n优化简历描述，模拟面试',
    tags: ['面试', '简历', '求职'],
    docs: [
      {
        name: '前端铜九铁十面试必备八股文',
        url: 'https://juejin.cn/post/7270471613547249699',
      },
      {
        name: '前端专业面试题（牛客）',
        url: 'https://www.nowcoder.com/exam/interview?jobs=[11201]&input=%E5%89%8D%E7%AB%AF%E4%B8%93%E4%B8%9A&order=0',
      },
    ],
    videos: [],
    tips: '面试官更看重你对项目的理解，而不是背诵八股文。多用 STAR 法则描述项目，多模拟面试能大幅提升通过率。',
  },
]);
>>>>>>> 46e4c08241a7b88f4ddd8d500ffc2629e99a6eb7
