import { Image } from 'vant'
import cx from 'classnames'
import { noop } from '@/utils'

import './style.scss'

const BookCell = (props, ctx) => {
  const { handleClick = noop, handleFav = noop, clickable } = props
  const handleCellClick = (event) => {
    // 如果点击的是收藏
    if(event.target.closest('.fav')) {
      // 统一更新上层 book 列表
      handleFav(props.book)
    } else {
      handleClick(props.book, event)
    }
  }

  const classNames = cx('flex book-cell', {
    cell_clickable: !!clickable
  })

  return (
    <section class={classNames} onClick={handleCellClick}>
      <Image style={{
        width: "20vw",
        height: "28vw"
      }} fit='contain' src={props.book.picturePath} />
      <div class='f1 media-body flex flex-column'>
        <div class='media-content'>
          {ctx.slots.desc({ book: props.book })}
        </div>
        <div class='flex media-footer'>
          {ctx.slots.footer && ctx.slots.footer({ book: props.book })}
        </div>
      </div>
    </section>
  )
}

BookCell.props = {
 book: {
   type: Object,
   default: () => ({})
 },
 handleClick: Function,
 handleFav: Function,
 updateBookStatus: Function,
 clickable: {
   type: Boolean,
   default: false,
 }
}

export default BookCell
