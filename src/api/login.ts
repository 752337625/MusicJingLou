import { defHttp } from './http/axios';
enum Api {
  GetQrKey = '/login/qr/key',
  GetQrCreate = '/login/qr/create',
  GetQrCheck = '/login/qr/check',
  GetLoginStatus = '/login/status',
  GetLoginCellphone = `/login/cellphone`,
}
export const getLoginCellphone = params => {
  return defHttp.post({ url: Api.GetLoginCellphone, params });
};
export const getLoginStatus = data => {
  return defHttp.post({ url: Api.GetLoginStatus, data });
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
