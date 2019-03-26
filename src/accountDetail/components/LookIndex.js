import React, { Component } from 'react'
import { PopoverFormat } from "../base/TitleAndDecide";
import { Icon } from 'antd';
class LookIndex extends Component {
  state = {}
  render() {
    const { qrCodeUrl, url } = this.props
    return (
      <PopoverFormat popoverProps={{ overlayStyle: { width: 150 } }}
        text={<div style={{ marginLeft: 20, }}><a style={{ color: ' #1990FF' }}><Icon type="eye" style={{ padding: '0px 3px' }} />查看主页</a></div>}
        content={
          <div >
            <a style={{ color: ' #1990FF' }} href={url}>点击进入主页</a>
            <div style={{ margin: '10px auto', width: 105, height: 105 }}>
              <img width='105' height='105' src={qrCodeUrl} />
            </div>
            <div>打开抖音扫一扫，立即查看账号主页</div>
          </div>
        } />
    );
  }
}

export default LookIndex;
