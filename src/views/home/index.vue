<template>
  <div class="page home-page">
    <div class="search-field">
      <CellGroup>
        <Search
          input-align="center"
          @focus="onFocus"
          placeholder="搜索图书关键字"
        />
      </CellGroup>
    </div>
    <div class='card-large'>
      <Button type='primary' size="large" class='primary-btn primary-btn-shadow btn-1'>轻&nbsp;松&nbsp;借&nbsp;阅&nbsp;扫&nbsp;码&nbsp;自&nbsp;助</Button>
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
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CellGroup, Search, Tabs, Tab, Button } from 'vant'

import { axios } from '@/utils'
const CONST = require('@/utils/const')

export default {
  name: 'Home',
  components: {
    Button,
    CellGroup,
    Search,
    Tabs,
    Tab
  },
  setup (){
    const router = useRouter()

    const state = reactive({
      activeTab: 'recommend',
      recommend: {
        loading: false,
        finished: false,
      },
      rank: {
        loading: false,
        finished: false,
      },
    })

    const onFocus = () => {
      router.push({
        path: '/search',
      })
    }

    const handleTabChange = (active) => {
      console.log('active', active)
    }

    onMounted(() => {
      axios.get('/api/recommend').then(res => {

      })
    })

    return {
      state,
      onFocus,
      handleTabChange
    }
  }
}


</script>
<style scoped>
  .card-large{
    margin: 8px 0;
    padding: 7.5% 11.3%;
    background-color: #fff;
  }
  .btn-1{
    height: 44px;
    border-radius: 22px;
  }
</style>
