
const getSegmentByFloat = (value) => {
  if (value >= 0.9) return '非常好'
  else if (value < 0.9 && value >= 0.6) return '好'
  else return '一般'

}

export default {
  getSegmentByFloat
}
