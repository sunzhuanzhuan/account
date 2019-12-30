import React from 'react'
import { Icon, Popover } from 'antd';
const TitleAndDecide = ({ content, text, type = 'info-circle' }) => {
  return <div style={{ fontSize: 14, padding: '10px' }}>
    {text}{content ? <Popover content={content} trigger="hover" getPopupContainer={() => document.querySelector('.account-view-detail')}>
      <Icon type={type} theme="outlined" />
    </Popover> : ''}
  </div>
}

export const PopoverFormat = ({ content, text, popoverProps }) => {
  return <Popover {...popoverProps} content={content} trigger="hover" getPopupContainer={() => document.querySelector('.account-view-detail')}>
    {text}
  </Popover>
}

export default TitleAndDecide
