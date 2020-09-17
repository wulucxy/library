<template>
  <div class="page me-page">
    <div class="me-result">
      <Tabs v-model="state.activeTab" class="inline-tabs">
        <Tab name='borrow' title="我的借阅">
          <Placeholder v-if="state.loading" />
          <BorrowList v-else :books="state.borrowList" />
        </Tab>
        <Tab name='fav' title="我的收藏">
          <Placeholder v-if="state.loading" />
          <FavorList
            v-else
            :books="state.favorList"
            :router="router"
            :handleFav="handleFav"
          />
        </Tab>
      </Tabs>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { Tabs, Tab } from 'vant'
import Promise from 'bluebird'
import { useRouter } from 'vue-router'

import { queryBorrowList, queryFavorList, favBook } from '@/api'
import { Placeholder } from '@/components'
import { BorrowList, FavorList } from './components'

export default {
  name: 'Me',
  components: {
    BorrowList,
    FavorList,
    Tabs,
    Tab,
    Placeholder,
  },
  setup (){
    const router = useRouter()
    const state = reactive({
      activeTab: 'borrow',
      loading: false,
      borrowList: [],
      favorList: []
    })

    const handleFav = (book) => {
      // 收藏图书
      favBook(book.id, !book.favorite).then(() => {
        queryFavorList().then(res => {
          console.log('res', res)
          Object.assign(state, {
            favorList: res,
          })
        })
      })
    }

    onMounted(() => {
      Object.assign(state, {
        loading: true
      })
      // todo: code
      Promise.all(
        [queryBorrowList, queryFavorList].map(request => request()))
      .then(res => {
        Object.assign(state, {
          borrowList: res[0],
          favorList: res[1],
        })
      })
      .finally(() => {
        Object.assign(state, {
          loading: false
        })
      })
    })

    return {
      state,
      router,
      handleFav,
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/style/function';
.me-page{
  min-height: 100vh;
}
.me-result{
  .book-cell{
    margin-bottom: 0;
    padding: rem(6) rem(28);
  }
}
</style>
