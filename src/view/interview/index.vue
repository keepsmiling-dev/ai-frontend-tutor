<template>
  <div class="html-question-page">
    <!-- 题干 -->
    <div class="question-card">
      <div class="question-title">
        <span>📝 题干</span>
      </div>
      <div class="question-content">
        {{ currentQuestion.question }}
      </div>
    </div>

    <!-- 答题区域 -->
    <div class="answer-card">
      <div class="label">✍️ 请输入你的答案</div>
      <van-field
        v-model="userAnswer"
        rows="5"
        type="textarea"
        placeholder="开始写下你的答案..."
      />
    </div>

    <!-- AI批改结果 -->
    <div class="correct-card" :class="{ show: showCorrect }">
      <div class="label">🤖 AI 智能批改</div>
      <div class="score-line">
        得分：<span class="score">{{ correctScore }} 分</span>
      </div>
      <div class="comment-text">{{ correctComment }}</div>
    </div>

    <!-- 标准答案 -->
    <Transition name="silde-fade">
      <div class="standard-card" :class="{ show: showStandard }">
        <div class="label">📖 标准答案</div>
        <div class="standard-text">{{ currentQuestion.standardAnswer }}</div>
      </div>
    </Transition>

    <!-- 功能按钮 -->
    <div class="btn-group">
      <van-button type="primary" @click="aiCorrect" :loading="loading"
        >AI批改</van-button
      >
      <van-button type="default" @click="showStandard = !showStandard">
        {{ showStandard ? '收起答案' : '查看答案' }}
      </van-button>
      <van-button type="success" @click="nextQuestion">下一题</van-button>
    </div>

    <!-- 进度条 -->
    <div class="progress-group">
      <div class="progress-text">
        进度：{{ currentIndex + 1 }} / {{ questionList.length }}
      </div>
      <van-progress :percentage="progressPercent" color="#1989fa" />
    </div>

    <!-- 页面内部右下角 唤起题目列表按钮 -->
    <div class="inner-fab" @click="showListPopup = true">题目列表</div>

    <!-- 题目列表弹窗 -->
    <van-popup
      v-model:show="showListPopup"
      position="bottom"
      round
      style="position: absolute; max-height: 60%"
    >
      <div class="list-wrap">
        <div class="list-top">
          <span>全部题目</span>
          <van-icon name="close-o" @click="showListPopup = false" />
        </div>
        <div class="list-content">
          <div
            v-for="(item, idx) in questionList"
            :key="idx"
            class="list-item"
            :class="{ active: idx === currentIndex }"
            @click="switchQuestion(idx)"
          >
            {{ idx + 1 }}. {{ item.question }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, Transition } from 'vue';
import { useRoute } from 'vue-router';
import { htmlQuestions, cssQuestions, javascriptQuestions,vueQuestions } from '@/data/interview'
import type { InterviewQuestion } from '@/store/modules/type';
import { fetchAIResponse, type ChatMessage } from '@/api/ai.ts';

const route = useRoute();
const currentIndex = ref(0);
const questionList = ref<InterviewQuestion[]>([]);
const userAnswer = ref('');

const showStandard = ref(false);
const showListPopup = ref(false);

// AI 批改相关
const showCorrect = ref(false);
const loading = ref(false);
const correctScore = ref(0);
const correctComment = ref('');

// 根据路由路径匹配对应题库
const setQuestionList = () => {
  currentIndex.value = 0;
  userAnswer.value = '';
  showStandard.value = false;
  showCorrect.value = false;
  correctScore.value = 0;
  correctComment.value = '';

  if (route.path.includes('html')) {
    questionList.value = htmlQuestions;
  } else if (route.path.includes('css')) {
    questionList.value = cssQuestions;
  } else if (route.path.includes('javascript')) {
    questionList.value = javascriptQuestions;
  } else if (route.path.includes('vue')){
    questionList.value = vueQuestions;
  } else {
    questionList.value = htmlQuestions;
  }
};

watch(() => route.path, setQuestionList, { immediate: true });

// 当前题目
const currentQuestion = computed(() => {
  return (
    questionList.value[currentIndex.value] || {
      question: '',
      standardAnswer: '',
    }
  );
});

