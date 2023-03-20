import { getToplist, getTopRankList } from '/@/api/main';
import { onMounted, shallowReactive, toRefs, getCurrentInstance } from 'vue';
import { ComponentInternalInstance } from 'vue';

export default function useTopList() {
  const top_info = shallowReactive({
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
    const { list } = await getToplist();
    top_info['top_list'] = list.splice(0, 4);
    top_info['top_list'].forEach(async item => {
      const { playlist, privileges } = await getTopRankList({
        ...top_info['song_params'],
        id: item.id,
      });
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
