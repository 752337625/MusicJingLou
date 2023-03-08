import type {
	AxiosRequestConfig,
	AxiosInstance,
	AxiosResponse,
	AxiosError,
	InternalAxiosRequestConfig,
} from 'axios';
import type { RequestOptions, Result, UploadFileParams } from '../typings/axios';
import type { CreateAxiosOptions } from './axiosTransform';
import axios from 'axios';
import qs from 'qs';
import { ContentTypeEnum, RequestEnum } from '../enums/httpEnum';
import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '@jingluo/utils';
import { cloneDeep } from 'lodash-es';

/**
 * @description:  axios module
 */
export class DefHttp {
	/**
	 * @description: 存储实例对象
	 */
	private axiosInstance: AxiosInstance;
	/**
	 * @description: 存储实例配置
	 */
	private readonly options: CreateAxiosOptions;
	/**
	 * @description: 构造函数
	 */
	constructor(options: CreateAxiosOptions) {
		this.options = options;
		this.axiosInstance = axios.create(options);
		this.setupInterceptors();
	}

	/**
	 * @description: 创建axios实例对象 Create axios instance
	 */
	private createAxios(config: CreateAxiosOptions): void {
		this.axiosInstance = axios.create(config);
	}
	/**
	 * @description:  获取拦截器
	 */
	private getTransform() {
		const { transform } = this.options;
		return transform;
	}
	/**
	 * @description:  获取当前axios实列
	 */
	getAxios(): AxiosInstance {
		return this.axiosInstance;
	}

	/**
	 * @description: 重新配置axios实列  Reconfigure axios
	 */
	configAxios(config: CreateAxiosOptions) {
		if (!this.axiosInstance) {
			return;
		}
		this.createAxios(config);
	}

	/**
	 * @description: 设置请求头 Set general header
	 */
	setHeader(headers: any): void {
		if (!this.axiosInstance) {
			return;
		}
		Object.assign(this.axiosInstance.defaults.headers, headers);
	}

	/**
	 * @description: 拦截器配置 Interceptor configuration
	 */
	private setupInterceptors() {
		const transform = this.getTransform();
		if (!transform) {
			return;
		}
		const {
			requestInterceptors,
			requestInterceptorsCatch,
			responseInterceptors,
			responseInterceptorsCatch,
		} = transform;

		const axiosCanceler = new AxiosCanceler();

		// 请求拦截
		this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			const {
				headers: { ignoreCancelToken = false },
			} = config;
			const ignoreCancel =
				ignoreCancelToken !== undefined
					? ignoreCancelToken
					: this.options.requestOptions?.ignoreCancelToken;
			!ignoreCancel && axiosCanceler.addPending(config);
			if (requestInterceptors && isFunction(requestInterceptors)) {
				config = requestInterceptors(config, this.options);
			}
			return config;
		}, undefined);

		//  对请求错误做些什么 Request interceptor error capture
		requestInterceptorsCatch &&
			isFunction(requestInterceptorsCatch) &&
			this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

		// 添加响应拦截器
		this.axiosInstance.interceptors.response.use((response: AxiosResponse<any>) => {
			response && axiosCanceler.removePending(response.config);
			if (responseInterceptors && isFunction(responseInterceptors)) {
				response = responseInterceptors(response);
			}
			return response;
		}, undefined);

		//  对响应错误做点什么 Response result interceptor error capture
		responseInterceptorsCatch &&
			isFunction(responseInterceptorsCatch) &&
			this.axiosInstance.interceptors.response.use(undefined, error => {
				// @ts-ignore
				return responseInterceptorsCatch(this.axiosInstance, error);
			});
	}

	/**
	 * @description:  File Upload
	 */
	uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
		const formData = new window.FormData();
		const customFilename = params.name || 'file';

		if (params.filename) {
			formData.append(customFilename, params.file, params.filename);
		} else {
			formData.append(customFilename, params.file);
		}

		if (params.data) {
			Object.keys(params.data).forEach(key => {
				const value = params.data?.[key];
				if (Array.isArray(value)) {
					value.forEach(item => {
						formData.append(`${key}[]`, item);
					});
					return;
				}

				formData.append(key, params.data?.[key]);
			});
		}

		return this.axiosInstance.request<T>({
			...config,
			method: 'POST',
			data: formData,
			headers: {
				'Content-type': ContentTypeEnum.FORM_DATA,
				// @ts-ignore
				ignoreCancelToken: true,
			},
		});
	}

	// support form-data
	supportFormData(config: AxiosRequestConfig) {
		const headers = config.headers || this.options.headers;
		const contentType = headers?.['Content-Type'] || headers?.['content-type'];

		if (
			contentType !== ContentTypeEnum.FORM_URLENCODED ||
			!Reflect.has(config, 'data') ||
			config.method?.toUpperCase() === RequestEnum.GET
		) {
			return config;
		}

		return {
			...config,
			data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
		};
	}

	get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'GET' }, options);
	}

	post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'POST' }, options);
	}

	put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'PUT' }, options);
	}

	delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'DELETE' }, options);
	}

	request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		let conf: CreateAxiosOptions = cloneDeep(config);
		const transform = this.getTransform();

		const { requestOptions } = this.options;

		const opt: RequestOptions = Object.assign({}, requestOptions, options);

		const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};
		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			conf = beforeRequestHook(conf, opt);
		}
		conf.requestOptions = opt;

		conf = this.supportFormData(conf);

		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request<any, AxiosResponse<Result>>(conf)
				.then((res: AxiosResponse<Result>) => {
					if (transformResponseHook && isFunction(transformResponseHook)) {
						try {
							const ret = transformResponseHook(res, opt);
							resolve(ret);
						} catch (err) {
							reject(err || new Error('request error!'));
						}
						return;
					}
					resolve(res as unknown as Promise<T>);
				})
				.catch((e: Error | AxiosError) => {
					if (requestCatchHook && isFunction(requestCatchHook)) {
						reject(requestCatchHook(e, opt));
						return;
					}
					if (axios.isAxiosError(e)) {
						// rewrite error message from axios in here
					}
					reject(e);
				});
		});
	}
}
