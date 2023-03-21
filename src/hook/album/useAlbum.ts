import { onMounted, reactive, toRefs, ComponentInternalInstance, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getAlbum as album, getArtistAlbum as artistAlbum, getDynamic, getSub, getSubscribers } from '/@/api/main';
import useSongStore from '/@/store/modules/song';
import type { LocationQueryValue } from 'vue-router';

interface Dynamic {
  onSale?: boolean | number;
  albumGameInfo?: string;
  commentCount?: string;
  likedCount?: string;
  shareCount?: string;
  isSub?: boolean | number;
  subTime?: string;
  subCount?: string;
}
interface Details {
  artists: Array<{
    id: string;
    name: string;
  }>;
  description: string;
  picUrl: string;
  name: string;
  type: string;
  company: string;
  publishTime: string;
  size: number;
}
interface Info {
  albumId: LocationQueryValue | LocationQueryValue[];
  songList: Array<any>;
  hotAlbums: Array<any>;
  comments: Array<any>;
  type: number; // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
  isShowDesc: boolean;
  collects: Array<any>;
  details: Details;
  dynamic: Dynamic;
}
export default function useAlbum() {
  const songStore = useSongStore();
  const route = useRoute();
  const info: Info = reactive({
    albumId: '',
    details: {
      artists: [],
      description: '',
      picUrl: '',
      name: '',
      type: '',
      company: '',
      publishTime: '',
      size: 0,
    },
    songList: [],
    dynamic: {},
    hotAlbums: [],
    comments: [],
    type: 3, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
    isShowDesc: false,
    collects: [],
  });
  const {
    appContext: { config },
  } = getCurrentInstance() as ComponentInternalInstance;
  const artistsId = computed(() => info.details.artists[0].id);
  const getArtistAlbum = async () => {
    const { code, hotAlbums } = await artistAlbum({ id: info.details.artists[0].id, limit: 5 });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.hotAlbums = hotAlbums;
  };
  // 相关歌单推荐
  const getAlbum = async params => {
    const { code, songs } = await album(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    const privileges = songs.map(item => item.privilege);
    info.songList = config.globalProperties.$utils.formatSongs(songs, privileges);
    getArtistAlbum();
  };

  const getAlbumDynamic = async params => {
    const { onSale, albumGameInfo, commentCount, likedCount, shareCount, isSub, subTime, subCount, code } = await getDynamic(
      params,
    );
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.dynamic = {
      onSale,
      albumGameInfo,
      commentCount,
      likedCount,
      shareCount,
      isSub,
      subTime,
      subCount,
    };
  };
  // 专辑简介查看更多
  const showAllDesc = () => {
    if (info.details.description.length > 120) {
      info.isShowDesc = !info.isShowDesc;
    }
  };
  const playAllSongs = () => {
    songStore.setPlayAll({ list: [info.songList] });
    songStore.setIsShowPlayListTips(true);
  };
  const subAlbum = async () => {
    const { code } = await getSub({ id: info.albumId, t: Number(!info.dynamic.isSub) });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.dynamic.isSub = Number(!info.dynamic.isSub);
  };

  // 订阅该歌单的用户列表
  const getCollect = async params => {
    const { subscribers, code } = await getSubscribers(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.collects = subscribers;
  };

  const _initialize = () => {
    getAlbum({ id: info.albumId });
    getAlbumDynamic({ id: info.albumId });
    getCollect({ id: info.albumId });
  };

  onMounted(() => {
    info.albumId = route.query.id;
    _initialize();
  });

  // onBeforeRouteUpdate(to => {
  //   info.albumId = to.query.id;
  //   _initialize();
  // });

  return {
    ...toRefs(info),
    artistsId,
    showAllDesc,
    playAllSongs,
    subAlbum,
  };
}
