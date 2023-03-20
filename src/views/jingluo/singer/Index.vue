<script lang="ts" setup>
  import useSinger from '/@/hook/singer/useSinger';
  let { artist } = useSinger();
</script>
<template>
  <div v-if="artist" class="singer">
    <div class="singer-header">
      <div class="singer-avatar"> </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .singer-avatar {
    display: flex;
    height: 300px;
    position: relative;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
    overflow: hidden;

    span {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 5;
      background-position: center top;
      background-size: cover;
      background-attachment: fixed;
    }

    em {
      position: absolute;
      z-index: 9;
      display: block;
      width: 100%;
      height: 100%;
      filter: blur(20px);
      background-position: center top;
      background-size: cover;
      background-attachment: fixed;
    }
  }
</style>
