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
              :handleItemClick="handleItemClick"
              :handleFav="handleFav"
              :onLoad="onLoad"
            />
          </PullRefresh>
        </Tab>
        <Tab name='rank' title="借阅排行">
          <PullRefresh v-model="state.refreshing" @refresh="onRefresh">
            <Empty
              v-if="state.rank.data.length === 0 && state.rank.loading === false" description="暂无借阅记录" />
            <Rank
              v-else
              :data="state.rank.data"
              :loading="state.rank.loading"
              :finished="state.rank.finished"
              :handleItemClick="handleItemClick"
              :handleFav="handleFav"
              :onLoad="onLoad"
            />
          </PullRefresh>
        </Tab>
      </Tabs>
    </div>
    <Borrow
      v-if="state.bookInstanceId"
      :bookInstanceId="state.bookInstanceId"
      :onClose="handleClose"
      :resetInstance="resetInstance"
    />
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { CellGroup, Search, Tabs, Tab, Button, PullRefresh, Empty } from 'vant'
import { isNil } from 'lodash'

import { Borrow } from '@/components'
import { Recommend, Rank } from './components'
import { queryRecommendList, queryHotBooks, favBook } from '@/api'
import { barcodeScan } from '@/utils'
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
    Rank,
    Borrow,
    Empty
  },
  setup (){
    const router = useRouter()

    // 请求 map
    const requestMap = {
      recommend: queryRecommendList,
      rank: queryHotBooks,
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
      Object.assign(state, {
        activeTab: active
      })
    }

    // 更新全部
    const updateState = (type, obj) => {
      const next = Object.assign({}, state[type], obj)
      Object.assign(state, {
        [type]: next
      })
    }

    const handleItemClick = (book) => {
      router.push({
        path: '/detail',
        query: { id: book.id }
      })
    }

    const handleFav = (book) => {
      updateBook(book, {
        favorite: !book.favorite
      })
      // 收藏图书
      favBook(book.id, !book.favorite)
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
            // 不做分页，或当前页面返回值小于 pageSize
            finished: isNil(res.pages) || res.pages < CONST.pageSize,
            data: isNil(res.pages) ? res : res.records
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

    const resetInstance = () => {
      Object.assign(state, {
        bookInstanceId: null
      })
    }

    // 借书
    const toBorrow = () => {
      barcodeScan({
        onSuccess: (text) => {
          // 图书二维码同步给后端
          Object.assign(state, {
            bookInstanceId: Number(text)
          })
        }
      })
    }

    // 关闭借书弹窗
    const handleClose = () => {
      resetInstance()
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
      handleItemClick,
      handleFav,
      updateBook,
      onFocus,
      onRefresh,
      toBorrow,
      handleClose,
      resetInstance,
      handleTabChange
    }
  }
}
</script>
<style scoped>
  .home-page{
    min-height: 100vh;
  }
  .cell-list-wrapper{
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
    background: linear-gradient(136deg, #FFD27E 0%, #FCC53A 100%);
  }
</style>
