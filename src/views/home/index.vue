<template>
  <div>
    <div class="search-field">
      <CellGroup>
        <Search
          v-model="state.searchTxt"
          input-align="center"
          @search="onSearch"
          placeholder="搜索图书关键字"
        />
      </CellGroup>
    </div>
    <div>
      <Tabs v-model="state.activeTab" @change="handleTabChange" class="inline-tabs">
        <Tab name='recommend' title="新书推荐">1</Tab>
        <Tab name='rank' title="借阅排行">2</Tab>
      </Tabs>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { CellGroup, Search, Tabs, Tab } from 'vant'

export default {
  name: 'home',
  components: {
    CellGroup,
    Search,
    Tabs,
    Tab
  },
  setup (props){
    const router = useRouter()

    const state = reactive({
      searchTxt: '',
      activeTab: 'recommend'
    })

    const onSearch = (txt) => {
      router.push({
        path: '/result',
        query: { search: txt }
      })
    }

    const handleTabChange = (active) => {
      console.log('active', active)
    }

    return {
      state,
      onSearch,
      handleTabChange
    }
  }
}


</script>
