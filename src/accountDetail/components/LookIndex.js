import React, { Component } from 'react'
import { PopoverFormat } from "../base/TitleAndDecide";
import { Icon } from 'antd';
class LookIndex extends Component {
  state = {}
  render() {
    const { qrCodeUrl, url, platformName } = this.props
    return (
      <PopoverFormat popoverProps={{ overlayStyle: { width: 150 } }}
        text={<div style={{ marginLeft: 10 }}><a>
          <Icon type="home" style={{ padding: '0px 3px 4px' }} />查看主页
          </a></div>}
        content={
          <div >
            <a style={{ color: ' #1990FF' }} href={url} target='_blank'>点击进入主页</a>
            <div style={{ margin: '10px auto', width: 105, height: 105 }}>
              <img width='105' height='105' src={qrCodeUrl} />
            </div>
            <div>打开{platformName}扫一扫，立即查看账号主页</div>
          </div>
        } />
    );
  }
}

export default LookIndex;
