<template>
  <div id="app">
    {{ storeState }}
    <Skeleton title :row="6" />
    <router-view class="child-view"></router-view>
    <TabBar
      :data="tabBarData"
      :activeTabBar="activeTabBar"
      :changeActive="changeActive"
    />
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { Skeleton } from 'vant';
import { useStore } from "vuex";

import { TabBar } from '@/components'
import { ddAuth, utilScan, setMenu, axios } from '@/utils'

import './assets/style/index.less'

 const tabBarData = [
  {label: '购书申请', name: 'cart', icon: 'shopping-cart', path: '/apply'},
  {label: '首页', name: 'home', icon: 'wap-home', path: '/'},
  {label: '我', name: 'me', icon: 'manager', path: '/me'}
];

export default {
  name: 'App',
  components: {
    Skeleton,
    TabBar
  },
  setup() {
    const store = useStore();

    const state = reactive({
      userInfo: null
    })

    const activeTabBar = computed(() => store.state.tabBarActive)
    const storeState = computed(() => store.state)

    const changeActive = (active) => {
      store.dispatch('setTabBar', active)
    }

    onMounted(async () => {
      await ddAuth()
      axios.get('/api/users/current').then(res => {
        console.log('res', res)
      })
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
          // 扫码图书
          if(data.id === '1') {
            utilScan({
              type: 'barCode',
              onSuccess: (data) => {
                // 图书二维码同步给后端
                console.log('data2', data)
              }
            })
          }
        },
        onFail: function(err) {
          console.log('err', err)
        }
      })
    })

    return {
      state,
      storeState,
      tabBarData,
      activeTabBar,
      changeActive,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
