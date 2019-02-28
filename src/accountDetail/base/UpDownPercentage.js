import React from 'react'
import { Icon } from 'antd';
const UpDownPercentage = ({ type, percent }) => {
  return <div style={{ fontSize: 12, width: 50 }}>
    <Icon type={type == 'up' ? 'caret-up' : 'caret-down'} style={{ color: type == 'up' ? '#fe0000' : '#0baf67' }} />{percent}%
  </div>
}

export default UpDownPercentage
