import { defHttp } from './http/axios';
enum Api {
  GetSearchDefault = '/search/default',
  GetSearchSuggest = '/search/suggest',
  GetSearchHot = '/search/hot',
  GetSearchCloudsearch = '/cloudsearch',
}
export const getSearchCloudsearch = params => {
  return defHttp.get({ url: Api.GetSearchCloudsearch, params });
};
export const getSearchHot = params => {
  return defHttp.get({ url: Api.GetSearchHot, params });
};
export const getSearchSuggest = params => {
  return defHttp.get({ url: Api.GetSearchSuggest, params });
};

export const getSearchDefault = () => {
  return defHttp.get({ url: Api.GetSearchDefault });
};
