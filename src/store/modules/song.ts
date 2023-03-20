import utils from '/@/utils/util';
// 合并歌曲到播放列表查重
const concatPlayList = (list, playList = []) => {
  // filter过滤无版权及vip歌曲
  return utils.concatPlayList(
    list.filter(item => {
      return !item.license && !item.vip;
    }),
    playList,
  );
};
// 当前歌曲在播放列表的索引
const findIndex = (list, playList) => {
  return playList.findIndex(d => {
    return d.id === list.id;
  });
};

interface UserInfo {
  avatarUrl: string;
  nickname: string;
  userId: string;
}
interface SongStore {
  songList: Array<any>;
  loginDialogVisible: boolean; // 登录弹窗显示与隐藏
  isShowPlayListTips: boolean;
  playList: Array<any>;
  isPlayed: boolean;
  playIndex: number;
  isLogin: boolean;
  userInfo: UserInfo;
}
const useSongStore = defineStore({
  id: 'app-song',
  state: (): SongStore => {
    return {
      songList: [],
      loginDialogVisible: false, // 登录弹窗显示与隐藏
      isShowPlayListTips: false,
      playList: [],
      isPlayed: false,
      playIndex: 0,
      isLogin: false,
      userInfo: {
        avatarUrl: '',
        nickname: '',
        userId: '',
      },
    };
  },
  getters: {
    getLoginDialogVisible: state => {
      return state.loginDialogVisible;
    },
    getAvatarUrl: state => {
      return state.userInfo.avatarUrl ?? '暂无数据';
    },
    getNickname: state => {
      return state.userInfo.nickname ?? '暂无数据';
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
      window.localStorage.setItem('playList', JSON.stringify(val));
    },
    setPalyIndex(num) {
      this.playIndex = num;
      window.localStorage.setItem('playIndex', num);
    },
    setIsShowPlayListTips(flag) {
      this.isShowPlayListTips = flag;
    },
    //设置当前系统设置国际化
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setAvatarUrl(avatarUrl) {
      this.userInfo.avatarUrl = avatarUrl;
    },
    setNickname(nickname) {
      this.userInfo.nickname = nickname;
    },
  },
});
export default useSongStore;
export { useSongStore };
