<template>
  <div>
    <div class="search-result">
      测试结果页
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CellGroup, Search } from 'vant'

export default {
  name: 'Result',
  components: {
    CellGroup,
    Search,
  },
  setup (props){
    const route = useRoute()
    console.log('route', route.query)
    const state = reactive({
      searchTxt: ''
    })

    const onSearch = (txt) => {
      console.log('txt', txt)
    }

    return {
      state,
      onSearch
    }
  }
}


</script>
