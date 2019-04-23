import numeral from "numeral";
export const formatW = (value) => {
  if (Math.abs(value) >= 10000) {
    value = numeral(value / 10000).format('0.0') + 'w'
  } else {
    value = numeral(value || 0).format('0.0')
  }

  return value
}
