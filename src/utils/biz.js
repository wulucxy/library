import CryptoJS from 'crypto-js';
import * as dd from "dingtalk-jsapi"; // 钉钉JSAPI

import axios from './request';
import { requestAuthCodeForRuntime, ddConfig } from './ddApi'
import { setAuthCode, delAuthCode, setToken, clearStorage } from './tools'

const Settings = require('./const')

// 获取 access_token
async function getTokenService(settings) {
  const { appKey, appSecret } = settings
  const params = {
    appsecret: appSecret,
    appkey: appKey,
  }
  return await axios.get('/dd/gettoken', { params })
  .then(function(res) {
    // 写入本地存储
    // todo: 更新 token
    setToken(res.access_token)
    return res.access_token;
  });
}

async function getJsApiTicket(params) {
  return await axios.get('/dd/get_jsapi_ticket', {
    params
  })
  .then(function(response) {
    return response.ticket;
  });
}

function getJsApiSignature(ticket, nonce, timeStamp, url) {
  let plainTex = "jsapi_ticket=" + ticket + "&noncestr=" + nonce + "&timestamp=" + timeStamp + "&url=" + url;
  let signature = CryptoJS.SHA1(plainTex).toString();
  return signature;
}

// 用户认证
const ddAuth = () => {
  return new Promise((resolve, reject) => {
    const timeStamp = Date.now()
    const nonce = 'zhejianglab'

    const url = window.location.href.replace(window.location.hash, '')
    return getTokenService(Settings).then(access_token => {
      getJsApiTicket({ access_token }).then(ticket => {
        const signature = getJsApiSignature(ticket, nonce, timeStamp, url)
         // 鉴权
        ddConfig({
          timeStamp, // 必填，生成签名的时间戳
          nonceStr: nonce, // 必填，生成签名的随机串
          signature, // 必填，签名
        })

        dd.ready(() => {
          console.log('dd.reandy')
          requestAuthCodeForRuntime({
            onSuccess: ({ code }) => {
              console.log('onSuccess', code)
              setAuthCode(code)
              resolve(code)
            },
            onFail: function(err) {
              console.error('err', err)
              delAuthCode()
              reject(err)
            }
          })
        })

        dd.error(function(err) {
          // 清除所有缓存
          clearStorage()
          console.error('error', err);
        });
      })
    })
  })
}

export { ddAuth }