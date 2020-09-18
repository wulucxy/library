import url from 'url';
import { format, parseISO, isDate } from 'date-fns';

export const addSearchParam = function(link, param, value) {
  param = encodeURIComponent(param);
  var a = url.parse(link)
  param += (value ? '=' + encodeURIComponent(value) : '');
  a.search = (a.search || '') + (a.search ? "&" : '') + param;
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

// 小于 9 数字添加 0 前缀
export const leadingZero = (num, targetLength = 2, char = '0') => {
  const prefix = num < 0 ? '-' : '';
  const number = Math.abs(parseFloat(num));
  return prefix + String(number).padStart(targetLength, char);
};