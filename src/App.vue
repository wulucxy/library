<template>
  <div>
    <!-- <div v-if="!storeState.userInfo" :style="{marginTop: '16px' }">
      <Skeleton title :row="6" />
    </div> -->
    <router-view class="child-view"></router-view>
    <TabBar
      v-if="showTabBar"
      :data="tabBarData"
      :activeRoute="activeRoute"
    />
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { Skeleton } from 'vant';
import { useStore } from "vuex";

import { TabBar } from '@/components'
import { ddAuth, utilScan, setMenu, axios } from '@/utils'

import './assets/style/index.scss'

 const tabBarData = [
  {label: '购书申请', name: 'apply', icon: 'shopping-cart', path: '/apply'},
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

    const storeState = computed(() => store.state)
    // 当前路由
    const activeRoute = computed(() => store.state.activeRoute)
    // 是否展示 tabBar
    const showTabBar = computed(() => !!store.state.activeRoute?.meta?.showTabBar)

    onMounted(async () => {
      try {
        const userInfo = await ddAuth()
        store.dispatch('setUserInfo', userInfo)
      } catch (err){
        console.error('用户免登失败')
      }
            
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
      activeRoute,
      showTabBar,
    }
  }
}
</script>

<style>
body{
  user-select:none; 
}
#app {
  font-family: "SF Pro SC","SF Pro Text","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-style: normal;
  letter-spacing: 0em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
