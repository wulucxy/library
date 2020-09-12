<template>
  <div class="page me-page">
    <div class="me-result">
      <Tabs v-model="state.activeTab" class="inline-tabs">
        <Tab name='bollow' title="我的借阅">
          <Bollow />
        </Tab>
        <Tab name='fav' title="我的收藏">2</Tab>
      </Tabs>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Tabs, Tab } from 'vant'

import { Bollow } from './components'

export default {
  name: 'Me',
  components: {
    Bollow,
    Tabs,
    Tab,
  },
  setup (props){
    const state = reactive({
      activeTab: 'bollow',
      bollowList: [],
    })

    onMounted(() => {
      // 查询借阅列表
    })

    return {
      state,
    }
  }
}


</script>
