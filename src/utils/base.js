import url from 'url';
import { format, parseISO, isDate } from 'date-fns';


export const addSearchParam = function(link, param = [], value = []) {
  if(typeof param === 'string') {
    param = [param]
  }
  if(['string', 'number'].includes(typeof value)) {
    value = [value]
  }
  if(param.length !== value.length) {
    console.error('参数必须一致')
    return
  }
  let newSearch = []
  param.forEach((p, i) => {
    let _param = encodeURIComponent(p);
    _param += (value[i] ? '=' + encodeURIComponent(value[i]) : '');
    newSearch.push(_param);
  })

  var a = url.parse(link)
  a.search = (a.search || '') + (a.search ? "&" : '') + newSearch.join('&');
  return url.format(a)
}

export const noop = () => {}

// 内部接口
export const isApi = url => /^\/api/.test(url)

export const isDingding = url => /^\/dd/.test(url)

// 日期格式化
export const formatDateTime = (datetime, formatter = 'yyyy-MM-dd HH:mm:ss') => {
  const input = isDate(datetime) ? datetime : parseISO(datetime);
  return format(input, formatter);
};