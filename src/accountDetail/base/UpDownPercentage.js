import React from 'react'
import { Icon } from 'antd';
import numeral from 'numeral';
import { PopoverFormat } from "./TitleAndDecide";
const UpDownPercentage = ({ percent, isBackColor = false, typeContent }) => {
  const isBackColorProps = isBackColor ? {
    background: percent == 0 ? '#4A4A4A' : percent > 0 ? '#FF4848' : '#0CAD67',
    color: '#fff',
    fontSize: 12,

  } : {}

  return percent == 0 || percent > 0 || percent < 0 ?
    <PopoverFormat
      text={<div style={{ height: 18, fontSize: 12, minWidth: isBackColor ? 69 : 60, padding: isBackColor ? '0px 4px' : '', ...isBackColorProps }}>
        {percent == 0 ? <span style={{ paddingRight: 2 }}>-</span> : <Icon type={percent > 0 ? 'caret-up' : 'caret-down'}
          style={{
            marginRight: 4,
            color: isBackColor ? "#fff" : percent == 0 ? '#4A4A4A' : percent > 0 ? '#FF4848' : '#0CAD67'
          }} />}
        {numeral(Math.abs(percent)).format('0.0%')}
      </div>}
      content={`${percent == 0 ? '等' : percent > 0 ? '高' : '低'}于${typeContent}`}
    />
    : <div style={{ height: 18, marginLeft: 4 }}>-</div>
}

export default UpDownPercentage
