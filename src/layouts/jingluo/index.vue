<script setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  let Header = createAsyncComponent(() => import('/@/layouts/jingluo/Header.vue'));
  let Sidebar = createAsyncComponent(() => import('/@/layouts/jingluo/Sidebar.vue'));
  // let PlayBar = createAsyncComponent(() => import('/@/layouts/jingluo/PlayBarTmp/PlayBar.vue'));
</script>
<template>
  <el-container class="jingluo">
    <el-header><Header /></el-header>
    <el-container>
      <el-aside>
        <Sidebar />
      </el-aside>
      <el-main>
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <Component :is="Component" class="main" />
          </KeepAlive>
        </RouterView>
      </el-main>
    </el-container>
    <!-- <PlayBar /> -->
  </el-container>
</template>
<style lang="less" scoped>
  .jingluo {
    width: 100%;
    height: 100%;
    background-color: #fafafa;
  }

  .el-header {
    padding: 0;
    height: 50px;
  }
  .el-aside {
    width: 270px;
    background: #fafafa;
    overflow: hidden;
    border-right: 1px solid #e0e0e0;
  }
  .el-main {
    padding: 0px;
    flex: 1;
    .main {
      overflow: hidden;
      padding: 10px 10px 0 10px;
    }
  }
  .el-container {
    overflow: auto;
  }
</style>
