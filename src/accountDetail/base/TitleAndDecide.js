import React from 'react'
import { Icon, Popover } from 'antd';
const TitleAndDecide = ({ content, text }) => {
  return <div style={{ fontSize: 14, padding: '10px' }}>
    {text}{content ? <Popover content={content} trigger="hover" getPopupContainer={() => document.querySelector('.account-view-detail')}>
      <Icon type="info-circle" theme="outlined" />
    </Popover> : ''}
  </div>
}

export const PopoverFormat = ({ content, text, popoverProps }) => {
  return <Popover {...popoverProps} content={content} trigger="hover" getPopupContainer={() => document.querySelector('.account-view-detail')}>
    {text}
  </Popover>
}

export default TitleAndDecide
