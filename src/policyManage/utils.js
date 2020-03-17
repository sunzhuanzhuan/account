/**
 * Created by lzb on 2020-03-10.
 */
import moment from 'moment';

/**
 * 处理moment 或者 [moment,...] 为 'YYYY-MM-DD HH:mm:ss'
 */
export function moment2dateStr(datetime) {
  if (!datetime) return datetime;
  if (Array.isArray(datetime)) {
    return datetime.map(m => {
      return moment2dateStr(m);
    });
  }
  if (moment(datetime).isValid()) {
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
  }
  return datetime;
}
/**
 * 处理批量查询
 */
export function batchText2Array(batchText, notNumber) {
  // /\s+|,|，/g
  if (!batchText) return batchText;
  if (typeof batchText === 'string') {
    let filterFn;
    if (notNumber) {
      filterFn = Boolean
    } else {
      filterFn = (id) => /^\d+$/.test(id)
    }
    return batchText.trim().split(/\s+/g).filter(filterFn)
  }
  return batchText;
}
/**
 * 时间展示态
 */
export const dateFormat = (date, format = "YYYY-MM-DD HH:mm:ss") => {
  if(!date || date === '1970-01-01 08:00:00'){
    return  ''
  }
  return moment(date).format(format)
}
