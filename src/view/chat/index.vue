<template>
  <div class="chat-container">
    <!-- 消息列表 -->
    <div class="message-list" ref="messageListRef">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        class="message"
        :class="msg.role"
      >
        <div class="avatar">
          <van-icon :name="msg.role === 'user' ? 'user-o' : 'service-o'" />
        </div>
        <div class="bubble">
          <div
            class="content markdown-body"
            v-html="renderMarkdown(msg.content)"
          ></div>
        </div>
      </div>
      <div v-if="loading" class="message assistant">
        <div class="avatar"><van-icon name="service-o" /></div>
        <div class="bubble">
          <div class="content typing">正在输入...</div>
        </div>
      </div>
    </div>

    <!-- 预设问题区域 -->
    <div class="preset-area" v-if="!loading">
      <div class="preset-scroll">
        <van-button
          v-for="q in presetList"
          :key="q"
          size="small"
          plain
          type="primary"
          @click="quickSend(q)"
          class="preset-btn"
        >
          {{ q }}
        </van-button>
      </div>
      <div class="clear-icon-wrapper" @click="clearChat">
        <van-icon name="delete-o" class="clear-icon" />
        <span class="tooltip-text">删除全部对话</span>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <van-field
        v-model="inputText"
        type="textarea"
        :autosize="{ minHeight: 60, maxHeight: 300 }"
        placeholder="问一个前端问题..."
        :border="false"
        @keyup.enter="sendMessage"
      />
      <van-button
        type="primary"
        size="small"
        @click="sendMessage"
        :loading="loading"
        :disabled="!inputText.trim() && !loading"
      >
        发送
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import { showToast } from 'vant';
import { fetchAIResponse } from '@/api/ai';
import useChatStore from '@/store/modules/chat';
import { renderMarkdown } from '@/utils/markdowm';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'


const route = useRoute();
const router = useRouter();
// 聊天存储数据
const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore)   

const inputText = ref('');
const loading = ref(false);
// 存储用户消息DOM
const messageListRef = ref<HTMLElement | null>(null);

// 将最新提问滚动到可视区顶部
const scrollUserMsgToTop = async () => {
  await nextTick();
  const container = messageListRef.value;
  if (!container) return;

  // 找到所有用户消息
  const userMessages = container.querySelectorAll('.message.user');
  if (userMessages.length === 0) return;

  // 取最后一条
  const lastOne = userMessages[userMessages.length - 1] as HTMLElement;

  // 置顶！
  lastOne.scrollIntoView({
    behavior: 'instant',
    block: 'start',
  });
};

// 预设问题列表
const presetList = [
  '什么是闭包？',
  'Vue 响应式原理',
  '事件循环解释',
  'Promise vs async/await',
  '如何解决跨域？',
  '前端学习路线',
];

// 快速发送预设问题
const quickSend = (question: string) => {
  inputText.value = question;
  sendMessage();
};

// 清除对话记录
const clearChat = async () => {
  chatStore.resetMessages();
};

// 发送消息
const sendMessage = async () => {
  const text = inputText.value.trim();
  if (!text || loading.value) return;

  chatStore.addMessage({ role: 'user', content: text });
  inputText.value = '';

  await scrollUserMsgToTop();
  loading.value = true;

  try {
    const reply = await fetchAIResponse(messages.value);
    chatStore.addMessage({ role: 'assistant', content: reply });
  } catch (error) {
    chatStore.addMessage({
      role: 'assistant',
      content: '抱歉，AI 服务暂时无法使用。',
    });
  } finally {
    loading.value = false;
    scrollUserMsgToTop();
  }
};

// 复制按钮
const handleCopy = async (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const copyBtn = target.closest('.copy-code-btn') as HTMLElement | null;

  if (!copyBtn) return;
  event.stopPropagation();

  const code = copyBtn.getAttribute('data-code');
  if (!code) return;

  const copyTxt = copyBtn.querySelector('.copy-txt') as HTMLElement | null;
  const okTxt = copyBtn.querySelector('.success-icon') as HTMLElement | null;

  if (!copyTxt || !okTxt) return;

  try {
    await navigator.clipboard.writeText(code);

    // 切换显示
    copyTxt.style.display = 'none';
    okTxt.style.display = 'inline';
    setTimeout(() => {
      copyTxt.style.display = 'inline';
      okTxt.style.display = 'none';
    }, 2000);
  } catch (error) {
    console.error('复制失败', error);
    showToast('复制失败，请手动复制');
  }
};

