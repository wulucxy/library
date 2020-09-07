import CryptoJS from 'crypto-js';
import axios from './request';

// 获取 access_token
async function getToken(settings) {
  const { appKey, appSecret } = settings
  const params = {
    appsecret: appSecret,
    appkey: appKey,
  }
  return await axios.get('/dd/gettoken', { params })
  .then(function(res) {
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

export { getToken, getJsApiTicket, getJsApiSignature }