<script setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  // import { computed } from 'vue';
  // import useSongStore from '/@/store/modules/song';
  import { CloseBold, SemiSelect, FullScreen, Setting } from '@element-plus/icons-vue';
  import { ArrowLeft, ArrowRight, Microphone, RefreshLeft } from '@element-plus/icons-vue';
  import logo from '/@/assets/img/logo.jpg';
  import { useRouter } from 'vue-router';
  let Search = createAsyncComponent(() => import('/@/jingluo/Search.vue'));
  let router = useRouter();
  let state = computed(() => router.options.history.state);

  // const songStore = useSongStore();
  // const isLogin = computed(() => songStore.getIsLogin);
  // // 头像
  // const avatarUrl = computed(() => songStore.getAvatarUrl);
  // // 名称
  // const nickname = computed(() => songStore.getNickname);
  const loginOrwindow = type => {
    if (type === 'max') {
      window.ElectronAPI.setWindowMax();
    } else if (type === 'min') {
      window.ElectronAPI.setWindowMin();
    } else if (type === 'close') {
      window.ElectronAPI.setWindowClose();
    } else if (type === 'back') {
      state.value.back ? router.back() : null;
    } else if (type === 'forward') {
      state.value.forward ? router.go(1) : null;
    } else if (type === 'refresh') {
      router.go(0);
    } else {
      window.ElectronAPI.setLoginDialog(true);
    }
  };
</script>
<template>
  <router-link to="/" class="logo flex items-center"><img :src="logo" alt="log" /></router-link>
  <div class="flex items-center search">
    <el-tooltip effect="dark" content="后退" placement="top">
      <el-icon @click="loginOrwindow('back')"><ArrowLeft /></el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="前进" placement="top">
      <el-icon class="arrow-right" @click="loginOrwindow('forward')"><ArrowRight /></el-icon
    ></el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="top">
      <el-icon><RefreshLeft @click="loginOrwindow('refresh')" /></el-icon>
    </el-tooltip>
    <Search />
    <el-tooltip effect="dark" content="录音" placement="top">
      <el-icon style="color: #fff"><Microphone /></el-icon
    ></el-tooltip>
  </div>
  <div class="flex items-center absolute right-0">
    <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
    <el-dropdown>
      <span @click="loginOrwindow"> 未登录 </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>未开发</el-dropdown-item>
          <el-dropdown-item>未开发</el-dropdown-item>
          <el-dropdown-item>未开发</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-tooltip effect="dark" content="设置" placement="top">
      <el-icon><Setting /></el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="最小化" placement="top">
      <el-icon @click="loginOrwindow('min')"><SemiSelect /></el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="最大化" placement="top">
      <el-icon @click="loginOrwindow('max')"><FullScreen /></el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="退出" placement="top">
      <el-icon @click="loginOrwindow('close')"><CloseBold /></el-icon>
    </el-tooltip>
  </div>
</template>
<style lang="less" scoped>
  .logo img {
    width: 230px;
    height: 50px;
  }
  .search,
  .logo,
  .absolute {
    -webkit-app-region: no-drag;
  }

  .search .el-icon {
    border-radius: 50%;
    padding: 4px;
    background-color: #d93c3c;
    color: #e47373;
  }
  .el-icon {
    margin: 0 10px;
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  .arrow-right {
    margin-left: 0;
  }
  .el-avatar {
    margin-right: 10px;
  }
  .el-dropdown {
    cursor: pointer;
    color: #fff;
  }
</style>
