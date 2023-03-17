<template>
  <div class="artist-list">
    <div class="h_title">
      <h3>热门歌手</h3>
    </div>
    <HotSongList :songList="song_list" :loading="song_loading" :num="song_count" />
  </div>
</template>
<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useSongList from '/@/hook/useSongList';
  let HotSongList = createAsyncComponent(() => import('/@/components/HotSongList.vue'));
  const { song_list, song_loading, song_count } = useSongList();
</script>
<style lang="less" scoped>
  .artist-list {
    padding: 0 20px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
  .h_title {
    padding: 20px 0 10px;

    h3 {
      display: inline-block;
      padding-right: 50px;
      font-size: 28px;
      font-weight: 700;
    }
  }
</style>
