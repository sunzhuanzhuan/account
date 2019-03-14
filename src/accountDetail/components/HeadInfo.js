import React, { Component } from 'react'
import LookIndex from "./LookIndex";
import { PopoverFormat } from "../base/TitleAndDecide";
import "./HeadInfo.less"
import { Avatar, Button, Icon } from 'antd';
import MultiClamp from 'react-multi-clamp';
import { platformView } from "../../accountManage/constants/platform";
import nzhcn from "nzh/cn";//数字转汉字  1->一
import FieldMap from "../constants/FieldMap";
import numeral from "numeral";
class HeadInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { setShowModal, isCar, baseInfo = {} } = this.props
    const { base = {}, feature = {}, skuList = [] } = baseInfo
    const { isMale, consumptionLevel, systemType, avatarUrl,
      snsName, snsId, followerCount, introduction, platformId = 0,
      url, qrCodeUrl,
    } = base
    const { classification, wholeRank = 0, orderResponseDuration, orderResponsePercentile,
      orderNumRateOnClassification, orderAcceptanceRate, orderMajorIndustryCategory } = feature

    //排名处理
    const wholeRankCN = `${platformView[platformId]}排行第${nzhcn.encodeS(wholeRank)}`

    return (
      <div className="head-info">
        <div className='head-avatar'>
          <div className="avatar-img">
            <Avatar size={60} src={avatarUrl} />
          </div>
          <PopoverFormat text={<div className="avatar-mark">{wholeRankCN}</div>} content={`${wholeRankCN}`} />
        </div>
        <div className="info-right-box">
          <div className='head-box'>
            <div className='account-info' >
              <PopoverFormat text={<div className='account-name'>{snsName}</div>} content={snsName} />
              <PopoverFormat text='等级' content='抖音音乐人' />
              <LookIndex url={url} qrCodeUrl={qrCodeUrl} />
              {/* <a style={{ marginLeft: 20, color: ' #1990FF' }} onClick={() => setShowModal(true, { content: <BloggerInfo />, title: '博主信息', width: 700 })}>
                <Icon type='user' />查看博主信息</a> */}
            </div>
            <div className='account-code'>{platformView[platformId]}号：{snsId}</div>
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
              <OneLine title='简介' content={
                <div className='content-font' style={{ maxWidth: 300 }}>
                  <PopoverFormat popoverProps={{ overlayStyle: { width: 400 } }} text={<MultiClamp ellipsis="..." clamp={2}>{introduction}</MultiClamp>} content={introduction} />
                </div>}
              />
            </div>
            <div className='type-info'>
              <div className='type-info-row' >
                <OneType title="内容分类" content={classification} color='#ff4d4b' />
                <OneType title="接单数" content={orderNumRateOnClassification} />
                <OneType title="响应时间" content={FieldMap.getSegmentByFloat(orderResponsePercentile)} last={`${orderResponseDuration}s`} />
              </div>
              <div className='type-info-row'>
                <OneType title="历史服务最多分类" content={orderMajorIndustryCategory} />
                <OneType title="接单率" content={FieldMap.getSegmentByFloat(orderAcceptanceRate)} last={orderAcceptanceRate} />
                <OneType title="平均订单完结周期" content='1周' />
              </div>
            </div>
            <div className='release-info'>
              <div className='release-info-box'>
                {skuList.map(one => <OneRelease key={one.skuId} title={one.skuTypeName} content={one.quotePrice} last={one.unitPrice} />)}
              </div>
              <div style={{ textAlign: 'center' }}>
                {isCar ? <Button style={{ width: '80%', marginTop: 10 }} type='primary'>加入选号车</Button> :
                  <Button style={{ width: '80%', marginTop: 10, background: '#999', color: '#fff' }} >移除选号车</Button>}
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
    <div className='content' style={{ color: color }}>
      {content}
      <span className='last'>{last}</span>
    </div>

  </div>
}
const OneRelease = ({ title, content, last }) => {
  return <div className='release-info-three'>
    <div className='title'>{title}</div>
    <div className='two-line-flex'>
      <div className='content'>¥{numeral(content).format('0,0')}</div>
      <PopoverFormat text={<div className='last'>{last}元/千粉丝</div>} content='平均每千粉丝单价' />
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
