import localStorage from './localStorage'

export const searchHistoryKey = 'searchHistory'

export const getSearchHistory = function () {
  return localStorage.get(searchHistoryKey) || null
}
export const setSearchHistory = function (txt) {
  if(txt === '') return
  if(!getSearchHistory()) {
    localStorage.set(searchHistoryKey, [txt])
  } else {
    let txts = localStorage.get(searchHistoryKey)
    // 去重
    let uniqueTxts = [...new Set([txt, ...txts])]
    localStorage.set(searchHistoryKey, uniqueTxts)
  }
}
export const clearSearchHistory = function () {
  localStorage.del(searchHistoryKey)
}

