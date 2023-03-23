<script setup>
  import { ArrowRight } from '@element-plus/icons-vue';
  import useQrLogin from '/@/hook/useQrLogin';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  let { qrurl, updataQrurl } = useQrLogin();
</script>
<template>
  <div class="qr">
    <h3>扫码登录</h3>
    <img :src="qrurl" @click="updataQrurl" />
    <p>使用<a href="https://music.163.com/#/download" target="_blank">网易云音乐APP</a>扫码登录</p>
    <p class="other" @click="router.push({ path: '/login/phone' })">
      选择其他登录模式<el-icon><ArrowRight /></el-icon>
    </p>
  </div>
</template>
<style lang="less" scoped>
  .qr {
    text-align: center;
    margin-top: 65px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    font-size: 24px;
    margin-bottom: 36px;
    -webkit-app-region: no-drag;
  }
  a {
    color: #0c73c2;
  }
  .other {
    margin-top: 95px;
    display: flex;
    align-items: center;
  }
  .el-icon {
    font-size: 15px;
  }
  p {
    cursor: pointer;
    -webkit-app-region: no-drag;
  }
  img {
    width: 180px;
    margin-bottom: 10px;
    -webkit-app-region: no-drag;
  }
</style>
