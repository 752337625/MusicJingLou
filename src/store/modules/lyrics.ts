interface Info {
  Lyrics: {
    lyric: boolean | null | string;
    lyricObj: Array<{
      t: number | string;
      txt: string;
    }>;
    curIndex: number;
  };
}

const useLyricsStore = defineStore({
  id: 'app-lyrics',
  state: (): Info => {
    return {
      Lyrics: {
        lyric: null,
        lyricObj: [],
        curIndex: 0,
      },
    };
  },
  getters: {
    getLyrics: state => {
      return state.Lyrics;
    },
    getlyric: state => {
      return state.Lyrics.lyric;
    },
    getLyricObj: state => {
      return state.Lyrics.lyricObj;
    },
    getCurIndex: state => {
      return state.Lyrics.curIndex;
    },
  },
  actions: {
    setLyric(lyric) {
      this.Lyrics.lyric = lyric;
    },
    setLyricObj(lyricObj) {
      this.Lyrics.lyricObj = lyricObj;
    },
    setCurIndex(curIndex) {
      this.Lyrics.curIndex = curIndex;
    },
  },
});
export default useLyricsStore;
export { useLyricsStore };
