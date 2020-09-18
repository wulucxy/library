<template>
  <div class='flex flex-vertical-align rank-item'>
    <div class="rank-index" :class="rankClass">{{ randIndex }}.</div>
    <BookInfoCell
      :clickable=false
      :book="book"
      :handleItemClick="handleItemClick"
      :handleFav="handleFav"
      class="f1"
    />
    <div class="rank-count">{{ book.count }}</div>
  </div>
</template>
<script>
  import { computed } from 'vue'
  import cx from 'classnames'

  import { formatDateTime, leadingZero } from '@/utils'
  import { BookInfoCell } from '@/components'
  export default {
    name: 'RankItem',
    components: {
      BookInfoCell
    },
    props: {
      book: {
        type: Object,
        default: () => ({})
      },
      handleItemClick: Function,
      handleFav: Function,
      index: Number
    },
    setup(props){
      const randIndex = computed(() => leadingZero(props.index + 1))
      const rankClass = cx({
        gold: props.index === 0,
        silver: props.index === 1,
        bronze: props.index === 2,
      })
      return {
        formatDateTime,
        randIndex,
        rankClass
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '@/assets/style/function';
  .rank-item{
    padding: 0 rem(24) 0 rem(16);
    background-color: #fff;
    &:active{
      background-color: #f2f3f5;
      .book-cell{
        background-color: #f2f3f5;
      }
    }
    .rank-index{
      font-weight: bold;
      font-style: italic;
      font-size: rem(18);
    }
    .rank-count{
      margin-left: 10px;
      font-size: rem(20);
      font-weight: bold;
      font-style: italic;
      color: #eb4863;
    }
  }
</style>
