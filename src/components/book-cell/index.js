import { Image, Icon } from 'vant'
import cx from 'classnames'
import { noop } from '@/utils'

import './style.scss'

const BookCell = (props) => {
  const { handleClick = noop, updateBookStatus = noop, clickable, isLike } = props

  const handleCellClick = (event) => {
    // 如果点击的是收藏
    if(event.target.closest('.fav')) {
      // 收藏
      console.log('收藏')
      // todo: 统一更新上层 book 列表
      // updateBookStatus(book)
    } else {
      handleClick(props.book, event)
    }
    event.preventDefault()
  }

  const classNames = cx('flex book-cell', {
    cell_clickable: !!clickable
  })

  const iconClass = cx('vm f16', {
    active: !!isLike
  })

  return (
    <div class={classNames} onClick={handleCellClick}>
      <Image style={{
        width: "20vw",
        height: "28vw"
      }} fit='contain' lazy-load />
      <div class='f1 media-body flex flex-column'>
        <div class='media-content'>
          <h4 class='ellipsis'>中华人民共和国民法的典历史</h4>
          <div class='author'>作者 &nbsp; 著</div>
          <div class='media-txt'>2020年7月 &nbsp;法律出版色</div>
        </div>
        <div class='flex media-footer'>
          <div class='fav'>
            <Icon name='like-o' class={iconClass} />
            <span class='ml-6 vm'>收藏</span>
          </div>
        </div>
      </div>
    </div>
  )
}

BookCell.props = {
 book: {
   type: Object,
   default: () => ({})
 },
 handleClick: Function,
 updateBookStatus: Function,
 clickable: {
   type: Boolean,
   default: false,
 },
 isLike: {
   type: Boolean,
   default: false,
 }
}

export default BookCell
