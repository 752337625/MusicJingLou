import { defHttp } from './http/axios';

enum Api {
  GetBannersList = '/banner?type=2',
  GetPlayList = '/top/playlist',
  GetHotList = '/playlist/hot',
  GetTopAlbumList = '/top/album',
  GetMvList = '/mv/all',
  GetDtList = '/dj/hot',
  GetSongList = '/top/artists',
  GetToplist = '/toplist',
  GetTopRankList = '/playlist/detail',
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
export const getMvList = params => {
  return defHttp.get({ url: Api.GetMvList, params });
};
export const getDtList = params => {
  return defHttp.get({ url: Api.GetDtList, params });
};
export const getSongList = params => {
  return defHttp.get({ url: Api.GetSongList, params });
};
export const getToplist = () => {
  return defHttp.get({ url: Api.GetToplist });
};
export const getTopRankList = params => {
  return defHttp.get({ url: Api.GetTopRankList, params });
};
