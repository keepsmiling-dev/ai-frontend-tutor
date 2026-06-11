<template>
  <div class="roadmap-container">
    <div class="header">
      <van-icon name="arrow-left" @click="goBack" />
      <span class="title">学习路线</span>
      <span class="placeholder"></span>
    </div>

    <div class="roadmap-list">
      <div
        v-for="(stage, index) in stageList"
        :key="stage.id"
        class="stage-item"
        :class="[index % 2 === 0 ? 'left' : 'right', { first: index === 0 }]"
      >
        <div class="stage-card" @click="showDetail(stage)">
          <div class="card-icon">
            <van-icon :name="stage.icon" size="24" />
          </div>
          <div class="card-content">
            <div class="stage-name">{{ stage.name }}</div>
            <div class="stage-desc">{{ stage.desc }}</div>
            <div class="stage-tags">
              <van-tag
                v-for="tag in stage.tags"
                :key="tag"
                plain
                type="primary"
              >
                {{ tag }}
              </van-tag>
            </div>
          </div>
          <van-button
            size="mini"
            type="primary"
            class="ask-btn"
            @click.stop="askAI(stage)"
          >
            提问
          </van-button>
        </div>
        <!-- 连接线（除了最后一个） -->
        <div
          v-if="index < stageList.length - 1"
          class="connector"
          :class="index % 2 === 0 ? 'connector-left' : 'connector-right'"
        ></div>
      </div>
    </div>

    <van-popup
      v-model:show="showDetailPopup"
      :style="{
        height: '65%',
        borderRadius: '20px 20px 0 0',
        width: '90%',
        maxWidth: '500px',
      }"
      closeable
      round
    >
      <div class="stage-detail-box">
        <!-- 头部标题 -->
        <div class="detail-head">
          <van-icon :name="currentStage.icon" color="#3b82f6" size="26" />
          <div class="head-title">{{ currentStage.name }}</div>
        </div>

        <!-- 基础信息 -->
        <div class="info-line">
          <span>⏱ 学习时长：{{ currentStage.learnTime }}</span>
          <span>📊 难度等级：{{ currentStage.level }}</span>
        </div>

        <!-- 学习目标 -->
        <div class="content-block">
          <div class="block-title">🎯 学习目标</div>
          <div class="block-text">{{ currentStage.target }}</div>
        </div>

        <!-- 阶段一 三件套分点展示 -->
        <div class="content-block" v-if="currentStage.id === 1">
          <div class="block-title">📚 核心学习内容</div>
          <div class="skill-item">
            <p class="skill-name">📄 HTML 基础</p>
            <p class="skill-desc">{{ currentStage.htmlText }}</p>
          </div>
          <div class="skill-item">
            <p class="skill-name">🎨 CSS 样式</p>
            <p class="skill-desc">{{ currentStage.cssText }}</p>
          </div>
          <div class="skill-item">
            <p class="skill-name">⚡ JavaScript 脚本</p>
            <p class="skill-desc">{{ currentStage.jsText }}</p>
          </div>
        </div>

        <!-- 其他阶段统一内容 -->
        <div class="content-block" v-else>
          <div class="block-title">📚 核心学习内容</div>
          <div class="block-text">{{ currentStage.content }}</div>
        </div>

        <!-- 技术标签 -->
        <div class="content-block">
          <div class="block-title">🔖 涉及技术</div>
          <div class="tag-wrap">
            <van-tag
              plain
              type="primary"
              v-for="item in currentStage.tags"
              :key="item"
            >
              {{ item }}
            </van-tag>
          </div>
        </div>

        <!-- 学习资源（分文档和视频） -->
        <div class="content-block">
          <div class="block-title">📖 学习资源</div>

          <!-- 文档资料 -->
          <div class="resource-section" v-if="currentStage.docs?.length">
            <p class="resource-type">📄 文档资料</p>
            <div class="resource-list">
              <a
                v-for="doc in currentStage.docs"
                :key="doc.url"
                :href="doc.url"
                target="_blank"
                class="resource-link"
              >
                {{ doc.name }}
              </a>
            </div>
          </div>

          <!-- 视频资料 -->
          <div class="resource-section" v-if="currentStage.videos?.length">
            <p class="resource-type">🎬 视频教程</p>
            <div class="resource-list">
              <a
                v-for="video in currentStage.videos"
                :key="video.url"
                :href="video.url"
                target="_blank"
                class="resource-link"
              >
                {{ video.name }}
              </a>
            </div>
          </div>
        </div>

        <!-- 学习建议 -->
        <div class="content-block tip-block">
          <div class="block-title">💡 学习建议</div>
          <div class="block-text">{{ currentStage.tips }}</div>
        </div>

        <!-- 底部按钮 -->
          <van-button
            class="mt-5"
            type="primary"
            @click="startLearning(stage, stageList)"
            block
            round
          >
            开始本阶段学习
          </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { showDialog } from 'vant';
