<template>
  <BookCell
    :clickable="true"
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
          :name="slotProps.book.isFav ? 'like' : 'like-o'"
          class="vm f16"
          :class="slotProps.book.isFav && 'active'"
        />
        <span class='ml-6 vm'>{{ slotProps.book.isFav ? '已收藏' : '收藏' }}</span>
      </div>
    </template>
  </BookCell>
</template>
<script>
import cx from 'classnames'
import { Icon } from 'vant'

import BookCell from './cell'
export default {
  name: 'BookInfo',
  props: {
    handleItemClick: Function,
    handleFav: Function,
    book: Object,
  },
  components: {
    BookCell,
    Icon
  },
  setup(props) {
    const { updateState } = props
    const iconClass = cx('vm f16', {
      active: !!props.book.isFav
    })

    return {
      iconClass,
    }
  }
}
</script> 