import React from 'react'
import './HoverImg.less'

const HoverImg = ({ img }) => {
  return <div className='hover-img'>
    <div className='bottom-img'>
      {img}
    </div>
    <div className='hover-img-show'>
    </div>
  </div>
}
export default HoverImg
