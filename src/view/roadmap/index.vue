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
          @click="startLearning(currentStage, stageList)"
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
import { ref } from 'vue';
import { stageList } from '@/data/roadmap/roadmap';

const router = useRouter();

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
});

const startLearning = (currentStage: any, _list: any) => {
  if (!currentStage) {
    alert('当前阶段不存在');
    return;
  }

  const hasVideo =
    Array.isArray(currentStage.videos) && currentStage.videos.length > 0;
  const hasDoc =
    Array.isArray(currentStage.docs) && currentStage.docs.length > 0;

  if (hasVideo) {
    window.open(currentStage.videos[0].url, '_blank');
  } else if (hasDoc) {
    window.open(currentStage.docs[0].url, '_blank');
  } else {
    alert('暂无学习资源');
  }
};
</script>

<style scoped lang="scss">
@import '@/style/variable.scss';

.roadmap-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: var(--bg-color);

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
    flex-shrink: 0;

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
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px 40px 40px;
    gap: 32px;
    position: relative;

    .stage-item {
      position: relative;
      display: flex;
      flex-direction: column;

      &.left {
        align-items: flex-start;

        .stage-card {
          margin-left: 8%;
          border-radius: 24px 24px 24px 12px;
          background: var(--card-bg);
          box-shadow: 8px 12px 24px rgba(59, 130, 246, 0.12);
        }
      }

      &.right {
        align-items: flex-end;

        .stage-card {
          margin-right: 8%;
          border-radius: 24px 24px 12px 24px;
          background: var(--card-bg);
          box-shadow: -8px 12px 24px rgba(59, 130, 246, 0.12);
        }
      }

      &.first {
        margin-top: 0;
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
          color: var(--text-color);
          margin-bottom: 6px;
        }

        .stage-desc {
          font-size: 14px;
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
        color: var(--text-color);
      }
    }

    .info-line {
      display: flex;
      gap: 20px;
      font-size: 13px;
      color: var(--text-color);
      opacity: 0.7;
      margin: 12px 0 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .content-block {
      margin-bottom: 20px;

      .block-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-color);
        margin-bottom: 8px;
        text-align: left;
      }

      .block-text {
        font-size: 14px;
        line-height: 1.6;
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
      background: var(--border-color);
      padding: 12px;
      border-radius: 8px;
    }
  }
  
  @media (max-width: ($layout-pc-breakpoint - 1px)) {
    // 头部调整
    .header {
      padding: 10px 12px;

      .title {
        font-size: 16px;
      }

      .van-icon {
        font-size: 20px;
      }

      .placeholder {
        width: 16px;
      }
    }

    // 卡片列表
    .roadmap-list {
      padding: 12px 12px 30px; // 左右内边距减小
      gap: 20px;
    }

    // 卡片整体
    .stage-card {
      width: 92%;
      padding: 12px;
      gap: 6px; // 内部间距缩小

      .card-icon {
        width: 32px;
        height: 32px;
        font-size: 18px;
        border-radius: 16px;
      }

      .stage-name {
        font-size: 15px;
      }

      .stage-desc {
        font-size: 13px;
        line-height: 1.4;
        margin-bottom: 4px;
      }

      .stage-tags {
        gap: 4px;

        .van-tag {
          font-size: 11px;
          padding: 2px 6px;
        }
      }

      .ask-btn {
        font-size: 12px;
        padding: 4px 12px;
        margin-top: 4px;
      }
    }

    // 连接线
    .connector {
      width: 30px;
      height: 24px;
      transform: scale(0.6);
      margin: 0 auto;

      &::after {
        height: 60px; // 减少高度
      }
    }

    // 连接线的左右偏移（如果有必要可以调整）
    &.connector-left::after,
    &.connector-right::after {
      // 可以适当调整 SVG 大小，但 scale 已经处理了
    }

    // 左/右偏移微调（可选）
    .stage-item.left .stage-card {
      margin-left: 4%;
    }
    .stage-item.right .stage-card {
      margin-right: 4%;
    }
  }
}
</style>
