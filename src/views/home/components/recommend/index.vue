<template>
  <List
    v-model:loading="state.loading"
    :finished="finished"
    class="book-list"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <BookInfoCell
      v-for="book in data"
      :key="book.id"
      :book="book"
      :handleItemClick="handleBookClick"
      :handleFav="handleFav"
    />
  </List>
</template>
<script>
import { reactive, watch } from 'vue'
import { List } from 'vant'
import { useRouter } from 'vue-router'

import { BookInfoCell }  from '@/components'
import { favBook } from '@/api'

export default {
  name: 'Recommend',
  components: {
    List,
    BookInfoCell
  },
  props: {
    loading: Boolean,
    finished: Boolean,
    updateBook: Function,
    onLoad: Function,
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props){
    // eslint-disable-next-line
    const { updateBook } = props
    const router = useRouter()
    const state = reactive({
      loading: props.loading,
    })

    const handleBookClick = (book) => {
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

    watch(() => props.loading, (next) => {
      state.loading = next
    })

    return {
      state,
      handleBookClick,
      handleFav,
    }
  }
}

</script>
