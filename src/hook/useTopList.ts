import { getToplist, getTopRankList } from '/@/api/main';
import { onMounted, shallowReactive, toRefs, getCurrentInstance } from 'vue';
import { ComponentInternalInstance } from 'vue';

interface TopList {
  name: string;
  id: string;
  updateFrequency: string;
  updateTime: string;
}
interface TopSongList {
  id: string;
  vip: string;
  license: string;
  album: {
    picUrl: string;
  };
  name: string;
  singer: Array<{
    name: string;
    id: string;
  }>;
}
interface TopInfo {
  top_list: Array<TopList>;
  top_song_list: Array<TopSongList>;
  song_params: { id: string; s: number };
  top_num: number;
  top_loading: boolean;
}

export default function useTopList() {
  const top_info: TopInfo = shallowReactive({
    top_list: [],
    top_song_list: [],
    song_params: { id: '', s: 8 },
    top_num: 6,
    top_loading: true,
  });
  const {
    appContext: { config },
  } = getCurrentInstance() as ComponentInternalInstance;
  const getHottop = async () => {
    const { list, code } = await getToplist();
    if (code !== 200) return ElMessage.error('数据请求失败');
    top_info['top_list'] = list.splice(0, 4);
    top_info['top_list'].forEach(async item => {
      const { playlist, privileges, code } = await getTopRankList({
        ...top_info['song_params'],
        id: item.id,
      });
      if (code !== 200) return ElMessage.error('数据请求失败');
      top_info['top_song_list'][item.id] = config.globalProperties.$utils.formatSongs(
        playlist.tracks.splice(0, top_info['top_num']),
        privileges.splice(0, top_info['top_num']),
      );
    });
    top_info['top_loading'] = false;
  };
  const addSongList = item => {
    console.log(item);
  };
  onMounted(() => {
    getHottop();
  });
  return { ...toRefs(top_info), addSongList };
}
