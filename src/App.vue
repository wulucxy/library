<template>
  <div id="app">
    <Skeleton title :row="6" />
    <router-view class="child-view"></router-view>
    <TabBar :data="tabBarData" />
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { Skeleton, Button } from 'vant';

import { TabBar } from '@/components'
import { ddAuth, utilScan, setMenu } from '@/utils'

 const tabBarData = [
  {label: '首页', name: 'home', icon: 'wap-home', path: '/home'},
  {label: '分类', name: 'classification', icon: 'smile-comment', path: '/classification'},
  {label: '购物车', name: 'cart', icon: 'shopping-cart', path: '/cart'},
  {label: '我', name: 'me', icon: 'manager', path: '/me'}
];

export default {
  name: 'App',
  components: {
    Button,
    Skeleton,
    TabBar
  },
  setup() {
    const state = reactive({
      userInfo: null
    })

    const handleClick = () => {
      utilScan({
        type: 'barCode',
        onSuccess: (data) => {
          console.log('data2', data)
        }
      })
    }

    onMounted(async () => {
      const result = await ddAuth()
      console.log('appResult', result)
      setMenu({
        backgroundColor: "#ADD8E6",
        textColor: "#ADD8E611",
        items: [
            {
              "id": "1",// 字符串
              "iconId": "scan",//字符串，图标命名
              "text": "扫码"
            },
        ],
        onSuccess: function(data) {
          console.log('data', data)
        },
        onFail: function(err) {
          console.log('err', err)
        }
      })
    })

    return {
      state,
      handleClick,
      tabBarData
    }
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
