// CSS 面试题集合
import type { InterviewQuestion } from "@/store/modules/type";

const rawList: Omit<InterviewQuestion, 'id'>[] = [
  // ==================== 入门基础 ====================
  {
    question: 'CSS 的盒模型是什么？如何切换两种盒模型？',
    standardAnswer: '盒模型四部分：content内容、padding内边距、border边框、margin外边距。标准盒模型box-sizing:content-box，width仅包含内容；怪异盒模型border-box，width包含content+padding+border。'
  },
  {
    question: 'CSS 选择器有哪些？优先级如何计算？',
    standardAnswer: '选择器：id(#)、类(.)、标签、属性、伪类、伪元素、通配符*。优先级四级权重：!important > 行内样式 > id选择器 > 类/属性/伪类 > 标签/伪元素 > 通配符。权重从左到右依次比较，高位数字大则优先级更高。'
  },
  {
    question: '块级元素、行内元素、行内块元素的区别',
    standardAnswer: '块级独占一行，可设置宽高margin/padding（div/p/section）；行内元素同行排列，宽高设置无效（span/a）；行内块同行排列，支持宽高（img/input）。'
  },
  {
    question: 'CSS position 五个取值及作用？sticky有什么限制？',
    standardAnswer: 'static默认文档流；relative相对自身偏移，不脱流；absolute相对最近非static父级，脱离文档流；fixed相对浏览器视口固定；sticky粘性定位，滚动达到top阈值后固定，依赖父容器不能设置overflow:hidden。'
  },

  // ==================== 高频核心 ====================
  {
    question: 'Flex 布局容器与子项常用属性及其作用',
    standardAnswer: '容器：display:flex开启；flex-direction主轴方向；justify-content主轴对齐；align-items交叉轴对齐；flex-wrap自动换行；gap设置间距。子项：flex简写分配剩余空间；align-self单独控制自身交叉轴对齐；order调整排列顺序。'
  },
  {
    question: '「元素水平垂直居中」有哪些主流实现方案？',
    standardAnswer: '1.Flex：父flex + justify-content:center + align-items:center；2.Grid：父grid + place-items:center；3.绝对定位+transform：top/left50% + translate(-50%,-50%)；4.绝对定位+margin:auto：父relative，子宽高固定，四边0 + margin:auto。'
  },
  {
    question: '什么是BFC？触发条件与实际业务作用',
    standardAnswer: 'BFC块级格式化上下文，独立隔离渲染区域，内部布局不会影响外部。触发：float不为none、overflow非visible、inline-block、flex/grid、absolute/fixed定位。用途：清除浮动塌陷、解决外边距折叠、实现自适应两栏布局。'
  },
  {
    question: 'float浮动作用，以及四种清除浮动的方式',
    standardAnswer: 'float让元素脱离普通文档流，实现文字环绕、横向排列布局。清除浮动：1.父容器overflow:hidden；2.伪类清除（.clearfix::after{content:"";display:block;clear:both;height:0;visibility:hidden;}）；3.父容器使用flex布局替代浮动；4.末尾添加空div并设置clear:both。'
  },
  {
    question: 'CSS尺寸单位px/em/rem/vw/vh分别有什么区别',
    standardAnswer: 'px固定像素绝对单位；em相对父级font-size；rem相对根html字体大小，适配移动端；vw/vh相对视口宽高百分比，适合全屏自适应布局。'
  },
  {
    question: '伪类 : 和伪元素 :: 的核心区别',
    standardAnswer: '伪类（:hover/:nth-child）描述元素状态、位置，不生成新DOM；伪元素（::before/::after）创建虚拟独立DOM节点，必须搭配content属性使用，可单独设置盒模型样式。'
  },
  {
    question: 'CSS层叠性与继承性分别是什么？哪些样式会被继承？',
    standardAnswer: '层叠性：同一元素多条样式按优先级覆盖生效；继承性：父文字相关样式（color/font-size/font-family）自动传递给子元素；宽高、margin、padding、border、background不会继承。'
  },
  {
    question: '常见CSS预处理器Sass/Less/Stylus有什么优势？',
    standardAnswer: '支持变量、嵌套写法、mixin混入、函数运算、条件循环、文件模块化拆分，简化重复样式，提升大型项目样式复用与可维护性。'
  },
  {
    question: '单行、多行文本超出省略号如何实现？',
    standardAnswer: '单行：white-space:nowrap; overflow:hidden; text-overflow:ellipsis;多行：display:-webkit-box; -webkit-line-clamp:行数; -webkit-box-orient:vertical; overflow:hidden;'
  },
  {
    question: 'opacity、rgba、transparent三种透明写法区别',
    standardAnswer: 'opacity整体透明，包含内部所有子元素；rgba仅当前背景/文字透明，子元素不受影响；transparent完全透明无色，仅作用于颜色属性。'
  },
  {
    question: 'z-index 为什么有时候不生效？层叠上下文规则',
    standardAnswer: 'z-index仅对定位非static元素生效；父元素创建层叠上下文后，子元素z-index无法突破父级层级；触发层叠上下文：定位+z-index、opacity<1、transform、filter等属性。'
  },

  // ==================== 进阶工程&性能 ====================
  {
    question: '浏览器渲染页面流程，重排Reflow与重绘Paint区别？',
    standardAnswer: '流程：解析HTML生成DOM树、解析CSS生成CSSOM树，合并为渲染树RenderTree；Layout重排计算元素几何位置；Paint重绘填充像素到屏幕。重排会触发后续重绘，开销更大；仅修改颜色/透明度只触发重绘，修改宽高/位置会触发重排。'
  },
  {
    question: 'CSS动画性能优化方案有哪些？',
    standardAnswer: '1.动画优先使用transform、opacity，触发GPU合成层，避免top/left；2.减少频繁重排重绘；3.will-change提前告知浏览器优化；4.缩小动画作用区域；5.减少页面多层级嵌套选择器。'
  },
  {
    question: '浏览器如何解析加载CSS？有什么阻塞特性？',
    standardAnswer: 'CSS会阻塞页面渲染，未加载完成不会绘制内容；不会阻塞HTML解析，但会阻塞JS执行；首屏关键CSS建议内联到head，外部CSS用link引入，避免@import延迟加载。'
  },
  {
    question: '响应式网页设计是什么？有几种实现方案？',
    standardAnswer: '一套页面适配手机、平板、PC多尺寸设备。实现：1.媒体查询@media分尺寸修改样式；2.rem/vw弹性单位；3.Flex/Grid流式弹性布局；4.移动端viewport适配标签。'
  },
  {
    question: 'Grid与Flex布局分别适合什么场景？',
    standardAnswer: 'Flex一维布局，仅控制单轴（横向/纵向），适合导航、列表、单行卡片；Grid二维网格布局，同时控制行列，适合页面整体布局、相册、复杂仪表盘；二者可嵌套组合使用。'
  },
  {
    question: '大型项目如何解决全局CSS样式冲突？',
    standardAnswer: '1.BEM命名规范隔离模块样式；2.Vue scoped、React CSS Module自动生成唯一类名；3.CSS-in-JS（styled-components）自带作用域；4.控制选择器权重，避免深层嵌套；5.样式重置统一基础样式。'
  },
  {
    question: '移动端如何解决高清屏1px细线变粗问题？',
    standardAnswer: '1.transform:scale(0.5)缩放边框；2.媒体查询区分设备像素比，使用渐变模拟细线；3.viewport动态设置dpr缩放适配。'
  }
]

// 自动生成递增ID
export const cssQuestions: InterviewQuestion[] = rawList.map((item, index) => ({
  id: index + 1,
  ...item
}))