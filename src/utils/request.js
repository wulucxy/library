import axios from 'axios';
import qs from 'qs';
// import url from 'url'

import { addSearchParam, isApi, isDingding } from './base';
import store from '@/store';
import { requestAuthCode } from './ddApi'

// 本地开发联调
const isMock = process.env.NODE_ENV === 'development' && process.env.VUE_APP_MOCK === 'true'

// 抛出 http 异常
export const HttpError = (message, code) => {
  const error = new Error(message);
  error.name = 'HttpError';
  if (code != null) {
    error.code = code;
  }

  return Promise.reject(error);
};
// 创建axios实例
const service = axios.create({
  timeout: 1200000, // 请求超时时间
  withCredentials: true,
  // 格式化 query 中数组格式
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false });
  },
});

// request拦截器
service.interceptors.request.use(
  async config => {
    const { token } = store.state || {}
    // todo: 后端接口地址(非钉钉服务)
    if (/^(\/)?api/.test(config.url)) {
      // 只给内部接口配置请求路径
      config.baseURL = isMock ? process.env.VUE_APP_BASE_API : '/';
      try {
        // todo: 本地测试
        const authCode = await requestAuthCode()
        if (token && authCode) {
          config.headers['token'] = token
          config.headers['code'] = authCode
        }
      } catch(err) {
        console.log('===catch err', err)
        // do nothing
      }
      
    } else if(/^(\/)?dd/.test(config.url)) {
      // 钉钉接口
      const parsed = addSearchParam(config.url, 'access_token', token)
      config.url = parsed
    }
    console.log('===config.headers', config.headers)
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    // Do something with request error
    // console.log(error); // for debug
    Promise.reject(error);
  },
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 内部接口
    if (isDingding(response.config.url)) {
      if (res.errcode !== 0) {
        return HttpError(res.errmsg || '请求异常', res.errcode);
      }
      return res
    } else if(isApi(response.config.url)) {
      if (res.code !== 200) {
        return HttpError(res.msg || '请求异常', res.code);
      }
    }

    return res.data;
  },
  error => {
    if (error.response) {
      const {data} = error.response;
      // 目前后端返回会出现有 code 无 msg
      if (data && data.code) {
        return HttpError(data.msg || '请求异常', data.code);
      }
      return HttpError(`请求异常：${  error.response.statusText}`);
    }

    if (error.request) {
      return HttpError('请求异常：无返回结果');
    }

    return HttpError(error.message);
  },
);

export default service;
