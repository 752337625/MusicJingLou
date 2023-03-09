import { getPlayList, getHotList } from '/@/api/main';
import { onMounted, reactive, toRefs } from 'vue';

interface PlayListTags {
  name: String;
  id: String;
}
interface PlayListList {
  coverImgUrl: String;
  id: String;
  name: String;
  tags: Array<String>;
  playCount: String | Number;
  trackCount: String | Number;
}
interface PlayListParams {
  limit: Number;
  offset: Number;
  cat?: String;
  order?: String | 'new' | 'hot';
}
interface PlayListInfo {
  playlist_tags: Array<PlayListTags>;
  playlist_list: Array<PlayListList>;
  playlist_index: Number;
  playlist_params: PlayListParams;
  playlist_count: Number;
  playlist_loading: Boolean;
}

export default function getPlayOrHotList() {
  const playlist_info: PlayListInfo = reactive({
    playlist_tags: [],
    playlist_list: [],
    playlist_index: 0,
    playlist_params: { limit: 6, offset: 0 },
    playlist_count: 6,
    playlist_loading: true,
  });

  // 获取热门推荐歌单标签
  const getHotTags = async () => {
    const { code, tags } = await getHotList();
    if (code !== 200) return ElMessage.error('数据请求失败');
    tags.unshift({ name: '为您推荐' });
    playlist_info['playlist_tags'] = tags.splice(0, 6);
  };
  // 分类歌单列表
  const getPlayTags = async (params: PlayListParams) => {
    const { code, playlists } = await getPlayList(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    playlist_info['playlist_list'] = playlists;
    playlist_info['playlist_loading'] = false;
  };
  // 切换歌单类别
  const choosePlayListType = index => {
    playlist_info['playlist_index'] = index;
    playlist_info['playlist_params']['cat'] =
      index !== 0 ? playlist_info['playlist_tags'][index].name : '';
    playlist_info['playlist_loading'] = true;
    getPlayTags(playlist_info['playlist_params']);
  };

  onMounted(() => {
    getHotTags();
    getPlayTags(playlist_info['playlist_params']);
  });
  return {
    ...toRefs(playlist_info),
    getHotTags,
    choosePlayListType,
  };
}