import { ref } from 'vue';

const router = useRouter();

// 学习路线
const stageList = ref([
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
      '- VSCode 常用插件及调试技巧\n- Git 常用命令：clone, add, commit, push, pull, branch\n- GitHub 远程仓库管理（创建仓库、提交代码、拉取更新）',
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
      '- Vue 3 基础语法（模板、响应式、计算属性、指令）\n- 组合式 API（ref, reactive, computed, watch）\n- 组件通信（props, emit, provide/inject）\n- 路由 Vue Router（配置路由、导航守卫）\n- 状态管理 Pinia（定义 store、使用 state 和 actions）',
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
      '- 代码规范：ESLint + Prettier 基本配置\n- Vite 构建配置（代理、路径别名、环境变量）\n- 性能优化入门：路由懒加载、图片压缩、了解 WebP 格式',
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
      '- 梳理项目亮点，用 STAR 法则描述项目\n- 准备常见面试题（JS 基础、Vue 原理、网络等）\n- 优化简历描述，模拟面试',
    tags: ['面试', '简历', '求职'],
    docs: [
      {
        name: 'GitHub 前端面试题合集',
        url: 'https://github.com/lgwebdream/FE-Interview',
      },
      {
        name: '前端铜九铁十面试必备八股文',
        url: 'https://juejin.cn/post/7270471613547249699',
      },
      {
        name: '（打不开）如何写好前端简历（掘金）',
        url: 'https://juejin.cn/post/6844903961358745614',
      },
      {
        name: '（打不开）前端面试指南（掘金）',
        url: 'https://juejin.cn/post/6844904118230384647',
      },
    ],
    videos: [
      {
        name: '(打不开)前端面试技巧（渡一教育）',
        url: 'https://www.bilibili.com/video/BV1iT4y1M7wU',
      },
    ],
    tips: '面试官更看重你对项目的理解，而不是背诵八股文。多用 STAR 法则描述项目，多模拟面试能大幅提升通过率。',
  },
]);

const goBack = () => router.back();

const askAI = (stage: any) => {
  router.push(
    `/?question=${encodeURIComponent(`我正在学习${stage.name}，有哪些学习建议？`)}`
  );
};

// 从底部平滑弹出的详情模态框
const showDetailPopup = ref(false);
const currentStage = ref<any>(null);
const showDetail = (stage: any) => {
  currentStage.value = stage;
  showDetailPopup.value = true;
};

const stage = defineProps({
  stage: Object, // 或者你是 ref/reactive 定义的当前阶段
})
const startLearning = (currentStage:any, list:any) => {
  // 安全判断 ✅ 解决报错
  if (!currentStage) {
    alert('当前阶段不存在')
    return
  }

  // 你要的整个列表这里也能拿到
  console.log('整个列表', list)

  // 打开视频/文档
  if (currentStage.videos?.length) {
    window.open(currentStage.videos[0].url, '_blank')
  } else if (currentStage.docs?.length) {
    window.open(currentStage.docs[0].url, '_blank')
  } else {
    alert('暂无学习资源')
  }
}
</script>

