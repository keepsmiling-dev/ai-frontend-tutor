<template>
  <div class="header">
    <div class="title">{{ fullTitle }}</div>
    <div class="theme-switch" @click="toggleTheme">
      <span class="emoji">{{ isDark ? '🌙' : '☀️' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/store/modules/theme'
import { storeToRefs } from 'pinia'

const route = useRoute()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const fullTitle = computed(() => {
  const matched = route.matched
  const titleArr = matched
    .filter(item => !item.meta?.hidden)
    .map(item => item.meta?.title)
    .filter(Boolean)
  return titleArr.join(' / ') || 'AI 前端学习助手'
})

const isDark = computed(() => theme.value === 'dark')

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  
  .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
  }
  
  .theme-switch {
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s;
    font-size: 24px;
    line-height: 1;
    
    &:active {
      background-color: var(--border-color);
    }
  }
}
</style>