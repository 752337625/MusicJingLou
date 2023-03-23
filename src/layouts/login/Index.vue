<script lang="ts" setup>
  import { watch } from 'vue';
  import { Close } from '@element-plus/icons-vue';
  import { useRouter, useRoute } from 'vue-router';
  const route = useRoute();
  let showImg = ref(false);
  watch(
    () => route.path,
    n => (showImg.value = n !== '/login/qr'),
  );
  let router = useRouter();
  const loginOrwindow = () => {
    window.ElectronAPI.setLoginDialog(false);
  };
</script>
<template>
  <el-container>
    <el-header>
      <img v-if="showImg" src="./img/bg-qrCode.png" @click="router.push({ path: '/login/qr' })" />
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
    border: 1px solid;
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
      img {
        position: absolute;
        top: 0px;
        left: 0px;
        cursor: pointer;
        -webkit-app-region: no-drag;
      }
    }
    .el-main {
      padding: 0;
    }
  }
</style>
