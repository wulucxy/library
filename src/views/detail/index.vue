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
      <Placeholder v-else-if="state.loading" />
    </div>
    <div>
    <div class="pen" style="height: 50px;"></div>
      <div class="action-bar" v-if="state.bookInfo">
        <Button
          type='default'
          :class="state.bookInfo.isFav && 'btn-solid'"
          @click="handleFav"
        >{{ state.bookInfo.isFav ? '已收藏' : '收藏' }}</Button>
        <Button type='primary' @click="handleBorrow">借书</Button>
      </div>
    </div>
    <Bollow
      :show="state.showBollowDialog"
      :book="state.bookInfo"
      :onCancel="handleCancel"
      :onOk="handleConfirm"
    />
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from 'vant'

import { BookInfoCell, TextCollapse, Placeholder } from '@/components'
import { queryBookInfo, favBook, bollowBook } from '@/api'

import { Bollow } from './components'

export default {
  name: 'Result',
  components: {
    Placeholder,
    TextCollapse,
    BookInfoCell,
    Button,
    Bollow,
  },
  setup (props){
    const route = useRoute()

    const bookId = Number(route.query.id)

    const state = reactive({
      loading: false,
      bookInfo: null,
      showBollowDialog: false,
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

    const toggleDialog = () => {
      Object.assign(state, {
        showBollowDialog: !state.showBollowDialog
      })
    }

    const handleCancel = () => {
      toggleDialog()
    }

    const handleConfirm = (book) => {
      bollowBook({
        bookInstanceId: book.id
      }).then(() => {
        toggleDialog()
      })
      
    }

    // 借书
    const handleBorrow = () => {
      toggleDialog()
    }

    return {
      state,
      handleFav,
      handleBorrow,
      handleCancel,
      handleConfirm,
      toggleDialog
    }
  }
}


</script>
<style lang="scss">
@import '@/assets/style/function';
.book-detail{
  min-height: 100vh;
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
  background-color: #fff;
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
