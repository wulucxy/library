<template>
  <BookCell
    :clickable="clickable"
    :handleClick="handleItemClick"
    :handleFav="handleFav"
    :book="book"
  >
    <template v-slot:desc="slotProps">
      <h4 class='ellipsis'>{{ slotProps.book.name }}</h4>
      <div class='author ellipsis'>{{ slotProps.book.author }}&nbsp;著</div>
      <div class='media-txt ellipsis'>{{ slotProps.book.press }}</div>
    </template>
    <template v-slot:footer="slotProps">
      <div class='fav'>
        <Icon
          :name="slotProps.book.favorite ? 'like' : 'like-o'"
          class="vm f16"
          :class="slotProps.book.favorite && 'active'"
        />
        <span class='ml-6 vm'>{{ slotProps.book.favorite ? '已收藏' : '收藏' }}</span>
      </div>
    </template>
  </BookCell>
</template>
<script>
import { Icon } from 'vant'

import BookCell from './cell'
export default {
  name: 'BookInfo',
  props: {
    handleItemClick: Function,
    handleFav: Function,
    book: Object,
    clickable: {
      type: Boolean,
      default: true
    }
  },
  components: {
    BookCell,
    Icon
  }
}
</script> 