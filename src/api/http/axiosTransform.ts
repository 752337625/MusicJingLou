/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { RequestOptions, Result } from '../typings/axios';

/**
 * @description: Process configuration before request
 * @description: Process configuration before request
 */
export interface CreateAxiosOptions extends AxiosRequestConfig {
	authenticationScheme?: string;
	// eslint-disable-next-line no-use-before-define
	transform?: AxiosTransform;
	requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
	/**
	 * @description: Process configuration before request
	 * @description: Process configuration before request
	 */
	beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

	/**
	 * @description: 处理响应数据
	 */
	transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

	/**
	 * @description: 请求失败处理
	 */
	requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

	/**
	 * @description: 请求拦截器
	 */
	requestInterceptors?: (
		config: InternalAxiosRequestConfig,
		options: CreateAxiosOptions,
	) => InternalAxiosRequestConfig;
	/**
	 * @description: 请求失败错误处理
	 */
	requestInterceptorsCatch?: (error: Error) => Promise<any>;
	/**
	 * @description: 响应拦截器
	 */
	responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

	/**
	 * @description: 响应失败错误处理
	 */
	responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => Promise<any>;
}
