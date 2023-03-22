<script lang="ts" setup>
  import { onMounted, provide } from 'vue';
  import {
    getQrKey as qrKey,
    getQrCreate as qrCreate,
    getQrCheck as qrCheck,
    getLoginStatus as _loginStatus,
  } from '/@/api/login';
  import { Close } from '@element-plus/icons-vue';
  import qr from '/@/views/login/qr/img/qr.jpg';
  import qr800 from '/@/views/login/qr/img/qr800.jpg';
  import qr802 from '/@/views/login/qr/img/qr802.jpg';
  import type { Ref } from 'vue';
  import { createLocalStorage } from '/@/utils/cache';
  const ls = createLocalStorage();
  let key: Ref<string | null> = ref(null);
  let qrurl: Ref<string | null> = ref(qr);
  let freshen: Ref<any> = ref(null);

  const getQrCheck = () => {
    qrCheck({ key: key.value }).then(res => {
      let { code, message, cookie } = res;
      console.log(res);
      //800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
      if (code === 800) return (qrurl.value = qr800), clearInterval(freshen.value);
      if (code === 801) return;
      if (code === 802) return (qrurl.value = qr802);
      if (code === 803) return ElMessage.success(message), clearInterval(freshen.value), ls.set('cookie', cookie);
    });
  };
  const getQrCreate = unikey => {
    qrCreate({ key: unikey, qrimg: 'base64' }).then(res => {
      const {
        code,
        data: { qrimg },
      } = res;
      if (code !== 200) return ElMessage.error('数据请求失败');
      qrurl.value = qrimg;
      freshen.value = setInterval(() => getQrCheck(), 3000);
    });
  };

  const getQrKey = () => {
    clearInterval(freshen.value);
    qrKey().then(res => {
      const {
        code,
        data: { unikey },
      } = res;
      if (code !== 200) return ElMessage.error('数据请求失败');
      key.value = unikey;
      getQrCreate(unikey);
    });
  };

  // const _getLoginStatus = () => {
  //   loginStatus().then(res => {
  //     console.log(res);
  //   });
  // };
  //过期更新二维码
  const updataQrurl = () => {
    if (qrurl.value === qr800) getQrKey();
  };
  provide('qrCheck', {
    qrurl,
    updataQrurl,
  });
  onMounted(() => getQrKey());
</script>
<template>
  <el-container>
    <el-header>
      <el-tooltip effect="dark" content="退出" placement="top">
        <el-icon><Close /></el-icon> </el-tooltip
    ></el-header>
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
    .el-header {
      padding: 10px 11px 0 0;
      height: auto;
      text-align: end;
      .el-icon {
        font-size: 18px;
        color: #a5a5a5;
      }
    }
    .el-main {
      padding: 0;
    }
  }
</style>
