import React from 'react'
import { Icon } from 'antd';
const UpDownPercentage = ({ type, percent, isBackColor = false }) => {
  const isBackColorProps = isBackColor ? {
    background: '#FF4848',
    color: '#fff',
    fontSize: 12,
  
  } : {}
  return <span style={{ fontSize: 12, width: 50,  padding:'0px 4px', ...isBackColorProps }}>
    <Icon type={type == 'up' ? 'caret-up' : 'caret-down'} style={{marginRight:4, color: isBackColor?"#fff":type == 'up' ? '#fe0000' : '#0baf67' }} />{percent}%
  </span>
}

export default UpDownPercentage
