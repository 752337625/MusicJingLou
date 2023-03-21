import { onMounted, reactive, toRefs } from 'vue';
import useSongStore from '/@/store/modules/song';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import type { LocationQueryValue } from 'vue-router';
import { getMvDetail as mvDetail, getMvUrl as mvUrl, getSimiMv as simiMv } from '/@/api/main';
interface Artists {
  name: string;
  id: string;
}
interface SimiMv {
  playCount: number;
  name: string;
  id: string;
  imgurl: string;
  cover: string;
  artistId: string;
  artistName: string;
  publishTime?: string;
}
interface Info {
  mId: LocationQueryValue | LocationQueryValue[];
  type: number;
  videoOptions: {
    poster: string;
    src: string;
  };
  mvDetail: {
    name?: string;
    publishTime?: string;
    playCount?: number;
    artists?: Array<Artists>;
    desc?: string;
  };
  simiMv: Array<SimiMv>;
}
export default function useMvPlay() {
  const route = useRoute();
  const songStore = useSongStore();
  const info: Info = reactive({
    mId: '0',
    mvDetail: {},
    type: 1, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
    videoOptions: {
      src: '', //视频源
      poster: '',
    },
    simiMv: [],
  });

  const getMvDetail = async () => {
    const { data, code } = await mvDetail({ id: info.mId });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.mvDetail = data;
    info.videoOptions.poster = data.cover;
  };

  const getMvUrl = async (r?) => {
    const { data, code } = await mvUrl({ id: info.mId, r });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.videoOptions.src = data.url;
  };

  const getSimiMv = async () => {
    const { mvs, code } = await simiMv({ id: info.mId });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.simiMv = mvs;
  };

  const init = () => {
    getMvDetail();
    getMvUrl();
    getSimiMv();
  };

  onBeforeRouteUpdate(to => {
    info['mId'] = to.query.id;
    init();
  });

  onMounted(() => {
    info['mId'] = route.query.id;
    init();
    songStore.setPlayStatus(false);
  });

  return {
    ...toRefs(info),
  };
}
