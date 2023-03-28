<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useHotList from '/@/hook/useHotList';
  let PlayList = createAsyncComponent(() => import('/@/components/PlayList.vue'));
  const { playlist_tags, playlist_list, playlist_count, playlist_loading, playlist_index, choosePlayListType } = useHotList();
</script>
<template>
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
    <PlayList :playList="playlist_list" :loading="playlist_loading" :num="playlist_count" />
  </div>
</template>
<style lang="less" scoped>
  .hot-list {
    padding: 0 20px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
    height: 353px;
  }
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
</style>
