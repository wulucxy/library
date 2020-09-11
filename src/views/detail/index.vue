<template>
  <div class='page detail-page'>
    <div class="book-detail">
      <BookCell />
      <div class="book-content">
        <TextCollapse title="图书简介">《中华人民共和国民法典》被称为“社会生活的百科全书”，是新中国第一部以法典命名的法律，在法律体系中居于基础性地位，etter-spacing: 0em;etter-spacing: 0em;
        </TextCollapse>
      </div>
    </div>
    <div class="action-bar">
      <Button type='default'>收藏</Button>
      <Button type='primary'>借书</Button>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CellGroup, Button } from 'vant'

import { BookCell, TextCollapse } from '@/components'

export default {
  name: 'Result',
  components: {
    CellGroup,
    TextCollapse,
    BookCell,
    Button,
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
<style lang="scss">
@import '@/assets/style/function';
.book-detail{
  margin-top: rem(8);
}
.book-content{
  margin: 0 rem(28);
}
.action-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -2px 8px #f0f1f2;
  .van-button{
    display: inline-block;
    width: 33%;
    height: 32px;
    border-radius: 16px;
    margin-right: 8.8%;
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>
