import React from 'react'
import { Icon } from 'antd';
import numeral from 'numeral';

const UpDownPercentage = ({ percent, isBackColor = false }) => {
  const isBackColorProps = isBackColor ? {
    background: percent > 0 ? '#FF4848' : '#0CAD67',
    color: '#fff',
    fontSize: 12,

  } : {}
  return <span style={{ fontSize: 12, width: isBackColor ? 64 : 60, padding: isBackColor ? '0px 4px' : '', ...isBackColorProps }}>
    <Icon type={percent > 0 ? 'caret-up' : 'caret-down'}
      style={{
        marginRight: 4,
        color: isBackColor ? "#fff" : percent > 0 ? '#fe0000' : '#0baf67'
      }} />
    {numeral(Math.abs(percent)).format('0.0%')}
  </span>
}

export default UpDownPercentage
