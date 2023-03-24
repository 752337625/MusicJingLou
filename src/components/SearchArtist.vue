<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  const ArtistItem = createAsyncComponent(() => import('/@/components/ArtistItem.vue'));
  const Loading = createAsyncComponent(() => import('/@/components/IconLoading.vue'));
  defineProps<{
    list: {
      // 歌手信息
      type: Array<any>;
      required: true;
    };
    loading: {
      type: Boolean;
      default: false;
    };
  }>();
</script>

<template>
  <div class="list-container">
    <template v-for="item in list" :key="item">
      <ArtistItem :item="item" />
    </template>
    <template v-if="loading">
      <Loading />
    </template>
  </div>
</template>
<style lang="less" scoped>
  .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 40px;
    margin-right: -40px;

    &::after {
      content: '';
      width: 30%;
    }
  }
</style>
