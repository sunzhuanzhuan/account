import React, { Component } from 'react'
import { Avatar } from "antd";
import './BaseInfo.less'
class BaseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='floating-base-info'>
        <div className='floating-base-info-flex'>
          <div className='img'>
            <Avatar size={60} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          </div>
          <div className='detail'>
            <div className='account-name'>微微一笑很倾城微微一笑很倾城微微一笑很倾城</div>
            <div className='fans'>粉丝数：24234</div>
          </div>
          <div className='big-circle'>
            美妆第一名
          </div>
        </div>
      </div>
    );
  }
}

export default BaseInfo;
