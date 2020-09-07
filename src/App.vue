<template>
  <div id="app">
    
  </div>
</template>

<script>
import { onMounted } from 'vue'
import * as dd from "dingtalk-jsapi"; // 钉钉JSAPI

import { getToken, getJsApiTicket, getJsApiSignature } from '@/utils/biz'

const Settings = require('@/utils/const')

export default {
  name: 'App',
  setup (){
    onMounted(async () => {
      const timeStamp = Date.now()
      const nonce = 'zhejianglab'

      const url = window.location.href.replace(window.location.hash, '')
      const access_token = await getToken(Settings)
      const ticket = await getJsApiTicket({ access_token })
      const signature = getJsApiSignature(ticket, nonce, timeStamp, url)

      // 鉴权
      dd.config({
        agentId: Settings.agentId,
        corpId: Settings.corpId, //必填，企业ID
        timeStamp, // 必填，生成签名的时间戳
        nonceStr: nonce, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: [
          'biz.user.get',
          'device.geolocation.get',
          'biz.contact.complexPicker',
          'biz.util.uploadImage',
          'biz.user.get'
        ] 
      })

      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: Settings.corpId,
          onSuccess: (result) => {
            console.log('===result===', result)
          }
        })
      })

      dd.error(function(err) {
        console.error('error', err);
      });
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
