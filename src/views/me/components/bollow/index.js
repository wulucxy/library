import { Empty } from 'vant'
import BollowItem from './item'

const Bollow = (props) => {
  const { bookList } = props
  return (
    <BollowItem />
  )
  // if(bookList.length === 0)
  //   return (
  //     <Empty description="暂无借阅记录" />
  //   )
  return (
    <div>
      { bookList.map(book => {
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
 bookList: {
   type: Array,
   default: () => ([])
 },
}

export default Bollow
