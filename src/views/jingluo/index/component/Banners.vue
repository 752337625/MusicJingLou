<script lang="ts" setup>
  import { Navigation, Pagination, Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import useBanners from '/@/hook/useBanners';
  const modules = [Navigation, Pagination, Autoplay];
  const { banner_list, banner_loading, pathHandler } = useBanners();
</script>
<template>
  <div class="banner">
    <el-skeleton :loading="banner_loading" animated :throttle="500">
      <template #template>
        <el-skeleton-item class="skeleton-img" variant="image" />
        <el-skeleton-item class="skeleton-img" variant="image" />
        <el-skeleton-item class="skeleton-img" variant="image" />
        <el-skeleton-item class="skeleton-img" variant="image" />
      </template>
      <template #default>
        <Swiper
          :slides-per-view="4"
          :space-between="30"
          :modules="modules"
          :autoplay="{ delay: 3000 }"
          :pagination="{ clickable: true }"
          class="banner_wrap">
          <SwiperSlide v-for="item of banner_list" :key="item.imageUrl">
            <el-image :src="item.pic" :alt="item.typeTitle" class="banner_img" @click="pathHandler(item)">
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-placeholder"></i>
                </div>
              </template>
            </el-image>
          </SwiperSlide>
        </Swiper>
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="less" scoped>
  .banner {
    padding: 0 20px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
  .el-skeleton {
    display: flex;
    justify-content: space-between;
    padding: 40px 0;

    .skeleton-img {
      flex: 1;
      height: 98px;
      margin-right: 30px;

      &:last-child {
        margin: 0;
      }
    }
  }
  .banner_wrap {
    padding: 40px 0;
    font-size: 0;
    height: 100%;
  }

  .swiper {
    .swiper-slide {
      border-radius: 12px;
      box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
      cursor: pointer;
      overflow: hidden;
    }
    :deep(.swiper-pagination-bullet-active) {
      width: 15px;
      border-radius: 4px;
      background: @--color-text-height;
    }
  }
</style>
