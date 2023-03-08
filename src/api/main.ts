import { defHttp } from './http/axios';

enum Api {
  GetBannersList = '/banner?type=2',
  GetPlayList = '/top/playlist',
  GetHotList = '/playlist/hot',
}
export const getBannersList = () => {
  return defHttp.get({ url: Api.GetBannersList });
};
//歌单 ( 网友精选碟 )
export const getPlayList = params => {
  return defHttp.get({ url: Api.GetPlayList, params });
};
//热门歌单分类
export const getHotList = () => {
  return defHttp.get({ url: Api.GetHotList });
};
