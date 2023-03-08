import type { AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { clone } from 'lodash-es';
import type { RequestOptions, Result } from '../typings/axios';
import { ContentTypeEnum } from '../enums/httpEnum';
import { deepMerge } from '/@/utils';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { DefHttp } from './DefHttp';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
	/**
	 * @description: 请求之前的拦截器
	 */
	beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig => {
		console.log(options);
		return config;
	},
	/**
	 * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
	 */
	transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions): any => {
		console.log(options);
		return res;
	},

	/**
	 * @description: 请求拦截器处理
	 */
	requestInterceptors: (
		config: InternalAxiosRequestConfig,
		options: CreateAxiosOptions,
	): InternalAxiosRequestConfig => {
		console.log(options);
		// 请求之前处理config
		// const token = getToken();
		// if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
		// 	// jwt token
		// 	(config as Recordable).headers.Authorization = options.authenticationScheme
		// 		? `${options.authenticationScheme} ${token}`
		// 		: token;
		// }
		return config;
	},
	/**
	 * @description: 请求失败错误处理
	 */
	requestInterceptorsCatch: (error: Error): Promise<any> => {
		return Promise.reject(error);
	},
	/**
	 * @description: 响应拦截器
	 */
	responseInterceptors: (res: AxiosResponse<any>): AxiosResponse<any> => {
		return res;
	},

	/**
	 * @description: 响应失败错误处理
	 */
	responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any): Promise<any> => {
		console.log(axiosInstance);
		return Promise.reject(error);
	},
};
export function createAxios(opt?: Partial<CreateAxiosOptions>) {
	return new DefHttp(
		// 深度合并
		deepMerge(
			{
				// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
				// authentication schemes，e.g: Bearer
				// authenticationScheme: 'Bearer',
				authenticationScheme: '',
				timeout: 10 * 1000,
				// 基础接口地址
				// baseURL: globSetting.apiUrl
				headers: { 'Content-Type': ContentTypeEnum.JSON },
				// 如果是form-data格式
				// headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
				// 数据处理方式
				transform: clone(transform),
				// 配置项，下面的选项都可以在独立的接口请求中覆盖
				requestOptions: {
					// 默认将prefix 添加到url
					joinPrefix: true,
					// 是否返回原生响应头 比如：需要获取响应头时使用该属性
					isReturnNativeResponse: false,
					// 需要对返回数据进行处理
					isTransformResponse: true,
					// post请求的时候添加参数到url
					joinParamsToUrl: false,
					// 格式化提交参数时间
					formatDate: true,
					// 消息提示类型
					errorMessageMode: 'message',
					// 接口地址
					apiUrl: '/api',
					// 接口拼接地址
					urlPrefix: '',
					//  是否加入时间戳
					joinTime: true,
					// 忽略重复请求
					ignoreCancelToken: true,
					// 是否携带token
					withToken: true,
					retryRequest: {
						isOpenRetry: true,
						count: 5,
						waitTime: 100,
					},
				},
			},
			opt || {},
		),
	);
}
