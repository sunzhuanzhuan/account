/**
 * Created by lzb on 2018/12/12.
 */
import moment from 'moment'

/**
 * 处理提交url
 * @param {Object[]} [file] - 对象数组
 * @param {string} file[].url - 文件的绝对路径
 * @param {number} [limit] - 取的数量
 * @param {string} [key] - 路径的key
 * @returns {string|*} [url] - 提交的文件地址(绝对路径)
 */
export function uploadUrl(file, key = 'url', limit = 1) {
  //  校验file类型, 不合法或没有传入则返回 undefined
  if (!Array.isArray(file)) return undefined

  if (limit === 1) {
    // 当只上传一个路径
    return file.length ? file[0][key] : ''
  } else {
    // 当上传多个路径
    let ary = file.splice(0, limit)
    return ary.map(item => item[key])
  }

}
/**
 * 处理提交 checkbox to value
 * @param {boolean | *} [value]
 * @param {array} [map]
 * @returns {*}
 */
export function checkVal(value, map = ["2", "1"]) {
  if (typeof value === "boolean") {
    return map[value / 1]
  }
  return value
}
/**
 * 处理原因显示
 * @param {string | array} reason - 传入数组或字符串原因
 * @returns {string} reason - 返回字符串原因
 */
export function handleReason(reason = '') {
  let result = ''
  if (Array.isArray(reason)) {
    result = reason.join('，')
  } else if (typeof reason === 'string') {
    result = reason.replace(/,/g, '，')
  }
  return result
}
/**
 * 时间转moment对象
 * @param {date} [date]
 * @returns {moment} moment - 返回moment对象
 */
export function date2moment(date) {
  // 判断 date 是否为一个有效值
  if (date === '1970-01-01 08:00:00') {
    return false
  }
  return date ? moment(date) : moment.invalid()
}
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
 * 创建数字区间
 * @param start
 * @param end
 * @returns {Array}
 */
export const createRange = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * 处理星期数组
 * @param weeks
 * @returns {string[]|*}
 */
export const handleWeeks = (weeks) => {
  let result = []
  if (weeks) {
    if (Array.isArray(weeks)) {
      return weeks.map(num => num.toString())
    }
    try {
      result = JSON.parse(weeks)
    } catch (e) {
      result = []
    }
  }
  return result.map(num => num.toString())
}

/**
 * 处理星期显示为中文星期数字
 * @param weeks
 * @returns {string[]|*}
 */
export const weeksToNames = (weeks) => {
  let weekSource = {
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六",
    "7": "星期日"
  }
  let _data = handleWeeks(weeks)
  return _data.map(key => weekSource[key])
}
export function initialMoment(date) {
  // 判断 date 是否为一个有效值
  if (date === '1970-01-01 08:00:00') {
    return
  }
  return date && moment(date)
}
/**
 * 时间展示态
 */
export const dateDisplay = (date, len = 16) => {
  if(date === '1970-01-01 08:00:00'){
    return  ''
  }
  return date ? date.slice(0, len) : ''
}

export const findStatusText = (status, sources, keys = ["id", 'name']) => {
  let _data = sources.find(item => item[keys[0]] === status) || {}
  return _data[keys[1]]
}


export const booleanDisplay = (status, texts = ["", "是", '否']) => {
  if(status){
    return texts[status]
  }
}

export default { uploadUrl, checkVal, handleReason, date2moment }
