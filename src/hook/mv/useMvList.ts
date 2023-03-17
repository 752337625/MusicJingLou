import { getMvList } from '/@/api/main';
import { onMounted, watch, reactive, toRefs } from 'vue';
type LABEL =
  | '全部'
  | '官方版'
  | '原生'
  | '现场版'
  | '网易出品'
  | '内地'
  | '港台'
  | '欧美'
  | '日本'
  | '韩国'
  | '上升最快'
  | '最新';

interface Params {
  area: string;
  type: string;
  order: string;
  limit: number;
  offset: number;
}
interface Info {
  type: Array<LABEL>;
  area: Array<LABEL>;
  order: Array<LABEL>;
  areaIndex: number | string;
  typeIndex: number | string;
  orderIndex: number | string;
  params: Params;
  list: Array<any>;
  mv_count: number;
  mv_loading: boolean;
  isLoading: boolean;
  isLoadMv: boolean;
}
export default function useMvList() {
  const info: Info = reactive({
    type: ['全部', '官方版', '原生', '现场版', '网易出品'],
    area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
    order: ['上升最快', '最新'],
    areaIndex: 0,
    typeIndex: 0,
    orderIndex: 0,
    params: {
      area: '',
      type: '',
      order: '',
      limit: 30,
      offset: 0,
    },
    list: [],
    mv_count: 20,
    mv_loading: true,
    isLoading: true,
    isLoadMv: true,
  });

  const getMv = async (params: Params) => {
    const { code, data, hasMore } = await getMvList(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.list = info.params.offset !== 0 ? [...info.list, ...data] : data;
    info.isLoadMv = !hasMore;
    info.isLoading = hasMore;
    info.mv_loading = false;
  };

  const selectType = (type: string, index: number) => {
    info[type + 'Index'] = index;
    info.list = [];
    info.params.offset = 0;
    info.params[type] = info[type][index];
    info.mv_loading = true;
  };

  const loadMv = () => {
    info.isLoadMv = true;
    info.params.offset = info.list.length;
  };

  onMounted(() => {
    info.params.area = info.area[info.areaIndex];
    info.params.type = info.type[info.typeIndex];
    info.params.order = info.order[info.orderIndex];
  });
  watch(info.params, () => getMv(info.params));
  return {
    ...toRefs(info),
    selectType,
    loadMv,
  };
}
