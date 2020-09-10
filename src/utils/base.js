import url from 'url'

export const addSearchParam = function(link, param, value) {
  param = encodeURIComponent(param);
  var a = url.parse(link)
  param += (value ? '=' + encodeURIComponent(value) : '');
  a.search = (a.search || '') + (a.search ? "&" : '') + param;
  return url.format(a)
}

// 内部接口
export const isApi = url => /^\/api/.test(url)

export const isDingding = url => /^\/dd/.test(url)