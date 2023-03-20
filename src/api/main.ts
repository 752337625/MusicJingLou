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
  GetArtistList = '/artist/list',
  GetCatList = '/playlist/catlist',
  GetTopListDetail = '/toplist/detail',
  GetArtistAlbum = '/artist/album',
  GetAlbum = '/album',
  GetDynamic = '/album/detail/dynamic',
  GetSub = '/album/sub',
  GetSubscribers = '/playlist/subscribers',
  GetDetail = '/song/detail',
  GetSimiSong = '/simi/song',
  GetSimiPlaylist = '/simi/playlist',
  GetLyric = '/lyric',
  GetArtists = '/artists',
}
export const getArtists = params => {
  return defHttp.get({ url: Api.GetArtists, params });
};
export const getLyric = params => {
  return defHttp.get({ url: Api.GetLyric, params });
};
export const getSimiPlaylist = params => {
  return defHttp.get({ url: Api.GetSimiPlaylist, params });
};
export const getSimiSong = params => {
  return defHttp.get({ url: Api.GetSimiSong, params });
};
export const getDetail = params => {
  return defHttp.get({ url: Api.GetDetail, params });
};
export const getSubscribers = params => {
  return defHttp.get({ url: Api.GetSubscribers, params });
};
export const getSub = params => {
  return defHttp.get({ url: Api.GetSub, params });
};
export const getDynamic = params => {
  return defHttp.get({ url: Api.GetDynamic, params });
};
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
export const getArtistList = params => {
  return defHttp.get({ url: Api.GetArtistList, params });
};
export const getCatList = () => {
  return defHttp.get({ url: Api.GetCatList });
};

export const getTopListDetail = () => {
  return defHttp.get({ url: Api.GetTopListDetail });
};

export const getArtistAlbum = params => {
  return defHttp.get({ url: Api.GetArtistAlbum, params });
};
export const getAlbum = params => {
  return defHttp.get({ url: Api.GetAlbum, params });
};
