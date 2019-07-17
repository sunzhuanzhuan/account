export const g2Tooltip = {
  backgroundColor: '#181818',
  opacity: 0.9,
  color: '#fff',
  fontSize: 14
}
export const legendPosition = {
  position: 'top-right',
  offsetX: 0,
  offsetY: -10
}
export const getMinNumber = (key, data = []) => {
  const min = Math.min.apply(Math, data.map(function (item) { return item[key] }))
  return min - min / 3000
}
export const getMaxNumber = (key, data = []) => {
  return Math.max.apply(Math, data.map(function (item) { return item[key] + 3000 }))
}
export const blueColor = '#39a0ff'
export const greenColor = '#29c056'
export const pinkColor = '#FF5D7F'

