import CryptoJS from 'crypto-js';
import * as dd from "dingtalk-jsapi"; // 钉钉JSAPI

import store from '@/store';
import axios from './request';
import { ddConfig, utilScan } from './ddApi'
import { queryISBN } from '@/api'

const ISBN = require('isbn-validate')
const Settings = require('./settings')

// 图书状态
export const bookStatus = {
  0: 'UN_SIGN', // 未录入过
  1: 'SIGNED', // 已录入过，但未创建实例
  2: 'INSTANCED' // 已录入并且已创建实例
};

// 识别图书 ISBN 码
export const ISBNScan = (options = {}) => {
  return utilScan({
    type: 'barCode',
    onSuccess: (data) => {
      // 过滤非标准数据
      if (!ISBN.Validate(data.text)) {
        throw new Error('该书 ISBN 码异常')
      }
      // 图书二维码同步给后端
      queryISBN(data.text).then(res => {
        if(!res || !res.isbn) {
          throw new Error('该书暂无法识别，请手动录入')
        }

        options.onSuccess && options.onSuccess(res)
      })
     }
  })
}

// 识别图书自定义二维码
export const barcodeScan = (options = {}) => {
  return utilScan({
    type: 'barCode',
    onSuccess: (data) => {
      // 过滤非标准数据
      if (!data?.text){
        throw new Error('该书无法识别，请联系管理员')
      } else if (data.text.split(/\n/).length !== 2) {
        throw new Error('该书未录入系统，无法借阅，请联系管理员')
      }
      const __text = data.text.split(/\n/)[0]
      // removing leading zero
      const instanceId = __text.replace(/^\0+/, '')
      options.onSuccess && options.onSuccess(instanceId)
     }
  })
}

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
    store.dispatch('setToken', res.access_token)
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
    return getTokenService(Settings).then(() => {
      getJsApiTicket().then(ticket => {
        const signature = getJsApiSignature(ticket, nonce, timeStamp, url)
         // 鉴权
        ddConfig({
          timeStamp, // 必填，生成签名的时间戳
          nonceStr: nonce, // 必填，生成签名的随机串
          signature, // 必填，签名
        })

        dd.ready(() => {
          axios.get('/api/users/current').then(res => {
            resolve(res)
          })
        })

        dd.error(function(err) {
          // 清除所有缓存
          store.dispatch('clearStorage')
          console.error('===dd.error===', err);
          reject(err)
        });
      })
    })
  })
}

export { ddAuth }