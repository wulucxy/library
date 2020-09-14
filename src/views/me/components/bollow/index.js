import { Empty } from 'vant'
import BollowItem from './item'

const Bollow = (props) => {
  const { books } = props
  if(books.length === 0)
    return (
      <Empty description="暂无借阅记录" />
    )
  return (
    <div>
      { books.map(book => {
        return (
          <div key={book.id}>
            <BollowItem book={book} />
          </div>
        )
      }) }
    </div>
  )
}

Bollow.props = {
 books: {
   type: Array,
   default: () => ([])
 },
}

export default Bollow
