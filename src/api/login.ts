import { defHttp } from './http/axios';
enum Api {
  GetQrKey = '/login/qr/key',
  GetQrCreate = '/login/qr/create',
  GetQrCheck = '/login/qr/check',
  GetLoginStatus = '/login/status',
  GetLoginCellphone = `/login/cellphone`,
  GetCaptchaVerify = '/captcha/verify',
  GetCountriesCode = '/countries/code/list',
  GetCaptchaSent = '/captcha/sent',
  GetRegisterAnonimous = '/register/anonimous',
}
export const getRegisterAnonimous = () => {
  return defHttp.get({ url: Api.GetRegisterAnonimous });
};
export const getCaptchaVerify = params => {
  return defHttp.get({ url: Api.GetCaptchaVerify, params });
};
export const getCaptchaSent = params => {
  return defHttp.get({ url: Api.GetCaptchaSent, params });
};
export const getCountriesCode = () => {
  return defHttp.get({ url: Api.GetCountriesCode });
};
export const getLoginCellphone = params => {
  return defHttp.get({ url: Api.GetLoginCellphone, params });
};
export const getLoginStatus = params => {
  return defHttp.get({ url: Api.GetLoginStatus, params });
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
