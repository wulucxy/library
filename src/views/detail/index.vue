<template>
  <div class='page detail-page'>
    <div class="book-detail">
      <div v-if="state.bookInfo">
        <BookInfoCell
          :clickable="false"
          :book="state.bookInfo"
          :handleFav="handleFav"
        />
        <div class="book-content">
          <TextCollapse title="图书简介">{{state.bookInfo.intro}}</TextCollapse>
        </div>
      </div>
      <Skeleton v-else-if="state.loading" title :row="6" />
    </div>
    <div class="action-bar" v-if="state.bookInfo">
      <Button
        type='default'
        :class="state.bookInfo.isFav && 'btn-solid'"
        @click="handleFav"
      >{{ state.bookInfo.isFav ? '已收藏' : '收藏' }}</Button>
      <Button type='primary'>借书</Button>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Button, Skeleton } from 'vant'

import { BookInfoCell, TextCollapse } from '@/components'
import { queryBookInfo, favBook } from '@/api'

export default {
  name: 'Result',
  components: {
    Skeleton,
    TextCollapse,
    BookInfoCell,
    Button,
  },
  setup (props){
    const route = useRoute()

    const bookId = Number(route.query.id)

    const state = reactive({
      loading: false,
      book: null
    })

    onMounted(async () => {
      Object.assign(state, {
        loading: true
      })
      try {
        const bookInfo = await queryBookInfo(route.query.id)
        Object.assign(state, {
          loading: false,
          bookInfo,
        })
      } catch(err) {
        Object.assign(state, {
          loading: false
        })
      }
    })

    const handleFav = () => {
      const nextBookInfo = {...state.bookInfo, isFav: !state.bookInfo.isFav}
      Object.assign(state, {
        bookInfo: nextBookInfo
      })
      // 同步保存后台
      favBook(bookId, nextBookInfo.isFav)
    }

    return {
      state,
      handleFav
    }
  }
}


</script>
<style lang="scss">
@import '@/assets/style/function';
.book-detail{
  margin-top: rem(8);
}
.book-content{
  margin: 0 rem(28);
}
.action-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -2px 8px #f0f1f2;
  .van-button{
    display: inline-block;
    width: 33%;
    height: 32px;
    border-radius: 16px;
    margin-right: 8.8%;
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>
