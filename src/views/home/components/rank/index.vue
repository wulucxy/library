<template>
  <List
    v-model:loading="state.loading"
    :finished="finished"
    class="rank-list"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <Item
      v-for="(book, index) in data"
      :key="book.id"
      :index="index"
      :book="book"
      :handleItemClick="handleBookClick"
    />
  </List>
</template>
<script>
import { reactive, watch } from 'vue'
import { List } from 'vant'
import { useRouter } from 'vue-router'

import Item from './item'

export default {
  name: 'Rank',
  components: {
    List,
    Item
  },
  props: {
    loading: Boolean,
    finished: Boolean,
    onLoad: Function,
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props){
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

    watch(() => props.loading, (next) => {
      state.loading = next
    })

    return {
      state,
      handleBookClick,
    }
  }
}

</script>
