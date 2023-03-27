<script lang="ts" setup>
  import { computed } from 'vue';
  import useDesktopStore from '/@/store/modules/desktop';
  const lyricsStore = useDesktopStore();
  const lyricObj = computed(() => lyricsStore.getLyricObj);
  const curIndex = computed(() => lyricsStore.getCurIndex);
  const current_lyric = computed(() => lyricObj.value[curIndex.value]);
</script>
<template>
  <div id="desktop" class="desktop-lyric">
    <div id="lrc" class="playing-lyric"> {{ current_lyric?.txt ?? '听见好时光' }} </div>
  </div>
</template>

<style lang="less" scoped>
  .desktop-lyric {
    text-align: center;
    -webkit-app-region: drag;
    .playing-lyric {
      // width: max-content;
      height: 120px;
      font-size: 40px;
      color: #fff;
      text-shadow: 1px 1px 5px #c62f2f, 1px -1px 3px #c62f2f;
      text-align: center;
      font-family: 'Microsoft JhengHei', '明黑', Arial, Helvetica;
      // text-indent: 2px;
      // white-space: wrap;
      // overflow-x: auto;
      display: flex;
      align-items: center;
      justify-content: center;

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
