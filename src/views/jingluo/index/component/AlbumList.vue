<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useTopAlbum from '/@/hook/useTopAlbum';
  let AlbumList = createAsyncComponent(() => import('/@/components/AlbumList.vue'));
  const { album_area, album_index, album_list, album_count, album_loading, chooseAlbumType } = useTopAlbum();
</script>
<template>
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
  .dj-list {
    padding: 0 20px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
</style>
