// HTML 面试题集合
import type { InterviewQuestion } from "@/store/modules/type";

const rawList: Omit<InterviewQuestion, 'id'>[] = [
  {
    question: '什么是HTML，它的作用是什么',
    standardAnswer: 'HTML是超文本标记语言，用于搭建网页骨架结构，承载文字、图片、表单等页面基础内容，是网页最底层结构语言。'
  },
  {
    question: 'DOCTYPE声明的作用是什么',
    standardAnswer: '告知浏览器当前文档使用的HTML版本，让浏览器以标准模式解析渲染页面，避免怪异模式导致的样式错乱。'
  },
  {
    question: '行内元素、块级元素、行内块元素有什么区别',
    standardAnswer: '块级元素独占一行，可设置宽高内外边距；行内元素同行排列，无法设置宽高；行内块元素同行排列，同时支持宽高设置。'
  },
  {
    question: 'img标签alt属性的作用',
    standardAnswer: '图片加载失败时展示兜底文字，同时提升搜索引擎收录，优化网页无障碍屏幕阅读器访问体验。'
  },
  {
    question: 'a标签如何实现新标签页跳转',
    standardAnswer: '给a标签添加target="_blank"属性，即可在全新浏览器标签打开链接地址。'
  },
  {
    question: 'label标签的作用与使用方式',
    standardAnswer: '绑定表单控件，点击label文字可自动聚焦对应输入框，优化表单操作交互；通过for关联input id，或直接包裹input实现绑定。'
  },
  {
    question: 'head标签内部常用标签有哪些',
    standardAnswer: '常用包含title、meta、link、style、script、base等，负责页面标题、编码配置、样式脚本引入、资源基础路径配置。'
  },
  {
    question: '谈谈你对HTML语义化的理解',
    standardAnswer: '使用具备实际含义的标签搭建页面，替代纯div布局。优势：代码可读性高、利于SEO检索、适配无障碍设备、方便团队维护迭代。'
  },
  {
    question: 'src和href属性的区别',
    standardAnswer: 'href用于建立页面与外部资源的关联关系，加载不会阻塞页面解析；src用于将外部资源嵌入替换当前元素，浏览器下载资源时会阻塞HTML解析。'
  },
  {
    question: 'script标签defer与async的区别',
    standardAnswer: '二者均异步加载JS不阻塞页面渲染；async加载完成后立即执行，执行顺序无序；defer严格按照标签书写顺序延迟执行，DOM解析完成后统一运行。'
  },
  {
    question: 'HTML5新增了哪些语义化标签',
    standardAnswer: '新增header、nav、article、section、aside、footer、main、figure等标签，用于划分页面不同功能区域，替代无意义div。'
  },
  {
    question: '常用meta标签的作用',
    standardAnswer: '可设置网页编码、移动端页面适配、SEO关键词与页面描述、浏览器渲染模式、页面缓存策略等全局基础配置。'
  },
  {
    question: 'HTML5相比旧版本有哪些更新内容',
    standardAnswer: '新增语义化标签、表单新控件、audio/video音视频标签、本地存储API、Canvas画布、拖拽交互、WebWorker、离线缓存等功能特性。'
  },
  {
    question: 'iframe标签的优缺点',
    standardAnswer: '优点：页面完全隔离、可复用公共模块；缺点：阻塞主页面onload、消耗浏览器连接池、不利于SEO、父子页面跨域通信复杂、存在安全风险。'
  },
  {
    question: 'Canvas与SVG绘图的区别',
    standardAnswer: 'Canvas属于位图绘图，基于像素渲染，放大模糊，无DOM元素无法绑定事件；SVG为矢量绘图，基于标签图形，缩放不失真，可单独绑定交互事件。适用场景：SVG适合图标，Canvas适合游戏、大数据可视化。'
  },
  {
    question: 'cookie、localStorage、sessionStorage三者区别',
    standardAnswer: '1.容量：cookie仅4KB，后两者5MB；2.传输：cookie每次HTTP请求自动携带，存储API仅本地使用；3.有效期：cookie可手动设置过期时间，localStorage永久存储，sessionStorage关闭标签页数据清空。'
  },
  {
    question: '网页出现中文乱码的原因和解决办法',
    standardAnswer: '原因是页面、文件、服务器编码格式不统一；统一在head设置<meta charset="UTF-8">，文件保存编码改为UTF-8即可解决乱码。'
  },
  {
    question: 'title与h1、b与strong标签的差异',
    standardAnswer: 'title定义浏览器顶部网页标题，用于SEO；h1是页面正文一级标题；b仅视觉加粗无语义；strong具备文本强调语义，利于无障碍与搜索引擎识别。'
  },
  {
    question: '简单介绍Web Worker的作用',
    standardAnswer: '开启浏览器后台独立线程处理耗时计算任务，避免大量运算阻塞主线程渲染，保证页面交互流畅；无法操作DOM、window、document。'
  },
  {
    question: 'HTML5离线存储原理与作用',
    standardAnswer: '通过manifest缓存清单缓存页面静态资源，断网状态下依旧可以正常访问已缓存网页，提升弱网/离线使用体验，现已逐步被Service Worker替代。'
  },
  // 新增高频补充题目
  {
    question: 'readonly 和 disabled 属性的区别',
    standardAnswer: 'readonly输入框仅禁止编辑，可获取焦点，表单提交会携带该字段值；disabled彻底禁用控件，无法聚焦，表单提交不会携带此字段。'
  },
  {
    question: 'HTML5原生表单校验常用属性有哪些',
    standardAnswer: 'required必填校验、pattern正则匹配、min/max数值范围、maxlength字符长度限制，input type支持email/number/tel等内置格式校验。'
  },
  {
    question: '移动端viewport meta标签的作用与参数含义',
    standardAnswer: '适配手机屏幕，width=device-width让页面宽度等于设备物理宽度，initial-scale=1禁止页面默认缩放，user-scalable=no可禁止用户双指缩放页面。'
  },
  {
    question: '什么是BFC，触发条件和实际作用',
    standardAnswer: 'BFC即块级格式化上下文，是浏览器独立隔离的渲染区域；浮动元素、overflow不为visible、inline-block、弹性布局可触发；用于解决浮动高度塌陷、同级块元素外边距重叠问题。'
  }
]

// 自动生成递增ID
export const htmlQuestions: InterviewQuestion[] = rawList.map((item, index) => ({
  id: index + 1,
  ...item
}))