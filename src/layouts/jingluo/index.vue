<script setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  let Sidebar = createAsyncComponent(() => import('/@/layouts/jingluo/Sidebar.vue'));
  let Main = createAsyncComponent(() => import('/@/layouts/jingluo/Main.vue'));
  // let PlayBar = createAsyncComponent(() => import('/@/components/PlayBar.vue'));
</script>
<template>
  <el-container class="jingluo">
    <el-aside>
      <Sidebar />
    </el-aside>
    <el-main>
      <Main />
    </el-main>
    <!-- <PlayBar /> -->
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

  // .el-header,
  // .el-footer {
  // 	height: 50px;
  // 	line-height: 50px;
  // 	padding: 0;
  // }
  // .el-header {
  // 	background-color: @jl-layout-background-color;
  // 	color: @jl-layout-color;
  // }
  // .el-main {
  // 	display: flex;
  // 	overflow: hidden;
  // 	padding: 0;
  // }
  // .el-footer {
  // 	border-top: 1px solid #ddd;
  // }
</style>
