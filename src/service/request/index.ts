import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { HYRequestInterceptors, HYRequestConfig } from './type';

import { ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

const DEAFULT_LOADING = true;

class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  showLoading: boolean;
  loading?: ILoadingInstance;

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? true;
    this.interceptors = config.interceptors;

    // 从config取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0,0,0,0.5)'
          });
        }

        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        const data = res.data;
        if (data.returnCode === '-1001') {
          console.log('请求失败~,错误信息');
        } else {
          return data;
        }
      },
      (err) => {
        this.loading?.close();
        if (err.response.status === 404) {
          console.log('404错误~');
        }
        return err;
      }
    );
  }
  request<T>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            // res = config.interceptors.responseInterceptor(res);
          }
          console.log(res);
          this.showLoading = DEAFULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }
}
export default HYRequest;
