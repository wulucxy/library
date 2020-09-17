import { Empty } from 'vant'
import BorrowItem from './item'

const Borrow = (props) => {
  const { books } = props
  if(books.length === 0)
    return (
      <Empty description="暂无借阅记录" />
    )
  return (
    <div class="content-list">
      { books.map(book => {
        return (
          <div key={book.id}>
            <BorrowItem book={book} />
          </div>
        )
      }) }
    </div>
  )
}

Borrow.props = {
 books: {
   type: Array,
   default: () => ([])
 },
}

export default Borrow
