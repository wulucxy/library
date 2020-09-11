<template>
  <List
    v-model="state.loading"
    :finished="state.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    
  </List>
</template>
<script>
import { reactive } from 'vue'
import { List } from 'vant'

export default {
  name: 'Recommend',
  components: {
    List
  },
  setup (props){
    const state = reactive({
      loading: props.loading,
    })

    return {
      state,
    }
  }
}


</script>

