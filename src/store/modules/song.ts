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
const useSongStore = defineStore({
  id: 'app-song',
  state: () => {
    return {
      isLogin: false,
      songList: [],
      isShowPlayListTips: false,
      playList: [],
      isPlayed: false,
      playIndex: 0,
    };
  },
  getters: {
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
  },
});
export default useSongStore;
export { useSongStore };
