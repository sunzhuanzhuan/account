import React, { Component } from 'react'
import { PopoverFormat } from "../base/TitleAndDecide";
class LookIndex extends Component {
  state = {}
  render() {
    return (
      <PopoverFormat popoverProps={{ overlayStyle: { width: 150 } }}
        text={<div style={{ marginLeft: 20, }}><a style={{ color: ' #1990FF' }}>查看主页</a></div>}
        content={
          <div >
            <a style={{ color: ' #1990FF' }}>点击进入主页</a>
            <div style={{ margin: '10px auto', width: 105, height: 105 }}>
              <img width='105' height='105' src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg" />
            </div>
            <div>打开抖音扫一扫，立即查看账号主页</div>
          </div>
        } />
    );
  }
}

export default LookIndex;
