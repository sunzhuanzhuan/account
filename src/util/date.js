/**
 * Created by lzb on 2020-04-28.
 */
/**
 * 时间展示态
 */
export const dateDisplay = (date, len = 16) => {
  if(date === '1970-01-01 08:00:00'){
    return  ''
  }
  return date ? date.slice(0, len) : ''
}
