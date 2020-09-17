<template>
  <div class='flex flex-vertical-align'>
    <div class="rank">{{ index + 1 }}</div>
    <BookCell :book="book" :clickable="true" class="flex-vertical-align">
      <template v-slot:desc="slotProps">
        <h4 class='ellipsis'>{{ slotProps.book.name }}</h4>
      </template>
    </BookCell>
  </div>
</template>
<script>
  import { formatDateTime } from '@/utils'
  import { BookCell } from '@/components'
  export default {
    name: 'RankItem',
    components: {
      BookCell
    },
    props: {
      book: {
        type: Object,
        default: () => ({})
      },
      index: Number
    },
    setup(){
      return {
        formatDateTime
      }
    }
  }
</script>
