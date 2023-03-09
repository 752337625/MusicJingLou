import { reactive, onMounted, toRefs } from 'vue';
import { getTopAlbumList } from '/@/api/main';

type CODE = 'ZH' | 'EA' | 'KR' | 'JP';
type NAME = '华语' | '欧美' | '韩国' | '日本';

interface AlbumArea {
  id: Number;
  code: CODE;
  name: NAME;
}
interface AlbumParams {
  limit: Number;
  offset: Number;
  area?: String | CODE;
  type?: String | 'hot' | 'new';
  year?: String | Number;
  month?: String | Number;
}
interface AlbumList {
  picUrl: String;
  id: String;
  name: String;
  type: Array<String>;
  artist: {
    name: String;
  };
}
interface AlbumInfo {
  album_area: Array<AlbumArea>;
  album_list: Array<AlbumList>;
  album_index: Number;
  album_params: AlbumParams;
  album_count: Number;
  album_loading: Boolean;
}

export default function getHotRecomList() {
  const album_info: AlbumInfo = reactive({
    album_area: [
      { id: 2, code: 'ZH', name: '华语' },
      { id: 3, code: 'EA', name: '欧美' },
      { id: 4, code: 'KR', name: '韩国' },
      { id: 5, code: 'JP', name: '日本' },
    ],
    album_list: [],
    album_index: 0,
    album_params: {
      offset: 0,
      limit: 12,
      area: 'ZH',
      type: 'hot',
    },
    album_count: 12,
    album_loading: true,
  });
  const getAlbumList = async (params: AlbumParams) => {
    const { code, monthData } = await getTopAlbumList(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    album_info['album_list'] = monthData.slice(0, album_info.album_count);
    album_info['album_loading'] = false;
  };
  const chooseAlbumType = index => {
    album_info['album_index'] = index;
    album_info['album_params']['area'] = index !== 0 ? album_info['album_area'][index].code : '';
    album_info['album_loading'] = true;
    getAlbumList(album_info['album_params']);
  };

  onMounted(() => {
    getAlbumList(album_info['album_params']);
  });

  return {
    ...toRefs(album_info),
    chooseAlbumType,
  };
}
