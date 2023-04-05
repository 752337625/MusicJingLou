<script lang="ts" setup>
  import useVersion from './version.js';
  let { nv, ov, dv, message, downloadUpdate, percentage, customColorMethod } = useVersion();
  defineExpose({ dv });
</script>
<template>
  <el-dialog
    v-model="dv"
    title="关于我们"
    :draggable="true"
    :align-center="true"
    :append-to-body="true"
    :modal="false"
    :center="false"
    class="version-custom-class"
    :close-on-click-modal="false"
    width="400px"
    :close-on-press-escape="false">
    <template #header> <img src="/images/icon.png" style="width: 32px; height: 32px" /> 鲸落云音乐 </template>
    <div class="leading-8">
      当前版本号：{{ ov }} &nbsp;&nbsp;<el-tag v-if="nv === ov">{{ message }}</el-tag>
    </div>
    <div class="leading-8">
      最新版本号：{{ nv }} &nbsp;&nbsp;<el-tag v-if="nv !== ov" type="danger">{{ message }}</el-tag>
    </div>
    <div v-if="nv !== ov" class="mt-5">
      <el-progress :percentage="percentage" :color="customColorMethod" text-inside :stroke-width="15" />
    </div>
    <div class="flex mt-5">
      优化项：
      <ul>
        <li class="leading-7">1.【优化】扫码登录优化</li>
        <li class="leading-7">2.【优化】游戏驱动优化</li>
        <li class="leading-7">3.【优化】修复已知bug</li>
      </ul>
    </div>
    <template #footer>
      <span>
        <el-button v-if="nv !== ov" color="#d93c3c" @click="downloadUpdate">{{ message }}</el-button>
        <el-button @click="dv = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
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
    .el-dialog__body {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
</style>
