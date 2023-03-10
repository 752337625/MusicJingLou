import { getDtList } from '/@/api/main';
import { onMounted, reactive, toRefs } from 'vue';

export default function useDtList() {
  const dj_info = reactive({
    dj_list: [],
    dj_params: { limit: 8 },
    dj_count: 8,
    dj_loading: true,
  });
  const getHotDj = async params => {
    const { djRadios } = await getDtList(params);
    dj_info['dj_list'] = djRadios;
    dj_info['dj_loading'] = false;
  };

  onMounted(() => {
    getHotDj(dj_info['dj_params']);
  });
  return { ...toRefs(dj_info) };
}
