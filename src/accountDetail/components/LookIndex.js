import React, { Component } from 'react'
import { Popover } from 'antd';
class LookIndex extends Component {
  state = {}
  render() {
    return (
      <Popover trigger="hover" overlayStyle={{ width: 150 }} content={
        <div >
          <a>点击进入主页</a>
          <div style={{ margin: '10px auto', width: 105, height: 105 }}>
            <img width='105' height='105' src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          </div>
          <div>打开抖音扫一扫，立即查看账号主页</div>
        </div>
      } >
        <div style={{ marginLeft: 20, color: '#b0b0b0' }}>查看主页</div>
      </Popover>
    );
  }
}

export default LookIndex;
