import { Empty } from 'vant'
import { BookInfoCell } from '@/components'

const Favor = (props) => {
  const { books, router, handleFav } = props

  const handleItemClick = (book) => {
    router.push({
      path: '/detail',
      query: { id: book.id }
    })
  }

  if(books.length === 0)
    return (
      <Empty description="暂无收藏记录" />
    )
  return (
    <div class="content-list">
      { books.map(book => {
        return (
          <BookInfoCell
            key={book.id}
            book={book}
            handleItemClick={handleItemClick}
            handleFav={handleFav}
          />
        )
      }) }
    </div>
  )
}

Favor.props = {
 books: {
   type: Array,
   default: () => ([])
 },
 handleFav: Function,
 router: Object,
}

export default Favor
