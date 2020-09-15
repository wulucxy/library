<template>
  <div class="page home-page">
    <div class="search-field">
      <CellGroup>
        <Search
          input-align="center"
          @focus="onFocus"
          placeholder="搜索图书关键字"
        />
      </CellGroup>
    </div>
    <div class='card-large'>
      <Button
        type='primary'
        size="large"
        class='primary-btn primary-btn-shadow btn-1'
        @click="toBorrow"
      >
        轻&nbsp;松&nbsp;借&nbsp;阅&nbsp;扫&nbsp;码&nbsp;自&nbsp;助
      </Button>
    </div>
    <div class="cell-list-wrapper">
      <Tabs v-model="state.activeTab" @change="handleTabChange" class="inline-tabs">
        <Tab name='recommend' title="新书推荐">
          <PullRefresh v-model="state.refreshing" @refresh="onRefresh">
            <Recommend
              :data="state.recommend.data"
              :loading="state.recommend.loading"
              :finished="state.recommend.finished"
              :updateBook="updateBook"
              :onLoad="onLoad"
            />
          </PullRefresh>
        </Tab>
        <Tab name='rank' title="借阅排行">2</Tab>
      </Tabs>
    </div>
    <Borrow
      v-if="state.bookInstanceId"
      :bookInstanceId="state.bookInstanceId"
      :onClose="handleClose"
    />
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { CellGroup, Search, Tabs, Tab, Button, PullRefresh } from 'vant'

import { Borrow } from '@/components'
import { Recommend } from './components'
import { queryRecommendList } from '@/api'
import { utilScan } from '@/utils'
import CONST from '@/utils/const'

export default {
  name: 'Home',
  components: {
    Button,
    CellGroup,
    PullRefresh,
    Search,
    Tabs,
    Tab,
    Recommend,
    Borrow
  },
  setup (){
    const router = useRouter()

    // 请求 map
    const requestMap = {
      recommend: queryRecommendList
    }

    const state = reactive({
      activeTab: 'recommend',
      refreshing: false, // 下拉刷新
      recommend: {
        loading: false,
        finished: false,
        data: [],
      },
      rank: {
        loading: false,
        finished: false,
        data: [],
      },
      bookInstanceId: null
    })

    const onFocus = () => {
      router.push({
        path: '/search',
      })
    }

    const handleTabChange = (active) => {
      console.log('active', active)
    }

    // 更新全部
    const updateState = (type, obj) => {
      const next = Object.assign({}, state[type], obj)
      Object.assign(state, {
        [type]: next
      })
    }

    const onLoad = () => {
      const request = requestMap[state.activeTab]
      updateState(state.activeTab, {
        loading: true,
      })
      // 下拉刷新
      if (state.refreshing) {
        Object.assign(state, {
          refreshing: false
        })
        updateState(state.activeTab, {
          data: []
        })
      }
      request().then(res => {
        setTimeout(() => {
          updateState(state.activeTab, {
            loading: false,
            finished: res.pages < CONST.pageSize,
            data: res.records
          })
        }, 800)
      })
    }

    const onRefresh = () => {
      updateState(state.activeTab, {
        finished: false,
      })
      onLoad()
    }

    // 借书
    const toBorrow = () => {
      utilScan({
        type: 'barCode',
        onSuccess: (data) => {
          // 图书二维码同步给后端
          Object.assign(state, {
            bookInstanceId: data.text
          })
        }
      })
    }

    // 关闭借书弹窗
    const handleClose = () => {
      Object.assign(state, {
        bookInstanceId: null
      })
    }

    // 更新指定图书状态
    const updateBook = (book, params) => {
      const curTab = state[state.activeTab]
      const curBook = curTab.data.find(d => d.id === book.id)
      if(curBook) {
        const nextTab = {
          ...curTab,
          data: curTab.data.map(d => {
            if(d.id === book.id) {
              return {...d, ...params}
            }
            return d
          })
        }
        updateState(state.activeTab, nextTab)
      }
    }

    return {
      state,
      onLoad,
      updateState,
      updateBook,
      onFocus,
      onRefresh,
      toBorrow,
      handleClose,
      handleTabChange
    }
  }
}
</script>
<style scoped>
  .cell-list-wrapper{
    background-color: #fff;
    min-height: 66.7vh;
  }
  .card-large{
    margin: 8px 0;
    padding: 7.5% 11.3%;
    background-color: #fff;
  }
  .btn-1{
    height: 44px;
    border-radius: 22px;
  }
</style>
