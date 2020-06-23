import React, { PureComponent } from 'react'
import { Popover } from 'antd'

export class HocPopover extends PureComponent {
  render() {
    return (
      <Popover {...this.props}>
        {this.props.children}
      </Popover>
    )
  }
}

export default HocPopover
