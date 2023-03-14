import { onMounted, shallowReactive, toRefs } from 'vue';
import { getBannersList } from '/@/api/main';
import { useRouter } from 'vue-router';

interface BannerInfo {
  banner_list: Array<any>;
  banner_loading: boolean;
}

export default function useBanners() {
  const router = useRouter();
  const banner_info: BannerInfo = shallowReactive({
    banner_list: [],
    banner_loading: true,
  });
  const getBanner = async () => {
    const { banners = [], code } = await getBannersList();
    if (code !== 200) return ElMessage.error('数据请求失败');
    banner_info['banner_list'] = banners;
    banner_info['banner_loading'] = false;
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
  return { ...toRefs(banner_info), pathHandler };
}
