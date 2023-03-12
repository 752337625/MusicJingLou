const useRankStore = defineStore({
  id: 'app-rank',
  state: () => {
    return {
      songList: [],
      isShowPlayListTips: false,
    };
  },

  actions: {
    setSongList(songList) {
      this.songList = songList;
    },
    setIsShowPlayListTips(flag) {
      this.isShowPlayListTips = flag;
    },
  },
});
export default useRankStore;
export { useRankStore };
