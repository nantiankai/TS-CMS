import axios, { AxiosResponse } from 'axios';

// axios的实例对象
// axios
//   .get('http://152.136.185.210:4000/home/multidata')
//   .then((res: AxiosResponse<any>) => {
//     console.log(res);
//   });
// axios的配置选项
axios.defaults.baseURL = 'http://httpbin.org';
axios.defaults.timeout = 10000;
// axios.defaults.headers = {}

// axios的拦截器
axios.interceptors.request.use(
  (config) => {
    console.log('请求成功的拦截');
    return config;
  },
  (err) => {
    console.log('请求失败的拦截');
    return err;
  }
);
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截');
    return res;
  },
  (err) => {
    console.log('响应失败的拦截');
    return err;
  }
);

// get请求，并且传入参数
// axios.get;
