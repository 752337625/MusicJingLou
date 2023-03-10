import { getMvList } from '/@/api/main';
import { onMounted, reactive, toRefs } from 'vue';
type CODE = '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国';
// type NAME = '全部' | '官方版' | '原生' | '现场版' | '网易出品';

interface mvParams {
  limit: Number;
  offset: Number;
  area?: String | CODE;
  type?: String | 'hot' | 'new';
  year?: String | Number;
  month?: String | Number;
}
interface mvInfo {
  mv_area: Array<CODE>;
  mv_list: Array<any>;
  mv_index: Number;
  mv_params: mvParams;
  mv_count: Number;
  mv_loading: Boolean;
}

export default function useMvList() {
  const mv_info: mvInfo = reactive({
    mv_area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
    mv_list: [],
    mv_index: 0,
    mv_params: { area: '', type: '', order: '', limit: 12, offset: 0 },
    mv_count: 12,
    mv_loading: true,
  });
  const getMv = async params => {
    const { code, data } = await getMvList(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    mv_info['mv_list'] = data;
    mv_info['mv_loading'] = false;
  };

  // 切换MV类别
  const chooseMvType = index => {
    mv_info['mv_index'] = index;
    mv_info['mv_params']['area'] = index !== 0 ? mv_info['mv_area'][index] : '';
    mv_info['mv_loading'] = true;
    getMv(mv_info['mv_params']);
  };

  onMounted(() => {
    getMv(mv_info['mv_params']);
  });

  return {
    ...toRefs(mv_info),
    chooseMvType,
  };
}
