
const getSegmentByFloat = (value) => {
  switch (value) {
    case value >= 0.9:
      return '非常好'
    case value < 0.9 && value >= 0.6:
      return '好'
    default:
      return '一般'
  }
}

export default {
  getSegmentByFloat
}
