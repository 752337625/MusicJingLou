<script setup>
  // import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  // import { computed } from 'vue';
  // import useSongStore from '/@/store/modules/song';
  import { CloseBold, SemiSelect, FullScreen, Setting } from '@element-plus/icons-vue';
  import logo from '/@/assets/img/logo.jpg';
  // let Search = createAsyncComponent(() => import('/@/layouts/jingluo/Search.vue'));
  // const songStore = useSongStore();
  // const isLogin = computed(() => songStore.getIsLogin);
  // // 头像
  // const avatarUrl = computed(() => songStore.getAvatarUrl);
  // // 名称
  // const nickname = computed(() => songStore.getNickname);
  const loginOrwindow = type => {
    if (type === 'max') {
      window.electronAPI.setWindowMax();
    } else if (type === 'min') {
      window.electronAPI.setWindowMin();
    } else if (type === 'close') {
      window.electronAPI.setWindowClose();
    } else {
      console.log(1);
      window.electronAPI.setLoginDialog(true);
    }
  };
  // const logout = () => {
  //   console.log(1);
  // };
</script>
<template>
  <router-link to="/" class="logo"><img :src="logo" alt="log" /></router-link>
  <div class="menu"> </div>
  <!-- <Search /> -->
  <div class="logined">
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
  </div>
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
</template>
<style lang="less" scoped>
  .logo {
    width: 230px;
    display: flex;
    justify-content: center;
  }
  .logined {
    display: flex;
    align-items: center;
    .el-avatar {
      margin-right: 10px;
    }
    .el-dropdown {
      cursor: pointer;
      color: #fff;
    }
  }
  .el-icon {
    margin: 0 10px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  .menu {
    flex: 1;
  }
</style>
