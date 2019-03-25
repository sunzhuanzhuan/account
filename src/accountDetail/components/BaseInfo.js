import React, { Component } from 'react'
import { Avatar } from "antd";
import './BaseInfo.less'
import { platformView } from "../../accountManage/constants/platform";
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
            <Avatar size={60} src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg" />
          </div>
          <div className='detail'>
            <div className='account-name'>{'snsName'}</div>
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
