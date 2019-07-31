import numeral from "numeral";
const getSegmentByFloat = (value) => {
  if (value) {
    if (value >= 0.9) return '非常好'
    else if (value < 0.9 && value >= 0.6) return '好'
    else return '一般'
  } else {
    return '-'
  }
}
//大于24小时，显示天
//小于24小时大于1小时，显示小时
//小于1小时，显示分钟
const getTime = (value) => {
  const min = value / 60
  const hour = value / 60 / 60
  const day = value / 60 / 60 / 24
  if (value < 60) {
    return numeral(value).format('0') + '秒'
  }
  else if (hour < 1) {
    return numeral(min).format('0.0') + '分钟'
  }
  else if (day < 1) {
    return numeral(hour).format('0.0') + '小时'
  }
  else if (day > 1 || day == 1) {
    return numeral(day).format('0.0') + '天'
  }
}

export default {
  getSegmentByFloat,
  getTime
}
