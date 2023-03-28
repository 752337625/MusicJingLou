import { getCurrentInstance, reactive, ComponentInternalInstance, toRefs, computed, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import useSongStore from '/@/store/modules/song';
import type { LocationQueryValue } from 'vue-router';
import {
  getDetail as songDetail,
  getTopRankList as playlistdetail,
  getSubscribers,
  getRelatedPlaylist as playlistRelated,
  getCommentPlaylist as playlistComment,
} from '/@/api/main';

interface Details {
  description?: string;
  name?: string;
  coverImgUrl?: string;
  creator?: {
    avatarUrl: string;
    nickname: string;
  };
  createTime?: string;
  tags?: Array<any>;
  playCount?: number | string;
  subscribedCount?: number | string;
  commentCount?: number | string;
  subscribed?: string;
}
interface Info {
  id: LocationQueryValue | LocationQueryValue[];
  details: Details;
  isShowDesc: boolean;
  songList: Array<any>;
  collects: Array<any>;
  playlists: Array<any>;
  comments: Array<any>;
  total: number;
  isLoading: boolean;
}
export default function useDetail() {
  const route = useRoute();
  const songStore = useSongStore();
  const info: Info = reactive({
    id: '',
    details: { artists: [], description: '', picUrl: '', name: '', type: '', company: '', publishTime: '', size: 0 },
    isShowDesc: false,
    songList: [],
    collects: [],
    playlists: [],
    comments: [],
    total: 0,
    isLoading: true,
  });
  const {
    appContext: { config },
  } = getCurrentInstance() as ComponentInternalInstance;
  const isLogin = computed(() => songStore.getIsLogin);
  // 登录后根据ids获取所有歌曲列表
  const getAllSongs = async ids => {
    const sliceArr = [];
    const num = 500;
    let idsArr = [];
    // 数组过长 每500份一组
    for (let index = 0; index < ids.length; index += num) {
      const a = ids.slice(index, index + num);
      //@ts-ignore
      sliceArr.push(a);
    }
    for (let i = 0; i < sliceArr.length; i++) {
      //@ts-ignore
      const arrs = sliceArr[i].map(d => d.id);
      info['isLoading'] = true;
      const { songs, privileges, code } = await songDetail({ ids: arrs.join(','), timestamp: new Date().valueOf() + i });
      if (code !== 200) return ElMessage.error('数据请求失败');
      idsArr = idsArr.concat(config.globalProperties.$utils.formatSongs(songs, privileges));
    }
    info['songList'] = idsArr;
    info['total'] = idsArr.length;
    info['isLoading'] = false;
  };
  // 登录及未登录下获取歌单中歌曲的列表
  const getDetail = async params => {
    info['isLoading'] = true;
    const { playlist, privileges, code } = await playlistdetail(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    info['details'] = playlist;
    if (isLogin.value) {
      const ids = playlist.trackIds;
      getAllSongs(ids);
    } else {
      info['songList'] = config.globalProperties.$utils.formatSongs(playlist.tracks, privileges);
      info['total'] = info['songList'].length;
      info['isLoading'] = false;
    }
  };

  // 歌单简介查看更多
  const showAllDesc = () => {
    if (info.details.description.length > 120) {
      info.isShowDesc = !info.isShowDesc;
    }
  };

  // 未登录状态，点击登录按钮，显示登录框
  const loginDialog = () => {
    songStore.setLoginDialogVisible(true);
  };

  // 订阅该歌单的用户列表
  const getCollect = async params => {
    const { code, subscribers } = await getSubscribers(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.collects = subscribers;
  };

  // 相关歌单推荐
  const getRecom = async params => {
    const { code, playlists } = await playlistRelated(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.playlists = playlists;
  };

  // 歌单精彩评论
  const getComment = async params => {
    const { code, comments } = await playlistComment(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.comments = comments;
  };

  // 播放列表为当前歌单的全部歌曲
  const playAllSongs = () => {
    songStore.setPlayAll({ list: info.songList });
    songStore.setIsShowPlayListTips(true);
  };

  // 收藏、取消歌单
  const subPlayList = async item => {
    const { code } = await getSubscribers({ id: item.id, t: item.subscribed ? 2 : 1 });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.details.subscribed = !info.details.subscribed;
  };

  const _initialize = id => {
    // 歌单详情
    getDetail({ id: id, s: 8 });
    // 歌单收藏者
    getCollect({ id: id, limit: 8 });
    // 相关歌单推荐
    getRecom({ id: id });
    // // 歌单评论
    getComment({ id: id, limit: 9 });
  };

  onMounted(() => {
    info.id = route.query.id;
    _initialize(info.id);
  });

  onBeforeRouteUpdate(to => {
    info.songList = [];
    info.total = 0;
    info.id = to.query.id;
    _initialize(info.id);
  });

  return {
    ...toRefs(info),
    playAllSongs,
    subPlayList,
    isLogin,
    loginDialog,
    showAllDesc,
  };
}
