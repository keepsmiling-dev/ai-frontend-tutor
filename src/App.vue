<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
</script>
  
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 750px;       
  margin: 0 auto;
  background: var(--bg-color);
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0,0,0,0.08); 
}
</style>