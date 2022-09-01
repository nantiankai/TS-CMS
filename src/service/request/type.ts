import type { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface HYRequestInterceptors {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch: (err: any) => any;
  responseInterceptor: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch: (err: any) => any;
}
export interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors;
  showLoading?: boolean;
}
