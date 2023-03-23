import { getSongList } from '/@/api/main';
import { onMounted, shallowReactive, toRefs } from 'vue';

interface SongList {
  id: string | number;
  picUrl: string;
}
interface SongParams {
  limit: number;
}
interface SongInfo {
  song_list: Array<SongList>;
  song_params: SongParams;
  song_count: number;
  song_loading: boolean;
}
export default function useSongList() {
  const song_info: SongInfo = shallowReactive({
    song_list: [],
    song_params: { limit: 100 },
    song_count: 100,
    song_loading: true,
  });

  const getHotSong = async params => {
    const { code, artists } = await getSongList(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    song_info['song_list'] = artists;
    song_info['song_loading'] = false;
  };

  onMounted(() => getHotSong(song_info['song_params']));
  return { ...toRefs(song_info) };
}
