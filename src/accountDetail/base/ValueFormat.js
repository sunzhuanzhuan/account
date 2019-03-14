import React from "react"
const getFormatValue = (value) => {
  let unit = ""
  let valueTransform = value || 0
  if (valueTransform) {
    if (value > 10000) {
      unit = "万"
      valueTransform = value / 10000
    }
    if (value > 10000 * 10000) {
      unit = "亿"
      valueTransform = value / (10000 * 10000)
    }
    valueTransform = valueTransform.toFixed((valueTransform < 10 && unit == "万") ? 1 : 0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    if ((valueTransform.split(".")[1]) == 0) {
      valueTransform = valueTransform.split(".")[0]
    }
  }
  return { value: valueTransform || 0, unit: unit || "" }
}
const ValueFormat = ({ value, valueClass, unitClass }) => {
  const valueObj = value ? getFormatValue(value) : {}
  return <div style={{
    display: "flex",
    alignItems: "baseline",
  }} >
    <div className={valueClass}>{valueObj.value}</div>
    <div className={unitClass}>{valueObj.unit}</div>
  </div>
}

export default ValueFormat
