import { getEnvConfig } from '/@/utils/env';

const { VITE_DEFAULT_LYRICS_KEY } = getEnvConfig();
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

const useDesktopStore = defineStore({
  id: 'app-desktop',
  state: (): Info => {
    return {
      Lyrics: {
        lyric: null,
        lyricObj: [],
        curIndex: 0,
      },
    };
  },
  sync: {
    key: VITE_DEFAULT_LYRICS_KEY,
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
export default useDesktopStore;
export { useDesktopStore };
