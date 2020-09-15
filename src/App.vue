<template>
  <div>
    <Placeholder v-if="!state.userInfo" />
    <div v-else>
      <router-view class="child-view"></router-view>
      <TabBar
        v-if="showTabBar"
        :data="tabBarData"
        :activeRoute="activeRoute"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { useStore } from "vuex";

import { TabBar, Placeholder } from '@/components'
import { ddAuth, utilScan, setMenu } from '@/utils'

import './assets/style/index.scss'

 const tabBarData = [
  {label: '购书申请', name: 'apply', icon: 'shopping-cart', path: '/apply'},
  {label: '首页', name: 'home', icon: 'wap-home', path: '/'},
  {label: '我', name: 'me', icon: 'manager', path: '/me'}
];

export default {
  name: 'App',
  components: {
    Placeholder,
    TabBar
  },
  setup() {
    const store = useStore();

    const state = reactive({
      userInfo: null
    })

    // 当前路由
    const activeRoute = computed(() => store.state.activeRoute)
    // 是否展示 tabBar
    const showTabBar = computed(() => !!store.state.activeRoute?.meta?.showTabBar)

    onMounted(async () => {
      try {
        const userInfo = await ddAuth()
        store.dispatch('setUserInfo', userInfo)
        Object.assign(state, {
          userInfo
        })
      } catch (err){
        console.error('用户免登失败')
        throw(err)
      }
            
      // setMenu({
      //   backgroundColor: "#ADD8E6",
      //   textColor: "#ADD8E611",
      //   items: [
      //       {
      //         "id": "1",// 字符串
      //         "iconId": "scan",//字符串，图标命名
      //         "text": "扫码"
      //       },
      //   ],
      //   onSuccess: function(data) {
      //     // 扫码图书
      //     if(data.id === '1') {
      //       utilScan({
      //         type: 'barCode',
      //         onSuccess: (data) => {
      //           // 图书二维码同步给后端
      //           console.log('data2', data)
      //         }
      //       })
      //     }
      //   },
      //   onFail: function(err) {
      //     console.log('err', err)
      //   }
      // })
    })

    return {
      state,
      tabBarData,
      activeRoute,
      showTabBar,
    }
  }
}
</script>
