<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useMvList from '/@/hook/useMvList';
  let MvList = createAsyncComponent(() => import('/@/components/MvList.vue'));
  const { mv_area, mv_list, mv_index, mv_count, mv_loading, chooseMvType } = useMvList();
</script>
<template>
  <div class="mv_list">
    <div class="h_title">
      <h3>最新MV</h3>
      <span v-for="(item, index) in mv_area" :key="item" :class="index == mv_index ? 'active' : ''" @click="chooseMvType(index)">{{ item }}</span>
    </div>
    <div class="wrapper">
      <MvList :mvList="mv_list" :loading="mv_loading" :num="mv_count" />
    </div>
  </div>
</template>
<style lang="less">
  .mv_list {
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
