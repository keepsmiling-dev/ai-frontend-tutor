// HTML 面试题集合
import type { InterviewQuestion } from "@/store/modules/type";

export const vueQuestions: InterviewQuestion[] = [
  {
    question: "说说你对HTML语义化标签的理解",
    standardAnswer: "1. 使用贴合内容含义的标签搭建页面结构；2. 提升代码可读性与团队维护效率；3. 利于搜索引擎SEO抓取页面内容；4. 适配无障碍设备访问；5. 常用标签：header、nav、main、section、article、aside、footer等。"
  },
  {
    question: "行内元素、块级元素、行内块元素三者区别",
    standardAnswer: "块级元素独占一行，可设置宽高内外边距；行内元素同行排列，无法设置宽高；行内块元素既能同行排列，又可设置宽高。"
  },
  {
    question: "img标签中alt和src属性分别有什么作用",
    standardAnswer: "src指定图片资源地址，是引入图片核心属性；alt为图片加载失败时展示的替代文本，提升用户体验，同时助力SEO与无障碍访问。"
  },
  {
    question: "H5新增了哪些常用特性与标签",
    standardAnswer: "新增语义化结构标签、localStorage/sessionStorage本地存储、表单新属性、audio/video音视频标签、拖拽API、canvas画布、地理位置API等。"
  },
  {
    question: "简述iframe标签的优缺点",
    standardAnswer: "优点：可嵌套引入其他页面，实现页面模块复用；缺点：阻塞主页面加载、不利于SEO优化、存在跨域安全隐患、增加页面层级复杂度。"
  }
]