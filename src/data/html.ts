// HTML 面试题集合
import type { InterviewQuestion } from "@/store/modules/type";

const rawList: Omit<InterviewQuestion, 'id'>[] = [
  // 入门题
  {
    type: '入门',
    question: '什么是HTML，它的作用是什么',
    standardAnswer: 'HTML是超文本标记语言，用于搭建网页骨架结构，承载文字、图片、表单等页面基础内容。'
  },
  {
    type: '入门',
    question: 'DOCTYPE声明的作用是什么',
    standardAnswer: '告知浏览器当前文档使用的HTML版本，让浏览器以标准模式解析渲染页面，避免怪异模式样式错乱。'
  },
  {
    type: '入门',
    question: '行内元素、块级元素、行内块元素有什么区别',
    standardAnswer: '块级元素独占一行，可设置宽高；行内元素同行排列，无法设置宽高；行内块元素同行排列，同时支持宽高设置。'
  },
  {
    type: '入门',
    question: 'img标签alt属性的作用',
    standardAnswer: '图片加载失败时展示兜底文字，同时提升搜索引擎收录与网页无障碍访问体验。'
  },
  {
    type: '入门',
    question: 'a标签如何实现新标签页跳转',
    standardAnswer: '给a标签添加target="_blank"属性，即可在全新浏览器标签打开链接地址。'
  },
  {
    type: '入门',
    question: 'label标签的作用与使用方式',
    standardAnswer: '绑定表单控件，点击标签文字可自动聚焦对应输入框，优化表单操作交互体验。'
  },
  {
    type: '入门',
    question: 'head标签内部常用标签有哪些',
    standardAnswer: '常用包含title、meta、link、style、script、base等，负责页面配置、样式脚本引入。'
  },

  // 高频题
  {
    type: '高频',
    question: '谈谈你对HTML语义化的理解',
    standardAnswer: '使用具备实际含义的标签搭建页面，替代纯div布局。优势为代码可读性高、利于SEO检索、适配无障碍设备、方便团队维护迭代。'
  },
  {
    type: '高频',
    question: 'src和href属性的区别',
    standardAnswer: 'src用于嵌入替换当前元素资源，加载时阻塞页面解析；href用于建立页面资源关联，不会阻塞网页正常渲染。'
  },
  {
    type: '高频',
    question: 'script标签defer与async的区别',
    standardAnswer: '二者均异步加载JS不阻塞页面；async执行顺序无序，加载完成立即执行；defer严格按照书写顺序执行。'
  },
  {
    type: '高频',
    question: 'HTML5新增了哪些语义化标签',
    standardAnswer: '新增header、nav、article、section、aside、footer、main等标签，划分页面不同功能区域。'
  },
  {
    type: '高频',
    question: '常用meta标签的作用',
    standardAnswer: '可设置网页编码、页面适配、关键词描述、浏览器渲染模式、缓存策略等基础页面配置。'
  },
  {
    type: '高频',
    question: 'HTML5相比旧版本有哪些更新内容',
    standardAnswer: '新增语义标签、表单新控件、音视频媒体标签、本地存储、画布绘图、拖拽交互等全新功能特性。'
  },

  // 进阶题
  {
    type: '进阶',
    question: 'iframe标签的优缺点',
    standardAnswer: '优点：独立隔离页面、复用公共模块；缺点：拖累页面性能、影响SEO优化、父子页面通信繁琐。'
  },
  {
    type: '进阶',
    question: 'Canvas与SVG绘图的区别',
    standardAnswer: 'Canvas属于位图绘图，放大模糊，无元素事件；SVG为矢量绘图，缩放不失真，支持标签绑定交互事件。'
  },
  {
    type: '进阶',
    question: 'cookie、localStorage、sessionStorage三者区别',
    standardAnswer: 'cookie存储容量小，随请求自动携带；localStorage永久本地存储；sessionStorage关闭页面数据自动清空。'
  },
  {
    type: '进阶',
    question: '网页出现中文乱码的原因和解决办法',
    standardAnswer: '原因是页面编码格式不统一；统一设置meta标签charset="UTF-8"即可解决乱码问题。'
  },
  {
    type: '进阶',
    question: 'title与h1、b与strong标签的差异',
    standardAnswer: 'title定义浏览器网页标题，h1定义页面正文大标题；b仅视觉加粗，strong具备文本强调语义。'
  },
  {
    type: '进阶',
    question: '简单介绍Web Worker的作用',
    standardAnswer: '开启浏览器后台线程处理耗时计算任务，避免大量运算阻塞主线程，保证页面交互流畅。'
  },
  {
    type: '进阶',
    question: 'HTML5离线存储原理与作用',
    standardAnswer: '通过缓存清单缓存页面资源，断网状态下依旧可以正常访问网页，提升离线使用体验。'
  }
]

// 自动生成递增ID，新增题目直接往数组末尾追加即可
export const htmlQuestions: InterviewQuestion[] = rawList.map((item, index) => ({
  id: index + 1,
  ...item
}))