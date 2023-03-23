<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  let Banners = createAsyncComponent(() => import('/@/views/jingluo/index/component/Banners.vue'));
  let HostList = createAsyncComponent(() => import('/@/views/jingluo/index/component/HostList.vue'));
  let MvList = createAsyncComponent(() => import('/@/views/jingluo/index/component/MvList.vue'));
  let DtList = createAsyncComponent(() => import('/@/views/jingluo/index/component/DtList.vue'));
  let AlbumList = createAsyncComponent(() => import('/@/views/jingluo/index/component/AlbumList.vue'));
  let SongList = createAsyncComponent(() => import('/@/views/jingluo/index/component/SongList.vue'));
  let TopList = createAsyncComponent(() => import('/@/views/jingluo/index/component/TopList.vue'));
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
    <!-- 分类 -->
    <TopList />
    <!--热门歌手  -->
    <SongList />
  </div>
</template>

<style lang="less" scoped></style>
