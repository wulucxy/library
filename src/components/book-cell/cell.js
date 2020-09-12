import { Image } from 'vant'
import cx from 'classnames'
import { noop } from '@/utils'

import './style.scss'

const BookCell = (props, ctx) => {
  const { handleClick = noop, updateBookStatus = noop, clickable } = props
  console.log('===porps', props)
  console.log('===ctx===', ctx)
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

  return (
    <div class={classNames} onClick={handleCellClick}>
      <Image style={{
        width: "20vw",
        height: "28vw"
      }} fit='contain' lazy-load />
      <div class='f1 media-body flex flex-column'>
        <div class='media-content'>
          {ctx.slots.desc({id: 1})}
        </div>
        <div class='flex media-footer'>
          {ctx.slots.footer({id: 1})}
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
 }
}

export default BookCell
