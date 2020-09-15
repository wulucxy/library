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
          2
        </Tab>
      </Tabs>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { Tabs, Tab } from 'vant'
import Promise from 'bluebird'

import { queryBorrowList, queryFavorList } from '@/api'
import { Placeholder } from '@/components'
import { BorrowList } from './components'

export default {
  name: 'Me',
  components: {
    BorrowList,
    Tabs,
    Tab,
    Placeholder,
  },
  setup (props){
    const state = reactive({
      activeTab: 'borrow',
      loading: false,
      borrowList: [],
      favorlist: []
    })

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
        favorlist: res[1],
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
