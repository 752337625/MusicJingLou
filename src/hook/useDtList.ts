import { getDtList } from '/@/api/main';
import { onMounted, shallowReactive, toRefs } from 'vue';

interface DjList {
  id: string | number;
  picUrl: string;
  programCount: string | number;
  subCount: string | number;
  rcmdtext?: string;
  name?: string;
}
interface DjParams {
  limit: number;
}
interface DjInfo {
  dj_list: Array<DjList>;
  dj_params: DjParams;
  dj_count: number;
  dj_loading: boolean;
}
export default function useDtList() {
  const dj_info: DjInfo = shallowReactive({
    dj_list: [],
    dj_params: { limit: 8 },
    dj_count: 8,
    dj_loading: true,
  });
  const getHotDj = async params => {
    const { code, djRadios } = await getDtList(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    dj_info['dj_list'] = djRadios;
    dj_info['dj_loading'] = false;
  };

  onMounted(() => getHotDj(dj_info['dj_params']));
  return { ...toRefs(dj_info) };
}
