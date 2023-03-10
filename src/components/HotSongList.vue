<template>
  <el-skeleton :loading="loading" animated :throttle="500" :count="num">
    <template #template>
      <el-skeleton-item class="ske-img" variant="image" />
    </template>
    <template #default>
      <div class="artist">
        <router-link
          v-for="item in songList"
          :key="item.id"
          :to="{ path: '/artist', query: { id: item.id } }"
          class="item">
          <div class="faceImg">
            <el-image :src="item.picUrl + '?param=100y100'">
              <div slot="placeholder" class="image-slot">
                <i class="iconfont icon-placeholder"></i>
              </div>
            </el-image>
          </div>
        </router-link>
      </div>
    </template>
  </el-skeleton>
</template>
<script>
  export default {
    props: {
      songList: Array,
      num: Number,
      loading: Boolean,
    },
  };
</script>
<style lang="less" scoped>
  .artist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .item {
      width: 100px;
      height: 100px;
      margin-bottom: 5px;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.4s linear;
      &:hover {
        border-radius: 50%;
      }
    }
    .faceImg {
      width: 100%;
      height: 100%;
      transform: scale(1);
      transition: all 0.4s linear;
      &:hover {
        transform: scale(1.5);
        border-radius: 50%;
      }
    }
  }

  .el-skeleton {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-around;
    .ske-img {
      width: 100px;
      height: 100px;
      margin-bottom: 5px;
    }
  }
</style>
