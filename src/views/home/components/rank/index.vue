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
      :handleItemClick="handleItemClick"
      :handleFav="handleFav"
    />
  </List>
</template>
<script>
import { reactive, watch } from 'vue'
import { List } from 'vant'

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
    handleItemClick: Function,
    handleFav: Function,
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
