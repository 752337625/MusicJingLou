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

      <!-- <div class="info">
          <div v-if="item.name" class="artist-name">{{ item.name }}</div>
        </div> -->

      <!-- <el-carousel
        class="artist"
        height="340px"
        :interval="8000"
        arrow="never"
        indicator-position="outside">
        <el-carousel-item v-for="(list, index) in songList" :key="index" class="box">
          <router-link
            v-for="item in list"
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
            <div class="info">
              <div v-if="item.name" class="artist-name">{{ item.name }}</div>
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel> -->
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
    }
  }
</style>
