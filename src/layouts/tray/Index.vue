<script setup lang="ts">
  import { VideoPause, User, Notification, Minus, SwitchButton, CaretLeft, CaretRight, Setting } from '@element-plus/icons-vue';
  //  VideoPlay,
  // 播放模式
  // const modeIcon = computed(() => {
  //   const params = [
  //     {
  //       className: 'icon-loop',
  //       title: '循环模式',
  //     },
  //     {
  //       className: 'icon-single-cycle',
  //       title: '单曲循环',
  //     },
  //     {
  //       className: 'icon-shuffle',
  //       title: '随机播放',
  //     },
  //   ];
  // return params[info.playMode];
  // });
  const clickHandle = TYPE => {
    switch (TYPE) {
      case 'exit':
        window.ElectronAPI.setTryWindowClose();
        break;
      case 'prev':
        window.ElectronAPI.setTrayPlaySongStates(TYPE);
        break;
      case 'next':
        window.ElectronAPI.setTrayPlaySongStates(TYPE);
        break;
    }
  };
</script>
<template>
  <el-container class="jingluo">
    <ul>
      <li>
        <el-icon><User /></el-icon>未登录
      </li>
      <li>
        <!-- VideoPlay --><el-icon><VideoPause /></el-icon>播放
      </li>
      <li @click="clickHandle('prev')">
        <el-icon><CaretLeft /></el-icon>上一首
      </li>
      <li @click="clickHandle('next')">
        <el-icon><CaretRight /></el-icon>下一首
      </li>
      <li>
        <!--  <i class="iconfont" :class="modeIcon" :title="modeIcon.title" @click.stop="changePlayMode"></i> -->
        <el-icon><Minus /></el-icon>最小化
      </li>
      <li>
        <el-icon><Notification /></el-icon>打开桌面歌词
      </li>
      <li>
        <el-icon><Setting /></el-icon>设置
      </li>
      <li @click="clickHandle('exit')">
        <el-icon><SwitchButton /></el-icon>退出
      </li>
    </ul>
  </el-container>
</template>
<style lang="less" scoped>
  .jingluo {
    width: 100%;
    height: 100%;
    ul {
      width: 190px;
      height: 290px;
      box-shadow: var(--el-box-shadow);
      background: #fff;
      border-radius: 5px;
      margin: 0 auto;
      margin-top: 10px;
      font-size: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      li {
        cursor: pointer;
        padding-left: 10px;
        width: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        color: #010101;
        .el-icon {
          margin-right: 10px;
          font-size: 19px;
          color: #525252;
        }
        &:hover {
          border-radius: 5px;
          background-color: #f2f2f2;
        }
        &:nth-child(5) {
          border-top: 1px solid var(--el-border-color);
        }
        &:nth-child(7) {
          border-top: 1px solid var(--el-border-color);
        }
        &:last-child {
          border-top: 1px solid var(--el-border-color);
        }
      }
    }
  }
</style>
