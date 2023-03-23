<script lang="ts" setup>
  import { Close } from '@element-plus/icons-vue';
  const loginOrwindow = () => {
    window.ElectronAPI.setLoginDialog(false);
  };
</script>
<template>
  <el-container>
    <el-header>
      <el-icon @click="loginOrwindow"><Close /></el-icon>
    </el-header>
    <el-main>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <Component :is="Component" class="login" />
        </KeepAlive>
      </RouterView>
    </el-main>
  </el-container>
</template>
<style lang="less" scoped>
  .el-container {
    width: 350px;
    height: 530px;
    flex-direction: column;
    -webkit-app-region: drag;
    .el-header {
      padding: 10px 11px 0 0;
      height: auto;
      text-align: end;
      .el-icon {
        -webkit-app-region: no-drag;
        cursor: pointer;
        font-size: 18px;
        color: #a5a5a5;
      }
    }
    .el-main {
      padding: 0;
    }
  }
</style>
