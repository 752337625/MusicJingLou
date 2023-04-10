<script setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useSongStore from '/@/store/modules/song';

  let Header = createAsyncComponent(() => import('/@/layouts/jingluo/Header.vue'));
  let Sidebar = createAsyncComponent(() => import('/@/layouts/jingluo/Sidebar.vue'));
  let PlayBar = createAsyncComponent(() => import('/@/components/PlayBarTmp/PlayBar.vue'));
  const songStore = useSongStore();
  const playIndex = computed(() => songStore.getPlayIndex);
  const playList = computed(() => songStore.getPlayList);
  const curSongInfo = computed(() => playList.value[playIndex.value]);
</script>
<template>
  <el-container class="jingluo">
    <el-header><Header /></el-header>
    <el-container>
      <el-aside>
        <Sidebar />
      </el-aside>
      <el-main :style="{ height: curSongInfo ? 'calc(100% - 50px)' : '' }">
        <RouterView v-slot="{ Component }">
          <!-- <KeepAlive> -->
          <!-- <Suspense> -->
          <Component :is="Component" />
          <!-- </Suspense> -->
          <!-- </KeepAlive> -->
        </RouterView>
      </el-main>
    </el-container>
    <PlayBar />
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
    height: 66px;
    display: flex;
    align-items: center;
    background: #ec4141;
    color: rgba(255, 255, 255, 0.8);
    -webkit-app-region: drag;
  }
  .el-aside {
    width: 230px;
    background: #fafafa;
    overflow: hidden;
    border-right: 1px solid #e0e0e0;
  }
  .el-main {
    padding: 0px 10px;
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
