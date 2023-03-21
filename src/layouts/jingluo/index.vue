<script setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  let Sidebar = createAsyncComponent(() => import('/@/layouts/jingluo/Sidebar.vue'));
  let Main = createAsyncComponent(() => import('/@/layouts/jingluo/Main.vue'));
  let PlayBar = createAsyncComponent(() => import('/@/layouts/jingluo/PlayBarTmp/PlayBar.vue'));
</script>
<template>
  <el-container class="jingluo">
    <el-aside>
      <Sidebar />
    </el-aside>
    <el-main>
      <Main />
    </el-main>
    <PlayBar />
  </el-container>
</template>
<style lang="less" scoped>
  .jingluo {
    width: 100%;
    height: 100%;
    background-color: #fafafa;
  }
  .el-aside {
    width: 270px;
  }
</style>
