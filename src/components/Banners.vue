<template>
  <div class="banner">
    <el-skeleton :loading="loading" animated :throttle="500">
      <template #template>
        <el-skeleton-item class="skeleton-img" variant="image" />
        <el-skeleton-item class="skeleton-img" variant="image" />
        <el-skeleton-item class="skeleton-img" variant="image" />
        <el-skeleton-item class="skeleton-img" variant="image" />
      </template>
      <template #default>
        <swiper
          :slides-per-view="4"
          :space-between="30"
          :modules="modules"
          :autoplay="{ delay: 3000 }"
          :pagination="{ clickable: true }"
          class="banner_wrap">
          <swiper-slide v-for="item of list" :key="item.imageUrl">
            <el-image :src="item.pic" :alt="item.typeTitle" class="banner_img" @click="pathHandler(item)">
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-placeholder"></i>
                </div>
              </template>
            </el-image>
          </swiper-slide>
        </swiper>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue';
  import { getBannersList } from '/@/api/main';
  import { Navigation, Pagination, Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { useRouter } from 'vue-router';
  import 'swiper/css';
  import 'swiper/css/pagination';
  let list = shallowRef([]);
  let loading = shallowRef(true);
  const router = useRouter();
  const modules = [Navigation, Pagination, Autoplay];
  const getBanner = async () => {
    let { banners = [], code } = await getBannersList();
    if (code !== 200) return ElMessage.error('数据请求失败');
    list.value = banners;
    loading.value = false;
  };

  const pathHandler = params => {
    switch (params.targetType) {
      case 1: // 单曲
        router.push({ path: '/music/song', query: { id: params.targetId } });
        break;
      case 10: // 专辑
        router.push({ path: '/music/album', query: { id: params.targetId } });
        break;
      case 1000: // 歌单
        router.push({ path: '/music/playlist', query: { id: params.targetId } });
        break;
      case 1004: // MV
        router.push({ path: '/mvlist/mv', query: { id: params.targetId } });
        break;
      case 3000: // 外链
        window.open(params.url, '_blank');
        break;
    }
  };
  onMounted(() => getBanner());
</script>

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
