<template>
  <div class="mv">
    <div class="mv-container">
      <div class="mv-main">
        <div
          v-infinite-scroll="loadMv"
          class="wrapper infinite-list"
          :infinite-scroll-disabled="isLoadMv"
          :infinite-scroll-distance="300">
          <MvList :mvList="list" :loading="mv_loading" :num="mv_count" />
          <template v-if="isLoading">
            <Loading />
          </template>
        </div>
      </div>
      <div class="aside-box">
        <el-affix :offset="140" style="width: 100%; height: 100%">
          <div class="aside-menu">
            <h3 class="aside-title">排序</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in order"
                :key="item"
                :class="index === orderIndex ? 'active' : ''"
                @click="selectType('order', index)"
                >{{ item }}</em
              >
            </div>
            <h3 class="aside-title">区域</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in area"
                :key="item"
                :class="index === areaIndex ? 'active' : ''"
                @click="selectType('area', index)"
                >{{ item }}</em
              >
            </div>
            <h3 class="aside-title">类型</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in type"
                :key="item"
                :class="index === typeIndex ? 'active' : ''"
                @click="selectType('type', index)"
                >{{ item }}</em
              >
            </div>
          </div>
        </el-affix>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useMvList from '/@/hook/mv/useMvList';
  let Loading = createAsyncComponent(() => import('/@/components/IconLoading.vue'));
  let MvList = createAsyncComponent(() => import('/@/components/MvList.vue'));
  const {
    isLoadMv,
    loadMv,
    order,
    orderIndex,
    typeIndex,
    mv_loading,
    mv_count,
    isLoading,
    list,
    area,
    selectType,
    type,
    areaIndex,
  } = useMvList();
</script>
<style lang="less" scoped>
  .mv-container {
    display: flex;
    padding-top: 40px;

    .mv-main {
      flex: 1;
      margin-top: -20px;
    }
  }

  .aside-menu {
    padding: 20px 20px 1px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
  .filter-main {
    margin: 5px 0 20px;

    em {
      position: relative;
      z-index: 1;
      display: inline-block;
      padding: 5px 0;
      margin-right: 15px;
      font-style: normal;
      cursor: pointer;

      &.active {
        &::after {
          position: absolute;
          content: '';
          left: 0;
          bottom: 5px;
          width: 100%;
          height: 6px;
          background: #ff641e;
          z-index: -1;
        }
      }
    }
  }
</style>
