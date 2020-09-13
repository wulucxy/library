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
      <!-- 已查询，有查询结果 -->
      <div v-if="searchResult.records && searchResult.records.length > 0">
        <List
          :data="searchResult.records"
          :loading="searchResult.loading"
          :finished="searchResult.finished"
          :updateBook="updateBook"
        />
      </div>
      <!-- 已查询，查询结果为空 -->
      <Empty
        v-else-if="searchResult.records && searchResult.records.length === 0"
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

import { setSearchHistory, getSearchHistory, clearSearchHistory } from '@/utils/tools'
import { searchBook, favBook } from '@/api'
import List from './components/list'
import CONST from '@/utils/const'

export default {
  name: 'SearchPage',
  components: {
    CellGroup,
    Search,
    Empty,
    Button,
    Icon,
    List,
  },
  setup (props){
    const searchRef = ref(null)
    const router = useRouter()

    const searchHistory = getSearchHistory()
    const state = reactive({
      searchTxt: '',
      searchHistory,
    })

    const searchResult = reactive({
      loading: false,
      finished: false,
      records: null,
      total: 0,
      pages: 0,
      current: 1
    })

    const focusInput = () => {
      searchRef.value.$el.querySelector('[type=search]').focus()
    }

    // 更新搜索历史记录
    const setHistory = txt => {
      setSearchHistory(txt)
      const searchHistory = getSearchHistory()
      state.searchHistory = searchHistory
    }

    const handleSearch = (txt, options = {}) => {
      if(typeof options.beforeCallback === 'function') {
        options.beforeCallback(txt)
      }
      Object.assign(searchResult, {
        loading: true
      })
      // 查询列表
      searchBook({name: txt}).then(res => {
        Object.assign(searchResult, res, {
          loading: false,
          finished: res.pages < CONST.pageSize,
        })
      })
    }

    const onSearch = (txt) => {
      return handleSearch(txt, { beforeCallback: setHistory })
    }

    const handleDelete = () => {
      clearSearchHistory()
      state.searchHistory = null
    }

    // 点击搜索历史条目
    const handleHistoryItem = (item) => {
      state.searchTxt = item
      focusInput()
      handleSearch(item)
    }

    const handleItemClick = (book, event) => {
      router.push({
        path: '/detail',
        query: { id: book.id }
      })
    }

    // 收藏图书
    const updateBook = (book) => {
      const nextRecords = searchResult.records.map(d => {
        if(d.id === book.id) {
          return {...d, isFav: !book.isFav}
        }
        return d
      })
      Object.assign(searchResult, {
        records: nextRecords
      })
      // 收藏图书
      favBook(book.id, !book.isFav)
    }

    onMounted(() => {
      focusInput()
    })

    return {
      state,
      searchResult,
      onSearch,
      searchHistory,
      handleDelete,
      handleItemClick,
      updateBook,
      handleHistoryItem,
      searchRef
    }
  }
}

</script>
