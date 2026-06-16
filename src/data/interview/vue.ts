// Vue 面试题集合
import type { InterviewQuestion } from "@/store/modules/type";

const rawList: Omit<InterviewQuestion, 'id'>[] = [
  // ==================== 入门 ====================
  {
    question: 'Vue 的核心特性有哪些？',
    standardAnswer: '1. 响应式数据驱动：数据变化自动更新视图；2. 组件化开发：页面拆分为独立可复用组件；3. 虚拟DOM：高效更新真实DOM；4. 指令系统：v-if、v-for、v-bind等简化DOM操作；5. 生态丰富：Vue Router、Pinia等官方库。'
  },
  {
    question: 'Vue 的生命周期钩子有哪些？执行顺序是怎样的？',
    standardAnswer: '顺序：setup（组合式API）→ beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted。常用：mounted发请求、onMounted操作DOM、onUnmounted清理定时器。'
  },
  {
    question: 'v-if 和 v-show 的区别是什么？',
    standardAnswer: 'v-if：条件不满足时不渲染DOM元素，切换时销毁/重建，适合不频繁切换的场景。v-show：始终渲染DOM，通过display:none控制显隐，切换成本低，适合频繁切换的场景。'
  },
  {
    question: 'v-for 中 key 的作用是什么？',
    standardAnswer: 'key 帮助 Vue 识别哪些元素被修改/删除/新增，进行虚拟DOM的复用优化。推荐使用唯一稳定的标识（如id），避免使用index（会导致列表排序/删除时渲染错误）。'
  },
  {
    question: 'Vue 组件中 data 为什么必须是函数？',
    standardAnswer: '因为组件可能被多次复用，如果 data 是对象则所有实例共享同一个数据，造成互相污染。写成函数形式每次复用都会返回新对象，保证组件实例数据独立。'
  },

  // ==================== 高频 ====================
  {
    question: 'Vue 2 和 Vue 3 的主要区别有哪些？',
    standardAnswer: '1. 响应式原理：Vue2用Object.defineProperty，Vue3用Proxy（支持新增/删除属性响应式）；2. API风格：Vue3新增组合式API（Composition API）；3. 性能优化：Vue3体积更小、渲染更快；4. 内置支持TypeScript；5. 新特性：Teleport、Fragments、Suspense。'
  },
  {
    question: 'Vue 的响应式原理是什么？',
    standardAnswer: 'Vue3使用Proxy代理对象，拦截getter收集依赖（effect），拦截setter触发更新。Vue2使用Object.defineProperty遍历对象所有属性进行劫持，无法监听新增/删除属性，需用Vue.set/Vue.delete。'
  },
  {
    question: 'Vue 组件间有哪些通信方式？',
    standardAnswer: '1. 父子通信：props / emit；2. 爷孙通信：provide / inject；3. 全局状态：Pinia / Vuex；4. 事件总线：mitt（替代Vue2的$bus）；5. ref / $refs 直接调用子组件方法；6. 插槽 slot 传递内容。'
  },
  {
    question: 'computed 和 watch 的区别是什么？',
    standardAnswer: 'computed：计算属性，基于已有数据计算新值，有缓存（依赖不变不重新计算），必须return结果。watch：监听数据变化执行副作用（如发请求、操作DOM），可深度监听、立即执行。'
  },
  {
    question: 'nextTick 的作用是什么？什么时候使用？',
    standardAnswer: 'nextTick 等待DOM更新完成后执行回调。Vue更新DOM是异步的，修改数据后立即获取DOM可能拿到旧值。使用场景：操作更新后的DOM（如获取元素高度、聚焦输入框）。'
  },
  {
    question: 'Vue 的插槽（slot）有哪些？',
    standardAnswer: '1. 默认插槽：<slot /> 父组件传入内容填充；2. 具名插槽：<slot name="header" /> 父组件用 v-slot:header 或 #header 指定位置；3. 作用域插槽：子组件传递数据给父组件插槽，父组件可获取并使用。'
  },
  {
    question: 'Vue Router 的路由模式有哪些？',
    standardAnswer: '1. hash模式：URL带#号，通过监听hashchange实现路由切换，兼容性好，无需服务器配置；2. history模式：使用HTML5 History API，URL美观，需要服务器配置将所有请求指向index.html（否则刷新404）。'
  },
  {
    question: '导航守卫有哪些？分别什么时候触发？',
    standardAnswer: '全局前置守卫：beforeEach（路由跳转前触发，可做登录拦截）；全局解析守卫：beforeResolve；全局后置钩子：afterEach（跳转后触发）。路由独享守卫：beforeEnter。组件内守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。'
  },
  {
    question: 'Pinia 与 Vuex 的区别？',
    standardAnswer: 'Pinia 是 Vue3 官方推荐状态管理库。区别：1. Pinia 无 mutations，直接通过 actions 修改状态（同步异步都支持）；2. 支持多 store 管理，无需 modules 嵌套；3. 更轻量，命名空间自动处理；4. 更好的 TypeScript 支持。'
  },
  {
    question: '什么是组合式 API（Composition API）？有什么优势？',
    standardAnswer: '组合式API是Vue3提供的一种组织代码方式，将相关逻辑聚合在一起（setup、ref、reactive等）。优势：1. 更好的逻辑复用（自定义Hooks）；2. 更清晰代码组织，按功能而非选项分类；3. 更友好的TypeScript推导；4. 更利于代码维护和拆解。'
  },

  // ==================== 进阶 ====================
  {
    question: '虚拟 DOM 是什么？有什么优缺点？',
    standardAnswer: '虚拟DOM是用JS对象模拟真实DOM结构。优点：1. 减少DOM操作，提升性能；2. 跨平台渲染（浏览器、小程序、Native）；3. 可以批量更新再一次性提交。缺点：首次渲染比直接操作DOM慢，内存占用更高。'
  },
  {
    question: 'Vue3 的 diff 算法相比 Vue2 有什么优化？',
    standardAnswer: '1. 静态标记（PatchFlags）：标记动态节点，只对比变化部分；2. 树结构提升（Hoisting）：将静态节点提升到render函数外，避免重复创建；3. 缓存事件处理函数；4. 更高效的双端diff比较算法。'
  },
  {
    question: 'Vue3 中的 Teleport 是什么？',
    standardAnswer: 'Teleport（传送门）将组件模板内容渲染到DOM中任意位置，而不受组件层级限制。使用场景：弹窗、模态框、提示框、下拉菜单等需要脱离父组件样式/层级影响的组件。'
  },
  {
    question: 'Vue 项目中如何进行性能优化？',
    standardAnswer: '1. 路由懒加载：按需加载页面组件；2. 使用v-if/v-show合理控制渲染；3. 使用computed缓存计算；4. v-for绑定唯一key；5. 图片懒加载；6. 组件异步加载；7. 合理使用keep-alive缓存组件；8. 第三方库按需引入；9. 打包优化（代码分割、压缩）。'
  },
  {
    question: 'keep-alive 的作用是什么？',
    standardAnswer: 'keep-alive 缓存组件实例，切换时保留组件状态（数据、DOM），避免重复渲染。使用场景：tab切换、路由切换时保留页面滚动位置。配合 include/exclude 控制哪些组件被缓存，配合 activated/deactivated 生命周期执行对应逻辑。'
  },
  {
    question: 'Vue3 中 ref 和 reactive 的区别？',
    standardAnswer: 'ref：用于定义基本类型或对象的响应式数据，访问时需 .value，在模板中自动解包。reactive：只能用于定义对象的响应式数据，访问时无需 .value，但解构会丢失响应式。推荐用 ref 保持统一。'
  },
  {
    question: 'Vue 中的自定义指令是什么？如何实现？',
    standardAnswer: '自定义指令复用DOM操作逻辑。通过 app.directive() 注册，包含生命周期钩子：mounted（元素挂载时）、updated、unmounted。使用场景：权限控制v-permission、聚焦v-focus、防抖v-debounce等。'
  }
]

// 自动生成递增ID
export const vueQuestions: InterviewQuestion[] = rawList.map((item, index) => ({
  id: index + 1,
  ...item
}))