<template>
  <el-skeleton :loading="loading" animated :throttle="500" :count="num">
    <template #template>
      <div class="ske-item">
        <el-skeleton-item class="ske-img" variant="image" />
        <div class="ske-info">
          <el-skeleton-item variant="h3" class="ske-name" />
          <el-skeleton-item variant="h3" class="ske-rcmdtext" style="width: 50%" />
          <el-skeleton-item variant="text" class="ske-count" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="dj">
        <router-link v-for="item in djList" :key="item.id" :to="{ path: '/music/dj', query: { id: item.id } }" class="item">
          <div class="faceImg">
            <el-image :src="item.picUrl + '?param=120y120'" :lazy="true">
              <template #placeholder>
                <div class="image-slot"> <i class="iconfont icon-placeholder"></i> </div>
              </template>
            </el-image>
          </div>
          <div class="info">
            <div v-if="item.name" class="dj-name"><i class="iconfont icon-dj"></i>{{ item.name }}</div>
            <div v-if="item.rcmdtext" class="dj-rcmdtext">{{ item.rcmdtext }}</div>
            <div class="dj-count"
              ><span>共{{ $utils.formartNum(item.programCount) }}期</span>
              <span>订阅{{ $utils.formartNum(item.subCount) }}次</span></div
            >
          </div>
        </router-link>
      </div>
    </template>
  </el-skeleton>
</template>
<script>
  export default {
    props: {
      djList: Array,
      num: Number,
      loading: Boolean,
    },
  };
</script>
<style lang="less" scoped>
  .dj {
    display: block;
    flex-wrap: wrap;
    font-size: 0;
    margin-right: -20px;

    .item {
      display: inline-flex;
      width: 50%;
      margin-bottom: 20px;
    }

    .faceImg {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      overflow: hidden;
    }

    .info {
      flex: 1;
      padding: 5px 0;
      margin: 0 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }

    .dj-name,
    .icon-dj {
      padding-right: 10px;
      font-size: 18px;
      font-weight: bold;
      color: @--color-text-main;
    }

    .dj-rcmdtext {
      font-size: 14px;
      color: @--color-text;
    }

    .dj-count {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #999;
    }
  }

  .el-skeleton {
    width: auto;
    display: block;
    flex-wrap: wrap;
    font-size: 0;

    .ske-item {
      display: inline-flex;
      width: 50%;
      margin-bottom: 20px;
    }

    .ske-img {
      width: 120px;
      height: 120px;
      border-radius: 4px;
      overflow: hidden;
    }

    .ske-info {
      flex: 1;
      padding: 10px 0;
      margin: 0 15px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }
  }
</style>
