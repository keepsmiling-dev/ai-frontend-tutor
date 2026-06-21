<template>
  <div class="layout_container">
    <!-- 遮罩层：点击关闭侧边栏 -->
    <div
      class="sidebar-overlay"
      v-if="isMobile && sidebarOpen"
      @click="toggleSidebar"
    ></div>
    <!-- 移动端汉堡按钮 -->
    <div class="menu-toggle" @click="toggleSidebar" v-if="isMobile">
      <van-icon name="bars" />
    </div>
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ 'sidebar-open': sidebarOpen }">
      <van-sidebar v-model="active">
        <!-- 根据路由动态生成菜单 -->
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </van-sidebar>
    </div>

    <!-- 右侧内容 -->
    <div class="layout_content">
      <div class="layout_header">
        <Header></Header>
      </div>

      <div class="layout_main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Menu from './menu/index.vue';
import Header from './header/header.vue';
import useUserStore from '@/store/modules/user';

const active = ref(0);
const userStore = useUserStore();
const isMobile = ref(window.innerWidth < 768);
const sidebarOpen = ref(false);
const route = useRoute();

watch(
  () => route.path,
  (newPath, oldPath) => {
    if (isMobile.value && sidebarOpen.value) {
      sidebarOpen.value = false;
    }
  }
);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) sidebarOpen.value = false;
};
onMounted(() => window.addEventListener('resize', handleResize));
onUnmounted(() => window.removeEventListener('resize', handleResize));
</script>
<script lang="ts">
export default {
  name: 'Layout',
};
</script>

<style scoped lang="scss">
@import '@/style/variable.scss';

.layout_container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-x: hidden !important;

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .menu-toggle {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 999;
    display: none;
    font-size: 24px;
    padding: 8px;
    background: var(--bg-color);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    @media (max-width: 767px) {
      display: block;
    }
  }

  .layout_slider {
    width: $base-menu-width;
    min-width: $base-menu-width;
    height: 100vh;
    background: var(--bg-color);
    transition: all 0.3s;
    border-right: 1px solid var(--border-color);
    flex-shrink: 0;
    transition:
      width 0.3s ease,
      min-width 0.3s ease !important;

    :deep(.van-sidebar) {
      width: 100%;
      background: transparent !important;
      border: none !important;
    }
    :deep(.van-sidebar-item) {
      background: transparent !important;
      color: var(--text-color) !important;
      height: $menu-item-height;
    }

    :deep(.van-sidebar-item:not(.van-sidebar-item--select):hover) {
      background-color: var(--menu-hover-bg) !important;
      color: var(--text-color) !important;
    }

    :deep(.van-sidebar-item--select) {
      color: var(--menu-selected-text-color) !important;
      font-weight: var(--menu-selected-font-weight) !important;
    }

    :deep(.van-hairline--top-bottom::before),
    :deep(.van-hairline--top-bottom::after),
    :deep(.van-hairline--top::before),
    :deep(.van-hairline--bottom::after) {
      display: none !important;
      border: none !important;
    }

    :deep(.van-collapse) {
      background: transparent !important;
      border: none !important;
    }

    :deep(.van-collapse-item) {
      background: transparent !important;
      border: none !important;
    }

    :deep(.van-collapse-item > .van-cell) {
      background: transparent !important;
      color: var(--text-color);
      height: $menu-item-height;
      padding: 0 16px;
      display: flex;
      align-items: center;
    }

    :deep(.van-collapse-item:has(.van-collapse-item__title--expanded)) {
      border: 1px solid var(--collapse-border-color) !important;
      border-radius: 4px;
    }

    :deep(.van-collapse-item__title--expanded) {
      border-bottom: 1px solid var(--collapse-title-border-color) !important;
    }

    :deep(.van-collapse-item__content) {
      background: transparent !important;
      padding: 0 !important;
    }

    :deep(.van-collapse-item__content .van-sidebar-item) {
      background: transparent !important;
    }

    :deep(.van-collapse-item__content .van-sidebar-item:not(.van-sidebar-item--select):hover) {
      background-color: var(--menu-hover-bg) !important;
      color: var(--text-color) !important;
      border-bottom: none !important;
    }

    :deep(.van-collapse-item__content .van-sidebar-item--select) {
      color: var(--menu-selected-text-color) !important;
      font-weight: var(--menu-selected-font-weight) !important;
      border: none !important;
    }

    @media (max-width: 767px) {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 1000;
      width: $base-menu-width;
      box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
      &.sidebar-open {
        transform: translateX(0);
      }
    }
  }

  .layout_content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
    overflow-x: hidden !important;
    background-color: var(--bg-color);

    .layout_header {
      flex-shrink: 0;
      padding: 0 16px;
      background-color: var(--bg-color);

      @media (max-width: 768px) {
        padding-left: 50px !important;
        .title {
          font-size: 16px !important;
        }
      }
    }

    .layout_main {
      flex: 1;
      width: 100%;
      min-height: 0;
      min-width: 0;
      background: var(--bg-color);
      overflow-y: auto !important;
      overflow-x: hidden !important;

      @media (max-width: ($layout-pc-breakpoint - 1px)) {
        &::-webkit-scrollbar {
          display: none !important;
        }
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;

        overscroll-behavior-x: none;
        touch-action: pan-y;
      }
    }

    @media (max-width: ($layout-pc-breakpoint - 1px)) {
      margin-left: 0 !important;
    }
  }
}
</style>