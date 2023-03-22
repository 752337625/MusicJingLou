<script setup>
  // import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import { computed } from 'vue';
  import useSongStore from '/@/store/modules/song';
  import { CloseBold, SemiSelect, FullScreen } from '@element-plus/icons-vue';
  import logo from '/@/assets/img/logo.jpg';
  // let Search = createAsyncComponent(() => import('/@/layouts/jingluo/Search.vue'));
  const songStore = useSongStore();
  const isLogin = computed(() => songStore.getIsLogin);
  // 头像
  const avatarUrl = computed(() => songStore.getAvatarUrl);
  // 名称
  const nickname = computed(() => songStore.getNickname);
  const loginDialog = () => {
    console.log(1);
  };
  const logout = () => {
    console.log(1);
  };
</script>
<template>
  <header v-drop class="header">
    <router-link to="/" class="logo"><img :src="logo" alt="log" /></router-link>
    <div class="menu"> </div>
    <!-- <Search /> -->
    <div :class="isLogin ? 'user-avatar' : 'login'">
      <div v-if="isLogin" class="logined">
        <el-image :src="avatarUrl" class="avatar">
          <template #placeholder>
            <div class="image-slot">
              <i class="iconfont icon-placeholder"></i>
            </div>
          </template>
        </el-image>
        <span class="nickname">{{ nickname }}</span>
        <span class="set"><i class="iconfont icon-set"></i></span>
        <span class="quit" @click="logout"><i class="iconfont icon-quit"></i></span>
      </div>
      <span v-else class="login-btn" @click="loginDialog">登录</span>
    </div>
    <el-tooltip effect="dark" content="最小化" placement="top">
      <el-icon><SemiSelect /></el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="最大化" placement="top">
      <el-icon><FullScreen /></el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="退出" placement="top">
      <el-icon><CloseBold /></el-icon>
    </el-tooltip>
  </header>
</template>
<style lang="less" scoped>
  .logo {
    width: 230px;
    display: flex;
    justify-content: center;
  }
  .el-icon {
    margin: 0 10px;
    cursor: pointer;
  }
  .login-btn,
  .el-icon {
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: #ec4141;
    // padding: 0 20px;
    box-shadow: 0 20px 27px rgba(0, 0, 0, 0.05);
    color: rgba(255, 255, 255, 0.8);
  }
  .menu {
    flex: 1;
  }

  .user-avatar {
    padding: 5px 0 5px 20px;
    text-align: center;

    .avatar {
      display: inline-block;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      overflow: hidden;
      cursor: pointer;
    }

    .logined {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        font-weight: 300;
        padding: 0 10px;
        cursor: pointer;
      }

      .iconfont {
        color: @--color-text-main;
        vertical-align: top;
      }
    }
  }
  .login {
    padding: 0 20px;
    text-align: center;

    .login-btn {
      font-size: 16px;
      cursor: pointer;
    }
  }
</style>
