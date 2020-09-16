const axios = require('axios')
const http = require('http')
const querystring = require('querystring')

const request = () => {
  let instance = axios.create({
    httpAgent: new http.Agent({ keepAlive: true }),
    paramsSerializer: function(params) {
      return querystring.stringify(params)
    }
  })
  instance.interceptors.request.use((config) => {
    // todo: 
    return config
  })
  instance.interceptors.response.use((res) => {
    // todo: 
    return res
  })
  return async (ctx, next) => {
    ctx.axios = instance
    await next()
  }
}

module.exports = request
