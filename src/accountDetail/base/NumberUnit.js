import React from 'react'
import './NumberUnit.less'
const NumberUnit = (item, isGray) => {
  return (
    <div className='number-unit'>
      <div className={`number${isGray ? ' gray' : ''}`} >{item.value}</div>
      <div className={`unit${isGray ? ' gray' : ''}`} >{item.unit}</div>
    </div>
  )
}

export default NumberUnit
