import React, { Component } from 'react'
import LookIndex from "./LookIndex";
import BloggerInfo from "./BloggerInfo";
import { PopoverFormat } from "../base/TitleAndDecide";
import "./HeadInfo.less"
import { Avatar, Button, Icon } from 'antd';

class HeadInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { setShowModal, isCar } = this.props
    return (
      <div className="head-info">
        <div className='head-avatar'>
          <div className="avatar-img">
            <Avatar size={60} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551975300229&di=91b436f0a816ac37d732b6fb41ae3a8e&imgtype=0&src=http%3A%2F%2Fwww.jf258.com%2Fuploads%2F2013-07-16%2F055639666.jpg" />
          </div>
          <PopoverFormat text={<div className="avatar-mark">抖音排行第一</div>} content='抖音排行第一' />
        </div>
        <div className="info-right-box">
          <div className='head-box'>
            <div className='account-info' >
              <div className='account-name'>微微一笑很倾城微微一笑很倾城微微一笑很倾城</div><PopoverFormat text='等级' content='抖音音乐人' />
              <LookIndex />
              <a style={{ marginLeft: 20, color: ' #1990FF' }} onClick={() => setShowModal(true, { content: <BloggerInfo />, title: '博主信息', width: 700 })}>
                <Icon type='user' />查看博主信息</a>
            </div>
            <div className='account-code'>抖音号：123</div>
          </div>
          <div className='info-bottom-three'>
            <div className='base-info'>
              <OneLine title='账号标签' content={
                <FatLable backColor='#F3F8FD' color='#78A3CE' list={['胖标签', '胖标签']} />
              } />
              <OneLine title='功能标签' content={
                <FatLable backColor='#FFEBEA' color='#FE6A60' list={['直播', '直播', '直播']} />
              } />
              <OneLine title='受众信息' content={<div className='content-font'>sdasd</div>} />
              <OneLine title='简介' content={<div className='content-font'>asdas</div>} />
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
              <div className='release-info-box'>
                <OneRelease title='发布' content='￥1231' last="asda/asdasd" />
                <OneRelease title='原创+发布' content='￥1231' last="asda/asdasd" />
              </div>
              <div style={{ textAlign: 'center' }}>
                {isCar ? <Button style={{ width: '80%', marginTop: 20 }} type='primary'>加入选号车</Button> :
                  <Button style={{ width: '80%', marginTop: 20, background: '#999', color: '#fff' }} >移除选号车</Button>}
              </div>
              {/* <div style={{ textAlign: "center", marginTop: 12 }}>加入收藏<span className='collect'>（100人已收藏）</span></div> */}
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
    <div className='second-row-flex'>
      <div className='content' style={{ color: color }}>{content}</div>
      <div className='last'>{last}</div>
    </div>
  </div>
}
const OneRelease = ({ title, content, last }) => {
  return <div className='release-info-three'>
    <div className='title'>{title}</div>
    <div className='two-line-flex'>
      <div className='content'>{content}</div>
      <PopoverFormat text={<div className='last'>{last}</div>} content='平均每千粉丝单价' />
    </div>
  </div>
}
const FatLable = ({ backColor, color, list }) => {
  return <div className='fat-lable-flex'>
    {list.map((one, index) => <div
      className='fat-lable'
      style={{ marginLeft: index == 0 ? 0 : '', background: backColor, color: color }}
      key={index}>{one}</div>)}
  </div>
}
export default HeadInfo;