// 进度百分比
const progressPercent = computed(() => {
  if (!questionList.value.length) return 0;
  return Math.round(
    ((currentIndex.value + 1) / questionList.value.length) * 100
  );
});

// 切换题目
const switchQuestion = (idx: number) => {
  currentIndex.value = idx;
  userAnswer.value = '';
  showStandard.value = false;
  showCorrect.value = false;
  correctScore.value = 0;
  correctComment.value = '';
  showListPopup.value = false;
};

// AI 批改
const aiCorrect = async () => {
  if (!userAnswer.value.trim()) {
    alert('请先输入你的答案');
    return;
  }

  loading.value = true;
  correctComment.value = 'AI 正在批改中，请稍候...';
  correctScore.value = 0; // 重置分数

  try {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content:
          '你是专业的前端面试老师，请批改答案，给出0-100分 + 一段完整评语，不要分点，不要格式，直接自然回复。',
      },
      {
        role: 'user',
        content: `题目：${currentQuestion.value.question}\n我的答案：${userAnswer.value}`,
      },
    ];

    const result = await fetchAIResponse(messages);
    const scoreMatch = result.match(/(\d+)/);
    correctScore.value = scoreMatch ? parseInt(scoreMatch[0]) : 0;
    correctComment.value = result.trim();

    showCorrect.value = true;
  } catch (err) {
    correctComment.value = 'AI 批改失败，请稍后重试';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 下一题
const nextQuestion = () => {
  if (currentIndex.value >= questionList.value.length - 1) {
    alert('已经做完当前所有题目啦');
    return;
  }
  currentIndex.value++;
  userAnswer.value = '';
  showStandard.value = false;
  showCorrect.value = false;
  correctScore.value = 0;
  correctComment.value = '';
};
</script>

<style scoped lang="scss">
.html-question-page {
  position: relative;
  padding: 16px;
  background: var(--bg-color);
  min-height: calc(100vh - 60px);
  position: relative;
  box-sizing: border-box;
}

.question-card,
.answer-card,
.standard-card,
.correct-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 16px;
  text-align: left;
  overflow: hidden;
  /*  禁止背景色、文字色过渡（只保留你要的动画） */
  transition: max-height 0.3s ease, padding 0.3s ease, margin 0.3s ease !important;
}

.question-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: var(--text-color);
}

.question-content {
  margin-top: 10px;
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.6;
}

.label {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-color);
}

.standard-text,
.correct-card {
  color: #07c160;
  line-height: 1.6;
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(8px);
  padding: 0 16px;
  margin: 0;
}

/* 卡片缩展 */
.standard-card,
.correct-card {
  max-height: 0;
  padding: 0 16px;
  margin: 0;
}
.standard-card.show,
.correct-card.show {
  max-height: 500px;
  padding: 14px 16px;
  margin-bottom: 16px;
  /* transition: all 1s linear; */
   transition: max-height 0.8s ease, padding 0.3s ease, margin 0.3s ease;
}

/* AI 批改样式 */
.correct-card {
  border-left: 3px solid #1989fa;
}
.score-line {
  font-size: 15px;
  margin-bottom: 8px;
}
.score {
  color: #f56c6c;
  font-weight: bold;
}
.comment-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-color);
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.progress-group {
  background: var(--card-bg);
  padding: 12px;
  border-radius: 12px;
}

.progress-text {
  font-size: 14px;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 8px;
}

/* 页面内部右下角按钮 */
.inner-fab {
  position: absolute;
  right: 16px;
  bottom: 20px;
  padding: 6px 12px;
  background-color: #1989fa;
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

/* 弹窗内部样式 */
.list-wrap {
  width: 100%;
  max-height: 60vh;
}

.list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}

.list-content {
  padding: 10px 16px;
  overflow-y: auto;
  max-height: 50vh;
  max-width: 500px;
  margin: 0 auto;
}

.list-item {
  padding: 10px 0;
  font-size: 14px;
  /* ========== 改动10：列表分割线 ========== */
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  text-align: left;
  /* ========== 改动11：列表文字 ========== */
  color: var(--text-color);
}

.list-item.active {
  color: #1989fa;
  font-weight: 500;
}
</style>
