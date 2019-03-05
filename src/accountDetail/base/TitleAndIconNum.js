import React, { Component } from 'react'
import { Icon } from 'antd';
import "./TitleAndIconNum.less"
class TitleAndIconNum extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className='title'>
          小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
         </div>
        <div className='number'>
          <Icon type="heart" />12112
          <Icon type="heart" />12112
          <Icon type="heart" />12112
        </div>
      </div>
    );
  }
}

export default TitleAndIconNum;
