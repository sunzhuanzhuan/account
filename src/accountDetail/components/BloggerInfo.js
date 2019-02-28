import React, { Component } from 'react'
import { Popover, Icon } from 'antd';
class LookIndex extends Component {
  state = {}
  render() {

    const data = [
      { sex: '男', age: "21", address: "北京" },
      { isfood: '男', cai: "zdasd" },
      { child: 2 }]
    return (
      <Popover content={
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <div >
            <div>性别：男</div>
            <div>性别：男</div>
            <div>性别：男</div>
          </div>
          <div style={{ margin: '0px 20px' }}>
            <div>性别：男</div>
            <div>性别：男</div>
            <div>性别：男</div>
          </div>
          <div >
            <div>性别：男</div>
            <div>性别：男</div>
            <div>性别：男</div>
          </div>
        </div>} trigger="hover">
        <div style={{ marginLeft: 20, color: '#b0b0b0' }}><Icon type='user' />查看博主信息</div>
      </Popover>
    );
  }
}

export default LookIndex;
