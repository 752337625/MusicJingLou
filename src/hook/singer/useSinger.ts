import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import type { LocationQueryValue } from 'vue-router';
import { getArtists as artists } from '/@/api/main';
import { ComponentInternalInstance } from 'vue';

interface HotSongs {
  id: string;
  name: string;
  mvId: string;
  singer: string;
  album: string;
  alia: string;
  vip: boolean;
  license: string;
  duration: string;
  url: string;
  publishTime: string;
}
interface Info {
  sUid: LocationQueryValue | LocationQueryValue[];
  artist: null;
  hotSongs: Array<HotSongs>;
}

export default function useSinger() {
  const route = useRoute();
  const info: Info = reactive({
    sUid: null,
    artist: null,
    hotSongs: [],
  });
  const {
    appContext: { config },
  } = getCurrentInstance() as ComponentInternalInstance;
  const getArtists = async () => {
    const { artist, code, hotSongs } = await artists({ id: info.sUid, timestamp: new Date().valueOf() });
    if (code !== 200) return ElMessage.error('数据请求失败');
    info['artist'] = artist;
    info['hotSongs'] = hotSongs.map(item => {
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
  };
  onMounted(() => {
    info['sUid'] = route.query.id;
    getArtists();
  });
  return {
    ...toRefs(info),
  };
}
