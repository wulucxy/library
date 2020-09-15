<template>
  <BookCell :book="book" :clickable="true" class="flex-vertical-align">
    <template v-slot:desc="slotProps">
      <h4 class='ellipsis'>{{ slotProps.book.name }}</h4>
      <div class='ellipsis'>借书日期：{{ formatDateTime(slotProps.book.borrowTime) }}</div>
      <div class='ellipsis'>应还书日期：{{ formatDateTime(slotProps.book.borrowTime) }}</div>
    </template>
  </BookCell>
</template>
<script>
  import { formatDateTime } from '@/utils'
  import { BookCell } from '@/components'
  export default {
    name: 'BorrowItem',
    components: {
      BookCell
    },
    props: {
      book: {
        type: Object,
        default: () => ({})
      }
    },
    setup(){
      return {
        formatDateTime
      }
    }
  }
</script>
