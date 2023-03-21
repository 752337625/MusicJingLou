import { getTopListDetail as topListDetail, getTopRankList } from '/@/api/main';
import { reactive, onMounted, toRefs, watchEffect, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useSongStore from '/@/store/modules/song';
import type { LocationQueryValue } from 'vue-router';

interface RankInfo {
  coverImgUrl?: string;
  name?: string;
  updateTime?: string;
  creator?: {
    avatarUrl: string;
    nickname: string;
  };
  createTime?: number | string;
  playCount?: number | string;
  subscribedCount?: number | string;
  commentCount?: number | string;
  description?: string;
  subscribed?: string;
}
interface Info {
  list: Array<any>;
  type: LocationQueryValue | LocationQueryValue[];
  rId: LocationQueryValue | LocationQueryValue[] | number;
  listTop: Array<any>;
  listFeature: Array<any>;
  listOther: Array<any>;
  rankInfo: RankInfo;
  songList: Array<any>;
  total: number;
  isLoading: boolean;
}
export default function useRank() {
  const {
    appContext: { config },
  } = getCurrentInstance() as ComponentInternalInstance;
  const route = useRoute();
  const router = useRouter();
  const songStore = useSongStore();
  const info: Info = reactive({
    list: [],
    type: 'Top',
    listTop: [],
    listFeature: [],
    listOther: [],
    rId: 0,
    rankInfo: {},
    songList: [],
    total: 0,
    isLoading: true,
  });

  const getTopListDetail = async () => {
    const { list, code } = await topListDetail();
    if (code !== 200) return ElMessage.error('数据请求失败');
    // 云音乐TOP榜
    info['listTop'] = list.filter(item => {
      return item.ToplistType;
    });
    // 云音乐特色榜
    info['listFeature'] = list.filter(item => {
      return !item.ToplistType && item.name.indexOf('云音乐') >= 0;
    });
    // 其他场景榜
    info['listOther'] = list.filter(item => {
      return !item.ToplistType && item.name.indexOf('云音乐') < 0;
    });

    info['list'] = info.type ? info['list' + info.type] : info.listTop;
    info['rId'] = info.rId ? info.rId : info.listTop[0].id;
  };

  const getListDetail = async () => {
    info['isLoading'] = true;
    const { code, playlist, privileges } = await getTopRankList({ id: info.rId, s: -1 });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info['rankInfo'] = playlist;
    info['songList'] = config.globalProperties.$utils.formatSongs(playlist.tracks, privileges);
    info['total'] = info.songList.length;
    info['isLoading'] = false;
  };

  const selectType = type => {
    info['type'] = type;
    info['list'] = info['list' + info.type];
    info['rId'] = info['list' + type][0].id;
    router.push({ path: 'rank', query: { type: info.type, rId: info.rId } });
  };

  const selectItem = item => {
    info.rId = item.id;
    router.push({ path: 'rank', query: { type: info.type, rId: info.rId } });
  };

  const playAllSongs = () => {
    songStore.setSongList(info.songList);
    songStore.setIsShowPlayListTips(true);
  };
  const subPlayList = () => {
    console.log(111);
  };
  onMounted(() => {
    info['type'] = route.query.type || info.type;
    info['rId'] = route.query.rId;
    getTopListDetail();
  });

  watchEffect(() => {
    if (info.rId) {
      getListDetail();
    }
  });

  return {
    ...toRefs(info),
    subPlayList,
    selectType,
    selectItem,
    playAllSongs,
  };
}
