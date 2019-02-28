import React, { Component } from 'react'
import LookIndex from "./LookIndex";
import BloggerInfo from "./BloggerInfo";

import "./HeadInfo.less"
import { Avatar, Button } from 'antd';

class HeadInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="head-info">
        <div className='head-avatar'>
          <div className="avatar-img">
            <Avatar size={100} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          </div>
          <div className="avatar-mark">抖音排行第一</div>
        </div>
        <div className="info-right-box">
          <div className='head-box'>
            <div className='account-info' >
              <div className='account-name'>微微一笑很倾城</div>
              <LookIndex />
              <BloggerInfo />
            </div>
            <div className='account-code'>抖音号：123</div>
          </div>
          <div className='info-bottom-three'>
            <div className='base-info'>
              <OneLine title='账号标签' content={<div>
                <FatLable color='#fef0ef' text='胖标签' />
              </div>} />
              <OneLine title='功能标签' content={<div>
                <FatLable color='#baf4e6' text='直播' />
              </div>} />
              <OneLine title='受众信息' content={<div>sdasd</div>} />
              <OneLine title='简介' content={<div>asdas</div>} />
            </div>
            <div className='type-info'>
              <div className='type-info-row' >
                <OneType title="内容分类" content='美妆' color='#ff4d4b' />
                <OneType title="接单数" content='50单' />
                <OneType title="响应时间" content='美妆' last='30s' />
              </div>
              <div className='type-info-row'>
                <OneType title="历史服务最多分类" content='美妆' />
                <OneType title="接单率" content='极好' last='30%' />
                <OneType title="平均订单完结周期" content='1周' />
              </div>
            </div>
            <div className='release-info'>
              <div className='release-info-box'>
                <OneRelease title='发布' content='￥1231' last="asda/asdasd" />
                <OneRelease title='原创+发布' content='￥1231' last="asda/asdasd" />
              </div>
              <Button style={{ width: '100%', marginTop: 30 }}>加入选号车</Button>
              <div style={{ textAlign: "right", marginTop: 8 }}>收藏（100收藏）</div>
            </div>


          </div>
        </div>
      </div>
    );
  }
}
const OneLine = ({ title, content, last }) => {
  return <div className='base-info-flex'>
    <div className='title'>{title}：</div>
    <div >{content}</div>
    <div>{last}</div>
  </div>
}
const OneType = ({ title, content, last, color }) => {
  return <div className='type-info-flex'>
    <div className='title'>{title}</div>
    <div className='content' style={{ color: color }}>{content}</div>
    <div className='last'>{last}</div>
  </div>
}
const OneRelease = ({ title, content, last }) => {
  return <div className='release-info-three'>
    <div className='title'>{title}</div>
    <div className='content'>{content}</div>
    <div className='last'>{last}</div>
  </div>
}
const FatLable = ({ color, text }) => {
  return <div className='fat-lable' style={{ background: color }}>{text}</div>
}
export default HeadInfo;
