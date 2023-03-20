import { reactive, toRefs, onMounted, computed, ref, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { getDetail, getSimiSong as simiSong, getSimiPlaylist as simiPlayList } from '/@/api/main';
import useSongStore from '/@/store/modules/song';
import { Info } from '/@/hook/song/song';
export default function useSong() {
  const {
    appContext: { config },
  } = getCurrentInstance() as ComponentInternalInstance;
  const songStore = useSongStore();
  const route = useRoute();
  const info: Info = reactive({
    songInfo: {
      id: '',
      license: '',
      vip: '',
      alia: [],
      name: '',
      singer: [],
      publishTime: '',
      album: {
        picUrl: '',
        id: '',
        name: '',
      },
    },
    sId: '0', // 歌曲的ID
    coverDesc: '',
    simiSong: [],
    playlists: [],
    mlogMv: [],
    commentType: 0, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
  });
  const cBox = ref<HTMLInputElement | null>(null);
  const isLogin = computed(() => songStore.getIsLogin);
  const isPlayed = computed(() => songStore.getIsPlayed);
  const playList = computed(() => songStore.getPlayList);
  const playIndex = computed(() => songStore.getPlayIndex);
  const curSongInfo = computed<any>(() => playList.value[playIndex.value]);
  const isCurSong = computed(() => isPlayed.value && curSongInfo.value && curSongInfo.value.id === info.sId);
  // 当前播放状态
  const playFontIcon = computed(() => (isCurSong.value ? 'icon-audio-pause' : 'icon-audio-play'));
  // 若是无版权获取vip歌曲 播放按钮置灰
  const songDisable = computed(() => (info.songInfo.license || info.songInfo.vip ? 'disable' : ''));

  // 获取歌曲详情
  const getSongDetail = async () => {
    const { privileges, code, songs } = await getDetail({
      ids: info.sId,
      timestamp: new Date().valueOf(),
    });
    if (code !== 200) return ElMessage.error('数据请求失败');
    // 是否有版权播放
    songs[0].license = !privileges[0].cp;
    info['songInfo'] = config.globalProperties.$utils.formatSongs(songs, privileges)[0];
    // 显示歌曲简介
    info['coverDesc'] = info['songInfo'].alia.join(' / ');
  };
  // 播放音乐
  const plyaing = params => {
    // 若当前唔歌曲 或者 当前播放歌曲不是本页显示的歌曲  立即播放当前页面歌曲
    if (!curSongInfo.value || curSongInfo.value.id !== params.id) {
      // 无版权及vip不可播放
      if (params.license) return ElMessage.error('由于版权保护，您所在的地区暂时无法使用。');
      if (params.vip) return ElMessage.error('付费歌曲，请在网易云音乐播放');
      songStore.setPlayAll({ list: [params] });
      songStore.setIsShowPlayListTips(true);
    } else {
      songStore.setPlayStatus(!isPlayed.value);
    }
  };

  // 获取相似音乐
  const getSimiSong = async () => {
    const { code, songs } = await simiSong({ id: info.sId });
    if (code !== 200) return ElMessage.error('数据请求失败');

    info['simiSong'] = songs.map(item => {
      return {
        id: String(item.id),
        name: item.name,
        mvId: item.mvid,
        singer: item.artists,
        album: item.album,
        alia: item.alias,
        duration: config.globalProperties.$utils.formatSongTime(item.duration),
        url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
        vip: item.fee === 1,
        license: item.license,
        publishTime: item.publishTime,
      };
    });
  };
  const playSimiIcon = computed(() => {
    return function (item) {
      return curSongInfo.value && String(item.id) === curSongInfo.value.id && isPlayed.value
        ? 'icon-audio-pause'
        : 'icon-audio-play';
    };
  });

  // 包含这首歌的歌单
  const getSimiPlayList = async () => {
    const { code, playlists } = await simiPlayList({ id: info.sId });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info['playlists'] = playlists;
  };

  const jumpComment = () => {
    cBox.value?.scrollIntoView(true);
  };
  const init = () => {
    if (info['sId']) {
      getSongDetail();
      getSimiSong();
      getSimiPlayList();
    }
  };
  const showAddList = () => {
    console.log(111);
  };
  onBeforeRouteUpdate(to => {
    info['sId'] = to.query.id;
    init();
  });

  onMounted(() => {
    info['sId'] = route.query.id;
    init();
  });

  return {
    ...toRefs(info),

    playSimiIcon,
    playFontIcon,
    songDisable,
    isCurSong,
    isLogin,
    cBox,
    plyaing,
    getSimiPlayList,
    jumpComment,
    showAddList,
  };
}
