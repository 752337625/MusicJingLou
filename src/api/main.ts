import { defHttp } from './http/axios';

enum Api {
  GetBannersList = '/banner?type=2',
  GetPlayList = '/top/playlist',
  GetHotList = '/playlist/hot',
  GetTopAlbumList = '/top/album',
}
export const getBannersList = () => {
  return defHttp.get({ url: Api.GetBannersList });
};
export const getPlayList = params => {
  return defHttp.get({ url: Api.GetPlayList, params });
};
export const getHotList = () => {
  return defHttp.get({ url: Api.GetHotList });
};
export const getTopAlbumList = params => {
  return defHttp.get({ url: Api.GetTopAlbumList, params });
};
