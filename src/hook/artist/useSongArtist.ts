import { getArtistList } from '/@/api/main';
import { onMounted, watch, reactive, toRefs } from 'vue';
type LABEL = '全部' | '男歌手' | '女歌手' | '乐队' | '华语' | '欧美' | '日本' | '韩国' | '其他' | '热门' | '#';
interface Type {
  val: number;
  label: LABEL;
}
interface Area {
  label: LABEL;
  val: number;
}
interface Initial {
  label: LABEL;
  val: number | string;
}
interface Params {
  area: string;
  type: string;
  initial: string;
  limit: number;
  offset: number;
}
interface List {
  id: number | string;
  picUrl: string;
  name: string;
  followed: boolean;
  albumSize: number;
  musicSize: number;
  fansCount: number;
}
interface Info {
  type: Array<Type>;
  area: Array<Area>;
  initial: Array<Initial>;
  typeIndex: number | string;
  areaIndex: number | string;
  initialIndex: number | string;
  params: Params;
  list: Array<List>;
  isLoading: boolean;
  busy: boolean;
}

export default function useSongArtist() {
  const info: Info = reactive({
    type: [
      { label: '全部', val: -1 },
      { label: '男歌手', val: 1 },
      { label: '女歌手', val: 2 },
      { label: '乐队', val: 3 },
    ],
    area: [
      { label: '全部', val: -1 },
      { label: '华语', val: 7 },
      { label: '欧美', val: 96 },
      { label: '日本', val: 8 },
      { label: '韩国', val: 16 },
      { label: '其他', val: 0 },
    ],
    initial: [
      { label: '热门', val: -1 },
      { label: '#', val: 0 },
    ],
    typeIndex: 0,
    areaIndex: 0,
    initialIndex: 0,
    params: {
      area: '',
      type: '',
      initial: '',
      limit: 30,
      offset: 0,
    },
    list: [],
    isLoading: true,
    busy: true,
  });
  const renderInitial = () => {
    const alphabet: Array<Initial> = [];
    for (let i = 0; i < 26; i++) {
      alphabet.push({
        label: String.fromCharCode(65 + i) as LABEL,
        val: String.fromCharCode(97 + i) as string,
      });
    }
    info.initial = [info.initial[0], ...alphabet, info.initial[1]];
  };

  const selectType = (type: string, index: number) => {
    info[type + 'Index'] = index;
    info.list = [];
    info.params.offset = 0;
    info.params[type] = info[type][index].val;
  };

  const getArtist = async (params: Params) => {
    const { code, artists, more } = await getArtistList(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.list = info.params.offset !== 0 ? [...info.list, ...artists] : artists;
    info.busy = !more;
    info.isLoading = more;
  };

  const loadMore = () => {
    info.busy = true;
    info.params.offset = info.list.length;
  };

  onMounted(() => {
    info.params.area = info.area[info.areaIndex].val;
    info.params.type = info.type[info.typeIndex].val;
    info.params.initial = info.initial[info.initialIndex].val;
    renderInitial();
  });
  watch(info.params, () => getArtist(info.params));
  return {
    ...toRefs(info),
    selectType,
    getArtist,
    loadMore,
  };
}
