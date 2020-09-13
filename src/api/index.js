import { axios } from '@/utils';

// 收藏图书
export const favBook = (params) => {
  return axios({
    url: '/api/books/favorite',
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

// 查询图书
export const queryBookInfo = (bookId) => {
  return axios({
    url: `/api/books/${bookId}`,
    method: 'get'
  });
}
