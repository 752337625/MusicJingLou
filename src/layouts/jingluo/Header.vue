<script setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  // import useSongStore from '/@/store/modules/song';
  import { CloseBold, SemiSelect, FullScreen, Setting } from '@element-plus/icons-vue';
  import { ArrowLeft, ArrowRight, Microphone, RefreshLeft } from '@element-plus/icons-vue';
  import logo from '/@/assets/img/logo.jpg';
  import { useRouter } from 'vue-router';
  import useVersion from '/@/layouts/jingluo/hook/version';
  let Search = createAsyncComponent(() => import('/@/layouts/jingluo/Search.vue'));
  let router = useRouter();
  let state = computed(() => router.options.history.state);
  let { nv, vo, vd } = useVersion();
  // const songStore = useSongStore();
  // const isLogin = computed(() => songStore.getIsLogin);
  // // 头像
  // const avatarUrl = computed(() => songStore.getAvatarUrl);
  // // 名称
  // const nickname = computed(() => songStore.getNickname);
  const loginOrwindow = async type => {
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
    } else if (type === '1-1') {
    } else if (type === '1-2') {
    } else if (type === '1-3') {
      let version = window.__APP_INFO__.pkg.version;
      let v = await window.ElectronAPI.setCheckAppVersion();
      if (v === version) {
        vd.value = true;
        vo.value = version;
      } else {
        vd.value = true;
        vo.value = version;
        nv.value = v;
      }
    } else {
      window.ElectronAPI.setLoginDialog(true);
    }
  };
  // 检测更新
  window.ElectronAPI.setCheckForUpdate();
  // 获取更新信息
  window.ElectronAPI.setMessageVersion((event, message) => {
    console.log(message);
  });
  window.ElectronAPI.setDownloadProgress((event, value) => {
    console.log(value);
  });
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
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      text-color="#fff"
      active-text-color="#fff"
      background-color="rbga(0,0,0,0)"
      @select="loginOrwindow">
      <el-sub-menu index="1" popper-class="popper-header-class">
        <template #title>未登录</template>
        <el-menu-item index="1-1">未登录</el-menu-item>
        <el-menu-item index="1-2">未登录</el-menu-item>
        <el-menu-item index="1-3">关于我们</el-menu-item>
        <!-- <el-sub-menu index="1-4">
          <template #title>未登录</template>
          <el-menu-item index="1-4-1">未登录</el-menu-item>
          <el-menu-item index="1-4-2">未登录</el-menu-item>
          <el-menu-item index="1-4-3">未登录</el-menu-item>
        </el-sub-menu> -->
      </el-sub-menu>
    </el-menu>
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
  <el-dialog
    v-model="vd"
    title="关于我们"
    :draggable="true"
    :align-center="true"
    :append-to-body="true"
    :modal="false"
    :center="false"
    class="version-custom-class"
    :close-on-click-modal="false"
    width="350px"
    :close-on-press-escape="false">
    <template #header> <img src="/images/icon.png" style="width: 32px; height: 32px" /> 鲸落云音乐 </template>
    <div class="leading-8"> 版本号：{{ vo }} &nbsp;&nbsp;<el-tag v-if="!nv">未检测到更新</el-tag> </div>
    <div v-if="nv" class="leading-8"> 最新号：{{ nv }} &nbsp;&nbsp;<el-tag type="danger">更新</el-tag> </div>
    <div class="flex mt-5">
      优化项：
      <ul>
        <li class="leading-7">1.【优化】扫码登录优化</li>
        <li class="leading-7">2.【优化】游戏驱动优化</li>
        <li class="leading-7">3.【优化】修复已知bug</li>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button color="#d93c3c" @click="versionDialog = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="less" scoped>
  .logo img {
    width: 230px;
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
  // .el-avatar {
  //   margin-right: 10px;
  // }
  .el-menu--horizontal {
    border: 0;
    > .el-sub-menu {
      :deep(.el-sub-menu__title) {
        border: 0 !important;
        border-color: transparent !important;
        &:hover {
          background-color: transparent;
        }
      }
    }
  }
  :deep(.popper-header-class) {
    .el-menu-item {
      color: rgba(255, 255, 255, 1);
    }
  }
</style>
<style lang="less">
  .version-custom-class {
    .el-dialog__header {
      padding: 8px;
      color: #fff;
      background-color: #ec4141;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 17px;
      margin: 0;
      img {
        margin-right: 8px;
      }
      .el-dialog__headerbtn {
        top: 0px;
        .el-dialog__close {
          color: #fff;
        }
      }
    }
  }

  .popper-header-class {
    .el-menu-item {
      color: #2d2d2d !important;
      &:hover {
        background-color: #f2f2f2 !important;
      }
    }
    .el-sub-menu__title {
      color: #2d2d2d !important;
    }
  }
</style>
