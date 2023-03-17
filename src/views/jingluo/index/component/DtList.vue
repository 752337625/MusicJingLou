<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useDtList from '/@/hook/useDtList';
  let HotDtList = createAsyncComponent(() => import('/@/components/HotDtList.vue'));
  const { dj_list, dj_loading, dj_count } = useDtList();
</script>
<template>
  <div class="dj-list">
    <div class="h_title">
      <h3>热门电台</h3>
    </div>
    <HotDtList :djList="dj_list" :loading="dj_loading" :num="dj_count" />
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
  }
  .dj-list {
    padding: 0 20px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
</style>
