<template>
  <div class="page search-page">
    <div class="search">
      <CellGroup>
        <Search
          v-model="state.searchTxt"
          ref="searchRef"
          autofocus
          @search="onSearch"
          placeholder="搜索图书关键字"
        />
      </CellGroup>
    </div>
    <div class="search-result" :style="{paddingTop: '16px'}">
      <!-- todo: for dev -->
      <BookCell
        :clickable="true"
        :handleClick="handleItemClick"
      />
      <!-- 已查询，有查询结果 -->
      <div v-if="state.result && state.result.length > 0">
        <BookCell
          v-for="book in state.result"
          :key="book.id"
          :book="book"
          :clickable="true"
          :handleClick="handleItemClick"
        />
      </div>
      <!-- 已查询，查询结果为空 -->
      <Empty
        v-else-if="state.result && state.result.length === 0"
        description='找不到搜索结果'
      />
      <!-- 未查询，且没有查询历史 -->
      <Empty image='search' description='请输入图书标题查询' v-else-if="!state.searchHistory" />
       <!-- 未查询，有查询历史 -->
      <div class="search-history" v-else>
        <div class="flex" :style="{padding: '0 10px', marginBottom: '10px'}">
          <div class='f1'>最近搜索</div>
          <Icon name='delete' @click="handleDelete" />
        </div>
        <div :style="{padding: '0 10px'}">
           <span v-for="(item, index) in state.searchHistory.slice(0, 6)" :key="index">
            <Button
              type='default'
              round
              @click="handleHistoryItem(item)"
              :style="{margin: '0 6px 6px 0', minWidth: '48px'}"
            >{{ item }}</Button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from 'vue'
import { CellGroup, Search, Empty, Button, Icon } from 'vant'
import { useRouter } from 'vue-router'

import { BookCell } from '@/components'
import { setSearchHistory, getSearchHistory, clearSearchHistory } from '@/utils/tools'

export default {
  name: 'SearchPage',
  components: {
    CellGroup,
    Search,
    Empty,
    Button,
    Icon,
    BookCell
  },
  setup (props){
    const searchRef = ref(null)
    const router = useRouter()

    const searchHistory = getSearchHistory()
    const state = reactive({
      searchTxt: '',
      searchHistory,
      result: null
    })

    const focusInput = () => {
      searchRef.value.$el.querySelector('[type=search]').focus()
    }

    const onSearch = (txt) => {
      setSearchHistory(txt)
      const searchHistory = getSearchHistory()
      state.searchHistory = searchHistory
      // todo: 查询列表
      // 写入 state
    }

    const updateBookStatus = (book) => {
      // 1. 乐观更新state.result 列表
      // 2. 写入数据库，如果报错，则重置
    }

    const handleDelete = () => {
      clearSearchHistory()
      state.searchHistory = null
    }

    // 点击搜索历史条目
    const handleHistoryItem = (item) => {
      state.searchTxt = item
      focusInput()
    }

    const handleItemClick = (book, event) => {
      router.push({
        path: '/detail',
      })
    }

    onMounted(() => {
      focusInput()
    })

    return {
      state,
      onSearch,
      searchHistory,
      handleDelete,
      handleItemClick,
      handleHistoryItem,
      searchRef
    }
  }
}


</script>
