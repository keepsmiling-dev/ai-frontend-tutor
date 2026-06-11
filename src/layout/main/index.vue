<template>
  <!-- 正常、标准、稳定的路由出口 -->
  <transition name="fade">
    <router-view />
  </transition>
</template>

<script setup lang="ts">
</script>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>