import { axios } from '@/utils';

// 收藏图书
export const favBook = (params) => {
  return axios({
    url: '/api/books/favorite',
    method: 'post',
    data: params,
  });
}

// 借书
export const bollowBook = (params) => {
  return axios({
    url: '/api/books/bollow',
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
export const queryBollowList = () => {
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
