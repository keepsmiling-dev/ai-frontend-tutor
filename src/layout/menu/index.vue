<template>
  <template v-for="(item, _index) in menuList" :key="item.path">
    <!-- 1.没有子路由 -->
    <van-sidebar-item
      v-if="!item.children && !item.meta.hidden"
      :title="item.meta.title"
      :to="item.path"
    ></van-sidebar-item>

    <!-- 2.仅有一个子路由，直接显示子路由 -->
    <van-sidebar-item
      v-else-if="
        item.children &&
        item.children.length === 1 &&
        !item.children[0].meta.hidden
      "
      :title="item.children[0].meta.title"
      :to="item.children[0].path"
    ></van-sidebar-item>

    <!-- 3.有多个子路由，显示折叠菜单 -->
    <!-- 折叠菜单内容 -->
    <van-collapse
      v-else-if="item.children && item.children.length > 1"
      v-model="activeNames"
    >
      <van-collapse-item :name="item.path" :title="item.meta.title" :border="false">
        <Menu :menuList="item.children"></Menu>
      </van-collapse-item>
    </van-collapse>
  </template>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { ref,watch  } from 'vue';
import { useRouter,useRoute } from 'vue-router';

const props = defineProps(['menuList']);
// 折叠菜单记录当前菜单
const activeNames = ref(['1']);
// 获取路由器对象
const router = useRouter();
const route = useRoute()
const userStore = useUserStore()
const active = ref(0)
// 监听路由变化，自动更新 active
watch(
  () => route.path,
  (newPath) => {
    // 找到当前路由在菜单列表里的索引，赋值给 active
    const index = userStore.menuRoutes.findIndex(item => item.path === newPath);
    if (index > -1) {
      active.value = index;
    }
  },
  { immediate: true }
);


</script>
<script lang="ts">
export default {
  name: 'Menu',
};
</script>

<style scoped lang="scss">

</style>
