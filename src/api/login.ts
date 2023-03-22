import { defHttp } from './http/axios';
enum Api {
  GetQrKey = '/login/qr/key',
  GetQrCreate = '/login/qr/create',
  GetQrCheck = '/login/qr/check',
  GetLoginStatus = '/login/qr/check',
}
export const getLoginStatus = () => {
  return defHttp.get({ url: Api.GetLoginStatus });
};
export const getQrKey = () => {
  return defHttp.get({ url: Api.GetQrKey });
};
export const getQrCreate = params => {
  return defHttp.get({ url: Api.GetQrCreate, params });
};

export const getQrCheck = params => {
  return defHttp.get({ url: Api.GetQrCheck, params });
};
