<template>
  <div>
    <div class="search-field">
      <CellGroup>
        <Search
          v-model="state.searchTxt"
          input-align="center"
          @search="onSearch"
          placeholder="请输入图书名称"
        />
      </CellGroup>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { CellGroup, Search } from 'vant'

export default {
  name: 'home',
  components: {
    CellGroup,
    Search,
  },
  setup (props){
    const router = useRouter()

    const state = reactive({
      searchTxt: ''
    })

    const onSearch = (txt) => {
      router.push({
        path: '/result',
        query: { search: txt }
      })
    }

    return {
      state,
      onSearch
    }
  }
}


</script>
