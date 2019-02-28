import React from 'react'
import { Icon, Popover } from 'antd';
const TitleAndDecide = ({ content, text }) => {
  return <div style={{ fontSize: 14, padding: '10px' }}>
    {text}{content ? <Popover content={content} trigger="hover" getPopupContainer={() => document.querySelector('.Js-account-view-detail-Id')}>
      <Icon type="info-circle" theme="outlined" />
    </Popover> : ''}
  </div>
}


export default TitleAndDecide