onMounted(() => {
  if (messages.value.length === 0) {
    chatStore.addMessage({
      role: 'assistant',
      content: '你好！我是前端学习助手。请问有什么前端问题？',
    });
  }

  document.addEventListener('click', handleCopy);

  // 处理从学习路线页面传递过来的自动提问参数
  const question = route.query.question as string;
  if (question) {
    // 只赋值到输入框，不调用 sendMessage()
    inputText.value = question;

    // 清空 URL 参数，避免刷新页面重复出现
    router.replace({ query: {} });
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleCopy);
});
</script>

<style scoped lang="scss">
@import '@/style/variable.scss';

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-color) !important;
  color: var(--text-color);

  .message-list {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .message {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      max-width: 85%;

      &.user {
        flex-direction: row-reverse;
        align-self: flex-end;
        .bubble {
          /* ========== 改动2：使用主题选中色 ========== */
          background-color: var(--border-color) !important;
          /* ========== 改动3：文字使用主题色 ========== */
          color: var(--text-color) !important;
        }
      }

      &.assistant {
        align-self: flex-start;
        .bubble {
          /* ========== 改动4：气泡背景 ========== */
          background-color: var(--card-bg) !important;
          /* ========== 改动5：边框 ========== */
          border: 1px solid var(--border-color) !important;
          /* ========== 改动6：文字颜色 ========== */
          color: var(--text-color) !important;
        }
      }

      .avatar {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        /* ========== 改动7：头像背景 ========== */
        background-color: var(--border-color) !important;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }

      .bubble {
        max-width: calc(100% - 40px);
        padding: 10px 12px;
        border-radius: 18px;
        word-wrap: break-word;
        font-size: 15px;
        line-height: 1.4;
        text-align: left;
      }

      .typing::after {
        content: '';
        display: inline-block;
        width: 16px;
        text-align: left;
        animation: typing 1s infinite;
      }
    }
  }

  @keyframes typing {
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  }

  .preset-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--bg-color) !important;
    border-top: 1px solid var(--border-color) !important;
    padding: 8px 0;

    .preset-scroll {
      display: flex;
      overflow-x: auto;
      gap: 10px;
      padding: 0 12px;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        height: 4px;
      }

      .preset-btn {
        flex-shrink: 0;
        white-space: nowrap;
        color: var(--preset-btn-color);
        border-color: var(--preset-btn-color);
        background-color: var(--bg-color);
      }

      .preset-btn:hover {
        color: $theme-hover-color;
        border-color: $theme-hover-color;
      }
    }

    .clear-icon-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      margin-right: 40px;

      .clear-icon {
        font-size: 26px; // 增大图标尺寸（原 van-icon 默认约 20px）
      }

      .tooltip-text {
        visibility: hidden;
        position: absolute;
        bottom: 120%; // 悬浮在图标上方
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--tooltip-bg);
        color: var(--tooltip-text);
        text-align: center;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transition:
          opacity 0.2s ease,
          visibility 0.2s;
        pointer-events: none; // 让提示不干扰点击
        backdrop-filter: blur(4px);
      }

      &:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .input-area {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background-color: var(--bg-color) !important;
    border-top: 1px solid var(--border-color) !important;

    .van-field {
      flex: 1;
      background-color: var(--card-bg) !important;
      border-radius: 20px;
      padding: 10px 16px;
      box-shadow: 0 3px 10px rgba(0, 162, 232, 0.2);
      color: var(--van-field-input-text-color) !important;
    }

    .van-field__control textarea {
      max-height: 300px;
      overflow-y: auto;
    }

    .van-button {
      flex-shrink: 0;
    }
  }
}
</style>
