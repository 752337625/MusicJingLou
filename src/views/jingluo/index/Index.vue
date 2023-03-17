<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useTopList from '/@/hook/useTopList';
  let Banners = createAsyncComponent(() => import('/@/views/jingluo/index/component/Banners.vue'));
  let HostList = createAsyncComponent(() => import('/@/views/jingluo/index/component/HostList.vue'));
  let MvList = createAsyncComponent(() => import('/@/views/jingluo/index/component/MvList.vue'));
  let DtList = createAsyncComponent(() => import('/@/views/jingluo/index/component/DtList.vue'));
  let AlbumList = createAsyncComponent(() => import('/@/views/jingluo/index/component/AlbumList.vue'));
  let SongList = createAsyncComponent(() => import('/@/views/jingluo/index/component/SongList.vue'));
  let TopList = createAsyncComponent(() => import('/@/components/TopList.vue'));
  const { top_list, top_song_list, top_num, top_loading, addSongList } = useTopList();
</script>
<template>
  <div class="home">
    <!-- 轮播 -->
    <Banners />
    <!-- 热门推荐 -->
    <HostList />
    <!-- 最新MV -->
    <MvList />
    <!-- 热门电台 -->
    <DtList />
    <!-- 新碟上架 -->
    <AlbumList />
    <div class="top_list">
      <TopList
        :topList="top_list"
        :songList="top_song_list"
        :topNum="top_num"
        :loading="top_loading"
        @add_song_list="addSongList" />
    </div>
    <!--热门歌手  -->
    <SongList />
  </div>
</template>

<style lang="less" scoped>
  .h_title {
    padding: 20px 0 10px;

    h3 {
      display: inline-block;
      padding-right: 50px;
      font-size: 28px;
      font-weight: 700;
    }

    span {
      display: inline-block;
      font-size: 16px;
      margin: 0 40px 0 0;
      color: @--color-text-main;
      cursor: pointer;

      &.active {
        position: relative;
        z-index: 1;
        font-weight: 600;
        color: @--color-text-main;

        &:after {
          position: absolute;
          content: '';
          left: 0;
          bottom: 1px;
          width: 100%;
          height: 6px;
          background: @--color-text-height;
          z-index: -1;
        }
      }
    }
  }

  .top_list {
    margin-bottom: 25px;
  }
</style>
