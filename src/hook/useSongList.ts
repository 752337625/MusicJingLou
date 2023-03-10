import { getSongList } from '/@/api/main';
import { onMounted, reactive, toRefs } from 'vue';
export default function useSongList() {
  const song_info = reactive({
    song_list: [],
    song_params: { limit: 36 },
    song_count: 36,
    song_loading: true,
  });

  const getHotSong = async params => {
    const { artists } = await getSongList(params);
    song_info['song_list'] = artists;
    song_info['song_loading'] = true;
  };

  onMounted(() => {
    getHotSong(song_info['song_params']);
  });
  return { ...toRefs(song_info) };
}
