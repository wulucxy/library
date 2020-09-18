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
      :handleItemClick="handleItemClick"
      :handleFav="handleFav"
    />
  </List>
</template>
<script>
import { reactive, watch } from 'vue'
import { List } from 'vant'

import { BookInfoCell }  from '@/components'

export default {
  name: 'Recommend',
  components: {
    List,
    BookInfoCell
  },
  props: {
    loading: Boolean,
    finished: Boolean,
    handleItemClick: Function,
    handleFav: Function,
    onLoad: Function,
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props){
    const state = reactive({
      loading: props.loading,
    })

    watch(() => props.loading, (next) => {
      state.loading = next
    })

    return {
      state,
    }
  }
}

</script>
