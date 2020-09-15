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
          <Recommend
            :data="state.recommend.data"
            :loading="state.recommend.loading"
            :finished="state.recommend.finished"
            :updateBook="updateBook"
          />
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
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CellGroup, Search, Tabs, Tab, Button } from 'vant'

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
    Search,
    Tabs,
    Tab,
    Recommend,
    Borrow
  },
  setup (){
    const router = useRouter()

    const state = reactive({
      activeTab: 'recommend',
      recommend: {
        loading: false,
        finished: false,
        data: {
          records: []
        },
      },
      rank: {
        loading: false,
        finished: false,
        data: {
          records: []
        }
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

    // 借书
    const toBorrow = () => {
      utilScan({
        type: 'barCode',
        onSuccess: (data) => {
          // 图书二维码同步给后端
          Object.assign(state, {
            bookInstanceId: data.txt
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
      const curBook = curTab.data.records.find(d => d.id === book.id)
      if(curBook) {
        const nextTab = {
          ...curTab,
          data: {
            ...curTab.data,
            records: curTab.data.records.map(d => {
              if(d.id === book.id) {
                return {...d, ...params}
              }
              return d
            })
          }
        }
        updateState(state.activeTab, nextTab)
      }
    }

    onMounted(() => {
      updateState('recommend', {
        loading: true,
      })
      queryRecommendList().then(res => {
        updateState('recommend', {
          loading: false,
          finished: res.pages < CONST.pageSize,
          data: res
        })
      })
    })

    return {
      state,
      updateState,
      updateBook,
      onFocus,
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
