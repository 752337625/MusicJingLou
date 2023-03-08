import { defHttp } from './http/axios';

enum Api {
  GetBannersList = '/banner?type=2',
}

export const getBannersList = () => {
  return defHttp.get({ url: Api.GetBannersList });
};
