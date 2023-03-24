import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { getSearchSuggest as searchSuggest, getSearchCloudsearch } from '/@/api/search';
import { ComponentInternalInstance } from 'vue';
import type { LocationQueryValue } from 'vue-router';
type CODE = '单曲' | '歌手' | '专辑' | '歌单';
interface Info {
  keyVal: LocationQueryValue | LocationQueryValue[] | any;
  type: LocationQueryValue | LocationQueryValue[] | any;
  typeList: Array<any>;
  index: number;
  total: number;
  offset: number;
  limit: number;
  list: Array<any>;
  currentpage: number;
  loading: boolean;
  listType: {
    songs: CODE;
    artists: CODE;
    albums: CODE;
    playlists: CODE;
  };
  suggestInfo: Array<any>;
}
export default function useSearch() {
  const route = useRoute();
  const router = useRouter();
  const {
    appContext: { config },
  } = getCurrentInstance() as ComponentInternalInstance;
  const info: Info = reactive({
    keyVal: route.query.key,
    type: route.query.type || '1', //  搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    typeList: [
      { k: 1, v: '单曲', t: '首单曲' },
      { k: 10, v: '专辑', t: '张专辑' },
      { k: 100, v: '歌手', t: '个歌手' },
      { k: 1000, v: '歌单', t: '个歌单' },
      // {k: 1002, v: '用户', t: '个用户'},
      { k: 1004, v: 'MV', t: '个MV' },
      // {k: 1014, v: '视频', t: '个视频'},
      // {k: 1018, v: '综合', t: '个'}
    ],
    index: 0,
    total: 0,
    offset: 0,
    limit: 18,
    list: [],
    currentpage: 0,
    loading: false,
    listType: {
      songs: '单曲',
      artists: '歌手',
      albums: '专辑',
      playlists: '歌单',
    },
    suggestInfo: [],
  });
  // 搜索结果列表建议
  const getSerachSuggest = async () => {
    const { code, message, result } = await searchSuggest({ keywords: info.keyVal });
    info['loading'] = false;
    if (code !== 200) return ElMessage.error(message);
    if (!result.order || !result.order.length) return;
    info['suggestInfo'] = result.order.map(item => {
      return {
        label: item,
        info: result[item],
      };
    });
  };
  const remoteMethod = query => {
    info['keyVal'] = query;
    if (info['keyVal']) {
      info['loading'] = true;
      info['suggestInfo'] = [];
      getSerachSuggest();
    }
  };

  //搜索框，获取焦点时，请求热门搜索列表接口
  const handleFocus = () => {
    if (info['keyVal']) {
      info['loading'] = true;
      info['suggestInfo'] = [];
      getSerachSuggest();
    }
  };

  // 获取搜索结果
  const getSerachMatch = async () => {
    info['loading'] = true;
    const { code, result, message } = await getSearchCloudsearch({
      keywords: info.keyVal,
      type: info.type,
      limit: info.limit,
      offset: info.offset,
    });
    if (code !== 200) return ElMessage.error(message);
    if (info.type === '1') {
      info['list'] =
        result.songs &&
        result.songs.map(item => {
          return {
            id: String(item.id),
            name: item.name,
            mvId: item.mv,
            singer: item.ar,
            album: item.al,
            alia: item.alia,
            vip: item.fee === 1,
            license: item.license,
            duration: config.globalProperties.$utils.formatSongTime(item.dt),
            url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
            publishTime: config.globalProperties.$utils.formatMsgTime(item.publishTime),
          };
        });
      info.total = result.songCount || 0;
    } else if (info.type === '10') {
      info.list = result.albums || [];
      info.total = result.albumCount || 0;
    } else if (info.type === '100') {
      info.list = result.artists || [];
      info.total = result.artistCount || 0;
    } else if (info.type === '1000') {
      info.list = result.playlists || [];
      info.total = result.playlistCount || 0;
    } else if (info.type === '1004') {
      info.list = result.mvs || [];
      info.total = result.mvCount || 0;
    } else if (info.type === '1014') {
      info.list = result.videos || [];
      info.total = result.videoCount || 0;
    }
    info.loading = false;
  };
  const selectType = item => {
    info['type'] = item.k;
    info['total'] = 0;
    info['offset'] = 0;
    info['currentpage'] = 0;
    router.push({
      path: '/music/search',
      query: { key: info.keyVal, type: info.type },
    });
  };

  const currentChange = page => {
    info.offset = (page - 1) * info.limit;
    info.currentpage = page;
    getSerachMatch();
  };

  // 搜索建议列表，点击后跳转到相对应的落地页
  const jumpPage = (item, type) => {
    switch (type) {
      case 'songs':
        router.push({ path: '/music/song', query: { id: item.id } });
        break;
      case 'artists':
        router.push({ path: '/music/singer', query: { id: item.id } });
        break;
      case 'albums':
        router.push({ path: '/music/album', query: { id: item.id } });
        break;
      case 'playlists':
        router.push({ path: '/music/detail', query: { id: item.id } });
        break;
    }
  };

  const clearVal = () => {
    info['suggestInfo'] = [];
  };

  const enterHandler = () => {
    router.push({
      path: '/music/search',
      query: { key: info.keyVal, type: info.type },
    });
  };

  const init = () => {
    info['total'] = 0;
    info['list'] = [];
    getSerachMatch();
  };

  onMounted(() => {
    info['index'] = info.typeList.findIndex(item => item.k === +info['type']);
    console.log(info['index']);
    init();
  });

  onBeforeRouteUpdate(to => {
    info['keyVal'] = to.query.key;
    info['type'] = to.query.type || '1';
    info['index'] = info.typeList.findIndex(item => item.k === +info['type']);
    init();
  });

  return {
    ...toRefs(info),
    selectType,
    currentChange,
    remoteMethod,
    handleFocus,
    jumpPage,
    clearVal,
    enterHandler,
  };
}
