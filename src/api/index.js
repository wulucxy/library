import { axios } from '@/utils';

// 获取用户uid
export const getUserInfo = (params) => {
  return axios({
    url: '/dd/user/getuserinfo',
    method: 'get',
    params
  })
}

// 推荐新书
export const queryRecommendList = () => {
  return axios({
    url: '/api/books/new',
    method: 'get'
  });
}

// 收藏图书
export const favBook = (bookId, favorite) => {
  return axios({
    url: '/api/books/favorite',
    method: 'post',
    data: {
      bookId,
      favorite
    },
  });
}

// 借书
export const borrowBook = (params) => {
  return axios({
    url: '/api/books/borrow',
    method: 'post',
    data: params,
  });
}

// 搜索书籍
export const searchBook = (params) => {
  return axios({
    url: '/api/books',
    method: 'get',
    params,
  });
}

// 根据图书唯一id 获取图书详情
export const queryBookInfoByInstanceId = (instanceId) => {
  return axios({
    url: `/api/books/instances/${instanceId}`,
    method: 'get',
  });
}

// 创建图书
export const createBook = (params) => {
  return axios({
    url: '/api/books',
    method: 'post',
    data: params,
  });
}

// 购买图书
export const purchaseBook = (params) => {
  return axios({
    url: '/api/books/purchase',
    method: 'post',
    data: params,
  });
}

// 查询图书
export const queryBookInfo = (bookId) => {
  return axios({
    url: `/api/books/${bookId}`,
    method: 'get'
  });
}

// 查询我借阅的图书
export const queryBorrowList = () => {
  return axios({
    url: `/api/books/mine`,
    method: 'get'
  });
}

// 查询我收藏的图书
export const queryFavorList = () => {
  return axios({
    url: `/api/books/favorite`,
    method: 'get'
  });
}

// 查询 ISBN
export const queryISBN = (isbn) => {
  return axios({
    url: `/api/books/isbn`,
    method: 'get',
    params: { isbn }
  });
}
