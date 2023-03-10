<script setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import usePlayOrHotList from '/@/hook/usePlayOrHotList';
  import useTopAlbum from '/@/hook/useTopAlbum';
  import useMvList from '/@/hook/useMvList';
  import useDtList from '/@/hook/useDtList';
  import useSongList from '/@/hook/useSongList';
  import useTopList from '/@/hook/useTopList';
  let Banners = createAsyncComponent(() => import('/@/components/Banners.vue'));
  let PlayList = createAsyncComponent(() => import('/@/components/PlayList.vue'));
  let AlbumList = createAsyncComponent(() => import('/@/components/AlbumList.vue'));
  let MvList = createAsyncComponent(() => import('/@/components/MvList.vue'));
  let HotDtList = createAsyncComponent(() => import('/@/components/HotDtList.vue'));
  let HotSongList = createAsyncComponent(() => import('/@/components/HotSongList.vue'));
  let TopList = createAsyncComponent(() => import('/@/components/TopList.vue'));
  const {
    playlist_tags,
    playlist_list,
    playlist_count,
    playlist_loading,
    playlist_index,
    choosePlayListType,
  } = usePlayOrHotList();
  const { album_area, album_index, album_list, album_count, album_loading, chooseAlbumType } =
    useTopAlbum();
  const { mv_area, mv_list, mv_index, mv_count, mv_loading, chooseMvType } = useMvList();
  const { dj_list, dj_loading, dj_count } = useDtList();
  const { song_list, song_loading, song_count } = useSongList();
  const { top_list, top_song_list, top_num, top_loading, addSongList } = useTopList();
</script>
<template>
  <div class="home">
    <Banners />
    <div class="hot-list">
      <div class="h_title">
        <h3>热门推荐</h3>
        <span
          v-for="(item, index) in playlist_tags"
          :key="item.id"
          :class="index == playlist_index ? 'active' : ''"
          @click="choosePlayListType(index)"
          >{{ item.name }}</span
        >
      </div>
      <div class="wrapper">
        <PlayList :playList="playlist_list" :loading="playlist_loading" :num="playlist_count" />
      </div>
    </div>
    <div class="mv_list">
      <div class="h_title">
        <h3>最新MV</h3>
        <span
          v-for="(item, index) in mv_area"
          :key="item.id"
          :class="index == mv_index ? 'active' : ''"
          @click="chooseMvType(index)"
          >{{ item }}</span
        >
      </div>
      <div class="wrapper">
        <MvList :mvList="mv_list" :loading="mv_loading" :num="mv_count" />
      </div>
    </div>
    <div class="album_list">
      <div class="h_title">
        <h3>新碟上架</h3>
        <span
          v-for="(item, index) in album_area"
          :key="item.id"
          :class="index == album_index ? 'active' : ''"
          @click="chooseAlbumType(index)"
          >{{ item.name }}</span
        >
      </div>
      <div class="wrapper">
        <AlbumList :albumList="album_list" :loading="album_loading" :num="album_count" />
      </div>
    </div>

    <div class="top_list">
      <TopList
        :topList="top_list"
        :songList="top_song_list"
        :topNum="top_num"
        :loading="top_loading"
        @add_song_list="addSongList" />
    </div>

    <div class="dj-artist">
      <div class="dj-list">
        <div class="h_title">
          <h3>热门电台</h3>
        </div>
        <HotDtList :djList="dj_list" :loading="dj_loading" :num="dj_count" />
      </div>
    </div>
    <div class="artist-list">
      <div class="h_title">
        <h3>热门歌手</h3>
      </div>
      <HotSongList :songList="song_list" :loading="song_loading" :num="song_count" />
    </div>
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

  .hot-list,
  .album_list,
  .mv_list,
  .dj-list,
  .artist-list {
    padding: 0 20px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }

  .top_list {
    margin-bottom: 25px;
  }
  .dj-artist {
    display: flex;
  }
  .dj-list {
    flex: 1;
  }
  .artist-list {
    flex: 1;
  }
</style>
