import { getMvList } from '/@/api/main';
import { onMounted, shallowReactive, toRefs } from 'vue';

type CODE = '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国';
// type NAME = '全部' | '官方版' | '原生' | '现场版' | '网易出品';

interface MvParams {
  limit: number;
  offset: number;
  area?: string | CODE;
  type?: string | 'hot' | 'new';
  year?: string | number;
  month?: string | number;
}
export interface MvList {
  id: string | number;
  cover: string;
  imgurl: string;
  name: string;
  artistId: string;
  artistName: string;
  playCount: string;
  publishTime?: string;
}
interface MvInfo {
  mv_area: Array<CODE>;
  mv_list: Array<MvList>;
  mv_index: number;
  mv_params: MvParams;
  mv_count: number;
  mv_loading: Boolean;
}

export default function useMvList() {
  const mv_info: MvInfo = shallowReactive({
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

  onMounted(() => getMv(mv_info['mv_params']));

  return {
    ...toRefs(mv_info),
    chooseMvType,
  };
}
