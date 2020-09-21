const axios = require('axios')
const http = require('http')
const Promise = require('bluebird')
const querystring = require('querystring')

const request = () => {
  let instance = axios.create({
    httpAgent: new http.Agent({ keepAlive: true }),
    paramsSerializer: function(params) {
      return querystring.stringify(params)
    }
  })
  instance.interceptors.request.use((config) => {
    if (/^(\/)?api/.test(config.url)) {
      config.baseURL = 'http://10.5.29.82:7080';
    }
    // todo:
    console.log('config', config);
    return config
  })
  instance.interceptors.response.use((response) => {
    const res = response.data;
    if (/^(\/)?api/.test(response.config.url)) {
      if (res.code !== 200) {
        return Promise.reject(new Error('请求异常'))
      }
    }
    return res.data
  })
  return async (ctx, next) => {
    ctx.axios = instance
    await next()
  }
}

module.exports = request
