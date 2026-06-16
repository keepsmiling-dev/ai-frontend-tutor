// JavaScript 面试题集合
import type { InterviewQuestion } from "@/store/modules/type";

const rawList: Omit<InterviewQuestion, 'id'>[] = [
  // ==================== 入门基础 ====================
  {
    question: 'JavaScript 中的数据类型有哪些？',
    standardAnswer: '基本数据类型7种：String、Number、Boolean、Undefined、Null、Symbol、BigInt；引用数据类型：Object，包含Array、Function、Date、RegExp等衍生对象。'
  },
  {
    question: 'let、const、var 三者完整区别',
    standardAnswer: 'var：函数级作用域，变量提升，允许重复声明；let：块级作用域，存在暂时性死区，不可重复声明；const：块级作用域，声明必须赋值，不能重写变量引用，引用类型内部属性可修改。'
  },
  {
    question: '== 和 === 的区别，开发推荐哪个？',
    standardAnswer: '== 会自动进行隐式类型转换后对比，1 == "1"结果为true；=== 严格相等，要求值、数据类型完全一致，1 === "1"为false；项目统一推荐使用===避免隐式转换bug。'
  },
  {
    question: '什么是变量提升（Hoisting）？暂时性死区是什么？',
    standardAnswer: 'var、function声明会提升到当前作用域顶部，仅声明提升、赋值不提升；let/const存在暂时性死区，变量声明前访问直接抛出ReferenceError，无法提前读取。'
  },
  {
    question: 'JS 中 falsy 假值有哪些？',
    standardAnswer: 'false、0、""空字符串、null、undefined、NaN；以上6个在if判断中会转为false，其余所有值均为真值。'
  },
  {
    question: '如何精准判断变量的数据类型？',
    standardAnswer: '基础类型：typeof（无法区分null/数组）；数组专用：Array.isArray()；全类型精准判断：Object.prototype.toString.call(val)，可区分null、数组、日期、正则等全部类型。'
  },

  // ==================== 高频核心 ====================
  {
    question: '什么是闭包？使用场景与内存隐患',
    standardAnswer: '内层函数可以访问外层函数作用域变量的组合就是闭包。应用：参数柯里化、防抖节流、私有变量封装、迭代器；隐患：长期持有外部变量会造成内存泄漏，需手动置空引用释放内存。'
  },
  {
    question: '原型、原型链是什么？原型链查找规则',
    standardAnswer: '构造函数拥有prototype原型对象；实例通过__proto__指向构造函数原型；访问对象属性时，自身不存在则顺着__proto__向上查找，直到Object.prototype.__proto__ === null，这条链路就是原型链，是JS实现继承的底层机制。'
  },
  {
    question: 'call、apply、bind 三者区别与用法',
    standardAnswer: '均用于修改函数this指向；call参数逐个传入，立即执行；apply参数以数组/类数组传入，立即执行；bind接收参数，返回全新绑定this的函数，不会自动执行，需要手动调用。'
  },
  {
    question: '箭头函数与普通function函数核心区别',
    standardAnswer: '1.无自身this，继承外层作用域this；2.不能作为new构造函数，无prototype；3.不存在arguments，可用剩余参数...args替代；4.无法使用call/apply/bind修改this指向。'
  },
  {
    question: 'Promise 是什么？三种状态与核心静态方法',
    standardAnswer: 'Promise用于解决异步回调地狱，三种不可逆状态：pending等待、fulfilled成功、rejected失败；实例方法then/catch/finally；静态方法all全部成功、race最快完成、any任一成功、allSettled全部结束。'
  },
  {
    question: 'async/await 和 Promise 的关系，错误怎么捕获？',
    standardAnswer: 'async/await是Promise的语法糖，简化异步代码写法；async函数自动返回Promise；await阻塞等待Promise完成；异常捕获：try/catch包裹await，或给Promise结尾添加.catch()。'
  },
  {
    question: '什么是事件循环Event Loop？宏任务、微任务执行顺序',
    standardAnswer: 'JS单线程异步调度机制；执行顺序：先执行所有同步代码 → 清空当前所有微任务队列 → 取出一个宏任务执行，循环往复。宏任务：setTimeout、DOM事件、script、I/O；微任务：Promise.then、queueMicrotask、MutationObserver。'
  },
  {
    question: '数组常用方法，哪些会改变原数组？',
    standardAnswer: '修改原数组：push、pop、shift、unshift、splice、reverse、sort；不修改原数组（返回新数组）：map、filter、slice、concat、reduce、find、findIndex、every、some。'
  },
  {
    question: '浅拷贝、深拷贝的区别，各有哪些实现方式？',
    standardAnswer: '浅拷贝仅复制对象第一层，深层属性共享引用：展开运算符...、Object.assign、slice；深拷贝递归复制全部层级：JSON.parse(JSON.stringify)（不支持函数、Symbol、循环引用、Date失真）、递归手写、lodash.cloneDeep。'
  },
  {
    question: 'new 关键字创建实例的完整过程',
    standardAnswer: '1.创建全新空对象；2.空对象__proto__指向构造函数prototype；3.构造函数this绑定到新对象并执行；4.若构造函数无显式return对象，自动返回新创建实例。'
  },
  {
    question: 'ES6 class 与原型继承的区别？',
    standardAnswer: 'class是原型继承的语法糖，底层依旧基于prototype；class必须new调用，不存在变量提升；extends实现继承，super指向父类构造函数；class内部方法不可枚举，原型写法无此限制。'
  },
  {
    question: 'Map/Set 和 Object/Array 的对比优势',
    standardAnswer: 'Map键可以是任意类型、有序存储、可直接获取长度size；Set自动去重，适合数组去重；Object键仅支持字符串/Symbol；数组无原生去重、键只能为数字字符串。'
  },

  // ==================== 进阶工程&性能 ====================
  {
    question: 'this 指向的五大绑定规则，优先级顺序',
    standardAnswer: '优先级从高到低：new绑定 > bind显式绑定 > call/apply显式绑定 > 隐式调用绑定 > 默认绑定；箭头函数不适用以上规则，永久继承外层this。'
  },
  {
    question: '事件委托（事件代理）原理与优势',
    standardAnswer: '利用事件冒泡特性，给父元素绑定单一事件，通过event.target区分触发子元素；优势：减少DOM事件绑定数量优化性能，动态新增子元素无需重复绑定事件。'
  },
  {
    question: '什么是函数柯里化？应用场景',
    standardAnswer: '把多参数函数拆解为多个单参数嵌套函数，分段接收参数；优势：参数复用、延迟执行、函数组合，常用于节流防抖、工具函数封装。'
  },
  {
    question: 'JS 垃圾回收机制原理，两种回收策略',
    standardAnswer: '自动内存管理，回收无引用对象释放内存；1.引用计数：变量引用归零回收，缺陷无法处理循环引用；2.标记清除（现代浏览器主流）：从全局根对象标记可达对象，销毁未标记内存。'
  },
  {
    question: 'setTimeout、setInterval、requestAnimationFrame 区别',
    standardAnswer: 'setTimeout延迟单次执行，存在时间误差；setInterval固定间隔循环，任务阻塞会造成堆积；requestAnimationFrame跟随屏幕刷新帧率60fps，专门用于动画，页面隐藏时自动暂停节省性能。'
  },
  {
    question: '防抖Debounce与节流Throttle原理、适用场景',
    standardAnswer: '防抖：高频触发后延迟n秒执行，中途触发重置计时器，适用于搜索输入、窗口缩放；节流：固定间隔内只执行一次，适用于滚动、拖拽、鼠标移动。'
  },
  {
    question: '严格模式"use strict"有哪些作用？',
    standardAnswer: '禁止未声明变量直接赋值、禁止删除不可删除属性、函数参数不可重名、禁用with、限制eval作用域、this默认不再指向全局window，减少隐性错误提升代码安全。'
  },
  {
    question: '如何处理异步并发请求？all/race/any/allSettled适用场景',
    standardAnswer: 'Promise.all：全部成功才返回，任一失败直接报错；race：最快完成的结果，成功失败均可；any：第一个成功的结果，全部失败才报错；allSettled：等待所有请求结束，统一返回成功失败状态，适合批量接口不关心失败。'
  }
]

// 自动生成递增ID
export const javascriptQuestions: InterviewQuestion[] = rawList.map((item, index) => ({
  id: index + 1,
  ...item
}))