<template>
  <BookCell
    :book="book"
    :clickable="true"
    class="flex-vertical-align"
    :handleClick="handleItemClick"
  >
    <template v-slot:desc="slotProps">
      <h4 class='ellipsis'>{{ slotProps.book.name }}</h4>
      <div class='ellipsis'>借书日期：{{ formatDate(slotProps.book.borrowTime) }}</div>
      <div class='ellipsis'>应还书日期：{{ formatReturnDay(slotProps.book.borrowTime) }}</div>
    </template>
  </BookCell>
</template>
<script>
  import { useRouter } from 'vue-router'
  import { addDays } from 'date-fns'

  import { formatDate } from '@/utils'
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
      const router = useRouter()

      const handleItemClick = (book) => {
        router.push({
          path: '/detail',
          query: { id: book.id }
        })
      }

      const formatReturnDay = (time) => {
        const returnDay = addDays(new Date(time), 30)
        return formatDate(returnDay)
      }

      return {
        formatDate,
        formatReturnDay,
        handleItemClick
      }
    }
  }
</script>
