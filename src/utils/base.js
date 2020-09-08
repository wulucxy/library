import url from 'url'

export const addSearchParam = function(link, param, value) {
  param = encodeURIComponent(param);
  var a = url.parse(link)
  param += (value ? '=' + encodeURIComponent(value) : '');
  a.search = (a.search || '') + (a.search ? "&" : '') + param;
  return url.format(a)
}
