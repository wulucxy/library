<template>
  <List
    v-model="state.loading"
    :finished="finished"
    class="search-list"
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
import { reactive } from 'vue'
import { List } from 'vant'
import { useRouter } from 'vue-router'

import { BookInfoCell }  from '@/components'
import { favBook } from '@/api'

export default {
  name: 'SearchResult',
  components: {
    List,
    BookInfoCell
  },
  props: {
    loading: Boolean,
    finished: Boolean,
    updateBook: Function,
    data: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props, ctx){
    // eslint-disable-next-line
    const { updateBook } = props
    const router = useRouter()
    const state = reactive({
      loading: props.loading,
    })

    const handleBookClick = (book, event) => {
      router.push({
        path: '/detail',
        query: { id: book.id }
      })
    }

    const handleFav = (book) => {
      updateBook(book, {
        isFav: !book.isFav
      })
    }

    const onLoad = () => {}

    return {
      state,
      onLoad,
      handleBookClick,
      handleFav,
    }
  }
}


</script>

