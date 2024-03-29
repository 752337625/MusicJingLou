import utils from '/@/utils/util';
import { createLocalStorage } from '/@/utils/cache';
import { getEnvConfig } from '/@/utils/env';
const { VITE_DEFAULT_PLAYINDEX_KEY, VITE_DEFAULT_PLAYLIST_KEY } = getEnvConfig();
const ls = createLocalStorage();
// 合并歌曲到播放列表查重
const concatPlayList = (list, playList) => {
  // filter过滤无版权及vip歌曲
  return utils.concatPlayList(
    list.filter(item => {
      return !item.license && !item.vip;
    }),
    playList,
  );
};
// 当前歌曲在播放列表的索引
const findIndex = (list, playList: Array<any>) => {
  return playList.findIndex(d => {
    return d.id === list.id;
  });
};

interface UserInfo {
  avatarUrl?: string;
  nickname?: string;
  userId?: string;
}
interface SongStore {
  songList: Array<any>;
  loginDialogVisible: boolean; // 登录弹窗显示与隐藏
  isShowPlayListTips: boolean;
  playList: Array<any>;
  isPlayed: boolean;
  isDesktop: boolean;
  playIndex: number;
  isLogin: boolean;
  userInfo: UserInfo | null;
}
const useSongStore = defineStore({
  id: 'app-song',
  state: (): SongStore => {
    return {
      songList: [],
      loginDialogVisible: false, // 登录弹窗显示与隐藏
      isLogin: false,
      isDesktop: false,
      userInfo: null,
      isShowPlayListTips: false,
      isPlayed: false, //是否正在播放
      playList: ls.get(VITE_DEFAULT_PLAYLIST_KEY)?.playList || [], //播放列表
      playIndex: ls.get(VITE_DEFAULT_PLAYINDEX_KEY)?.playIndex || 0, //播放列表中播放的第几个
    };
  },
  // @ts-ignore
  persist: [
    {
      paths: ['playList'],
      key: VITE_DEFAULT_PLAYLIST_KEY,
    },
    {
      paths: ['playIndex'],
      key: VITE_DEFAULT_PLAYINDEX_KEY,
    },
  ],
  getters: {
    getIsDesktop: state => {
      return state.isDesktop;
    },
    getLoginDialogVisible: state => {
      return state.loginDialogVisible;
    },
    getAvatarUrl: state => {
      return state.userInfo?.avatarUrl ?? '暂无数据';
    },
    getIsShowPlayListTips: state => {
      return state.isShowPlayListTips;
    },
    getNickname: state => {
      return state.userInfo?.nickname ?? '暂无数据';
    },
    getUserInfo: state => {
      return state?.userInfo ?? null;
    },
    getIsLogin: state => {
      return state.isLogin;
    },
    getPlayList: state => {
      return state.playList;
    },
    getIsPlayed: state => {
      return state.isPlayed;
    },
    getPlayIndex: state => {
      return state.playIndex;
    },
  },
  actions: {
    setIsDesktop(isDesktop) {
      this.isDesktop = isDesktop;
    },
    setLoginDialogVisible(flag) {
      this.loginDialogVisible = flag;
    },
    setSelectPlay({ list }) {
      const playList = concatPlayList(list, this.playList);
      this.setPlayStatus(true);
      this.setPalyIndex(findIndex(list[0], playList));
    },
    setPlayAll({ list }) {
      const playList = concatPlayList(list, this.playList);
      this.setPalyList(playList);
      this.setPlayStatus(true);
      this.setPalyIndex(0);
    },
    setAddList({ list }) {
      const playList = concatPlayList(list, this.playList);
      this.setPalyIndex(findIndex(list[0], playList));
      this.setIsShowPlayListTips(true);
    },
    setSongList(songList) {
      this.songList = songList;
    },
    setPlayStatus(flag) {
      this.isPlayed = flag;
    },
    setPalyList(val) {
      this.playList = val;
      // ls.set('playList', val);
    },
    setPalyIndex(num) {
      this.playIndex = num;
      // ls.set('playIndex', num);
    },
    setIsShowPlayListTips(flag) {
      this.isShowPlayListTips = flag;
    },
    //设置当前系统设置国际化
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setAvatarUrl(avatarUrl) {
      this.userInfo!.avatarUrl = avatarUrl;
    },
    setNickname(nickname) {
      this.userInfo!.nickname = nickname;
    },
  },
});
export default useSongStore;
export { useSongStore };