<style scoped lang="scss">
.roadmap-container {
  /* ========== 改动1：背景改为主题变量 ========== */
  background: var(--bg-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 10;

  .title {
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(
      135deg,
      var(--title-grad-from),
      var(--title-grad-to)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .placeholder {
    width: 24px;
  }

  .van-icon {
    font-size: 24px;
    color: #3b82f6;
  }
}

.roadmap-list {
  padding: 20px 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
}

.stage-item {
  position: relative;
  display: flex;
  flex-direction: column;

  &.left {
    align-items: flex-start;

    .stage-card {
      margin-left: 8%;
      border-radius: 24px 24px 24px 12px;
      /* ========== 改动5：卡片背景 ========== */
      background: var(--card-bg);
      box-shadow: 8px 12px 24px rgba(59, 130, 246, 0.12);
    }
  }

  &.right {
    align-items: flex-end;

    .stage-card {
      margin-right: 8%;
      border-radius: 24px 24px 12px 24px;
      /* ========== 改动6：卡片背景 ========== */
      background: var(--card-bg);
      box-shadow: -8px 12px 24px rgba(59, 130, 246, 0.12);
    }
  }

  &.first {
    margin-top: 0;
  }
}

.stage-card {
  width: 60%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(4px);
  /* ========== 改动7：卡片边框 ========== */
  border: 1px solid var(--border-color);

  &:active {
    transform: scale(0.98);
  }

  .card-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3b82f6;
  }

  .card-content {
    flex: 1;
  }

  .stage-name {
    font-size: 18px;
    font-weight: 700;
    /* ========== 改动8：标题文字 ========== */
    color: var(--text-color);
    margin-bottom: 6px;
  }

  .stage-desc {
    font-size: 14px;
    /* ========== 改动9：描述文字 ========== */
    color: var(--text-color);
    opacity: 0.85;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  .stage-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ask-btn {
    align-self: flex-start;
    margin-top: 8px;
    background: linear-gradient(95deg, #3b82f6, #2563eb);
    border: none;
    color: white;
    font-weight: 500;
  }
}

.connector {
  position: relative;
  width: 60px;
  height: 40px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: contain;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100px;
    pointer-events: none;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &.connector-left::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 80'%3E%3Cpath fill='none' stroke='%233b82f6' stroke-width='2' stroke-dasharray='4 4' d='M10,0 C10,30 50,30 50,80' /%3E%3Ccircle cx='10' cy='0' r='4' fill='%233b82f6'/%3E%3C/svg%3E");
  }

  &.connector-right::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 80'%3E%3Cpath fill='none' stroke='%233b82f6' stroke-width='2' stroke-dasharray='4 4' d='M50,0 C50,30 10,30 10,80' /%3E%3Ccircle cx='50' cy='0' r='4' fill='%233b82f6'/%3E%3C/svg%3E");
  }
}

@media (max-width: 500px) {
  .stage-card {
    width: 92%;
  }

  .connector {
    transform: scale(0.8);
  }
}

.detail-content {
  padding: 24px 20px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    /* ========== 改动10：详情标题 ========== */
    color: var(--text-color);
  }

  .detail-text {
    font-size: 15px;
    line-height: 1.5;
    /* ========== 改动11：详情文字 ========== */
    color: var(--text-color);
    margin-bottom: 16px;
  }

  .detail-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }
}

.stage-detail-box {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: var(--bg-color);

  .detail-head {
    display: flex;
    align-items: center;
    gap: 10px;

    .head-title {
      font-size: 20px;
      font-weight: 700;
      /* ========== 改动12：详情头部标题 ========== */
      color: var(--text-color);
    }
  }

  .info-line {
    display: flex;
    gap: 20px;
    font-size: 13px;
    /* ========== 改动13：信息文字 ========== */
    color: var(--text-color);
    opacity: 0.7;
    margin: 12px 0 20px;
    padding-bottom: 12px;
    /* ========== 改动14：底部边框 ========== */
    border-bottom: 1px solid var(--border-color);
  }

  .content-block {
    margin-bottom: 20px;

    .block-title {
      font-size: 15px;
      font-weight: 600;
      /* ========== 改动15：模块标题 ========== */
      color: var(--text-color);
      margin-bottom: 8px;
      text-align: left;
    }

    .block-text {
      font-size: 14px;
      line-height: 1.6;
      /* ========== 改动16：模块文字 ========== */
      color: var(--text-color);
      white-space: pre-line;
      text-align: left;
    }

    // 缩进排版：文档资料 / 视频教程 整体后退
    .resource-section {
      margin-left: 16px;
      margin-top: 8px;
      text-align: left;

      .resource-type {
        font-size: 13px;
        /* ========== 改动17：资源类型文字 ========== */
        color: var(--text-color);
        opacity: 0.7;
        margin-bottom: 6px;
        text-align: left;
      }

      .resource-list {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .resource-link {
          font-size: 14px;
          color: #3b82f6;
          text-decoration: underline;
          text-align: left;

          &:hover {
            color: #2563eb;
          }
        }
      }
    }
  }

  .skill-item {
    margin-bottom: 12px;

    .skill-name {
      font-size: 14px;
      font-weight: 500;
      color: #3b82f6;
      margin: 0 0 4px 0;
      text-align: left;
    }

    .skill-desc {
      font-size: 13.5px;
      /* ========== 改动18：技能描述 ========== */
      color: var(--text-color);
      line-height: 1.5;
      margin: 0;
      text-align: left;
    }
  }

  .tag-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tip-block {
    /* ========== 改动19：提示块背景 ========== */
    background: var(--border-color);
    padding: 12px;
    border-radius: 8px;
  }
}
</style>
