<template>
  <BookCell
    :clickable="true"
    :handleClick="handleItemClick"
  >
    <template v-slot:desc="slotProps">
      <h4 class='ellipsis'>中华人民共和国民法的典历史</h4>
      <div class='author'>作者 &nbsp; 著</div>
      <div class='media-txt'>2020年7月 &nbsp;法律出版色</div>
    </template>
    <template v-slot:footer="slotProps">
      <div class='fav'>
        <Icon name='like-o' :class="iconClass" />
        <span class='ml-6 vm'>收藏</span>
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
    isLike: {
     type: Boolean,
     default: false,
   }
  },
  components: {
    BookCell,
    Icon
  },
  setup(props) {
    const iconClass = cx('vm f16', {
      active: !!props.isLike
    })

    return {
      iconClass
    }
  }
}
</script> 