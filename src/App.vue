<template>
  <Placeholder v-if="!state.userInfo" />
  <div v-else>
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <TabBar
      v-if="showTabBar"
      :data="tabBarData"
      :activeRoute="activeRoute"
    />
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

import { TabBar, Placeholder } from '@/components'
import { ddAuth, setMenu } from '@/utils'

import './assets/style/index.scss'

import MeIcon from './assets/images/me.png'
import MeActiveIcon from './assets/images/me-active.png'
import HomeIcon from './assets/images/home.png'
import HomeActiveIcon from './assets/images/home-active.png'
import ApplyIcon from './assets/images/apply.png'
import ApplyActiveIcon from './assets/images/apply-active.png'

 const tabBarData = [
  {label: '购书申请', name: 'apply', path: '/apply', icon: {
    active: ApplyActiveIcon,
    unactive: ApplyIcon
  }},
  {label: '首页', name: 'home', path: '/', icon: {
    active: HomeActiveIcon,
    unactive: HomeIcon
  }},
  {label: '我', name: 'me', path: '/me', icon: {
    active: MeActiveIcon,
    unactive: MeIcon
  }}
];

export default {
  name: 'App',
  components: {
    Placeholder,
    TabBar
  },
  setup() {
    const store = useStore();
    const router = useRouter()

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

      const isAdmin = (state.userInfo.roles || []).filter(role => {
        return role.name.includes('管理员')
      }).length > 0

      if(isAdmin) {
        setMenu({
          backgroundColor: "#ADD8E6",
          textColor: "#ADD8E611",
          items: [
              {
                "id": "1",// 字符串
                "iconId": "setting-o",//字符串，图标命名
                "text": "设置"
              },
          ],
          onSuccess: function(data) {
            // 设置页面
            if(data.id === '1') {
              router.push({
                path: '/settings',
              })
            }
          },
          onFail: function(err) {
            console.log('err', err)
          }
        })
      }
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
