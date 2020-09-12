<template>
  <BookCell :clickable="true">
    <template v-slot:desc="slotProps">
      <h4 class='ellipsis'>中华人民共和国民法的典历史</h4>
      {{ slotProps }}
    </template>
    <template v-slot:footer="slotProps">
      {{ slotProps }}
    </template>
  </BookCell>
</template>
<script>
  import { BookCell } from '@/components'
  export default {
    name: 'BollowItem',
    components: {
      BookCell
    },
    props: {
      book: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props){

    }
  }
</script>
