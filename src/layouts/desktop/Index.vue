<script lang="ts" setup>
  let current_lyric = ref('听见好时光');
</script>
<template>
  <div id="desktop" class="desktop-lyric">
    <div id="lrc" class="playing-lyric">
      {{ current_lyric }}
    </div>
  </div>
</template>

<style lang="less" scoped>
  .desktop-lyric {
    .playing-lyric {
      width: max-content;
      height: 60px;
      line-height: 60px;
      margin: 10px;
      padding: 0 15px;
      font-size: 40px;
      color: #fff;
      text-shadow: 1px 1px 5px #c62f2f, 1px -1px 3px #c62f2f;
      text-align: center;
      font-family: 'Microsoft JhengHei', '明黑', Arial, Helvetica;
      text-indent: 2px;
      white-space: nowrap;
      overflow-x: auto;

      &:hover {
        cursor: grab;
        border-radius: 2px;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3), inset 0 0 8px 0 rgba(255, 255, 255, 0.5);
      }
    }
    .control-wrapper {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      .control-box {
        .icon {
          color: #fff;
          font-size: 18px;

          &:hover {
            cursor: pointer;
            text-shadow: 1px 1px 5px #c62f2f, 1px -1px 3px #c62f2f;
          }
        }
      }
    }
  }
</style>
