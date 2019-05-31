import React, { Component } from 'react'
import LookIndex from "./LookIndex";
import { PopoverFormat } from "../base/TitleAndDecide";
import "./HeadInfo.less"
import { Avatar, Button, Divider, Empty, Icon } from 'antd';
import MultiClamp from 'react-multi-clamp';
import { platformView } from "../../accountManage/constants/platform";
import FieldMap from "../constants/FieldMap";
import numeral from "numeral";
import { WBYPlatformIcon } from "wbyui"
import RecentPrice from "./RecentPrice";
class HeadInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { setShowModal, isExistCar, baseInfo = {}, selectCarEdit, actions, accountDetail } = this.props
    const { base = {}, feature = {}, skuList = [] } = baseInfo
    const { isMale, consumptionLevel, systemType, avatarUrl,
      snsName, snsId, followerCount, introduction, platformId = 0,
      url, qrCodeUrl, cooperationTips
    } = base
    const { classification = '-', wholeRank = 0, orderResponseDuration, orderResponsePercentile,
      orderAcceptanceNum = '-', orderAcceptanceRate, orderMajorIndustryCategory, orderCompleteDuration,
      isVerified, verificationReason } = feature
    //排名处理
    const platformName = platformView[platformId] || '-'
    const wholeRankCN = `${platformName}NO.${wholeRank}`
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
              {platformId ? <span style={{ padding: '0px 8px 2px 0px' }}> <WBYPlatformIcon
                weibo_type={platformId}
                widthSize={16}
              /> </span> : null}
              <PopoverFormat text={<div className='account-name'>{snsName}</div>} content={snsName} />
              {isVerified == 1 ? <PopoverFormat text={<img width='14px' style={{ marginLeft: 10, paddingBottom: 4 }} src={require(`./img/certification-${'other'}.png`)} />} content={verificationReason} /> : null}
              <LookIndex url={url} qrCodeUrl={qrCodeUrl} platformName={platformName} />
              {/* <a style={{ marginLeft: 20, color: ' #1990FF' }} onClick={() => setShowModal(true, { content: <BloggerInfo />, title: '博主信息', width: 700 })}>
                <Icon type='user' />查看博主信息</a> */}
              <div className='cooperation-tips' onClick={() => setShowModal(true, {
                content: <div>{cooperationTips || '暂无数据'}</div>, title: '合作须知', width: 500
              })}>
                <Icon type="exclamation-circle" style={{ color: '#FAAD14', marginRight: 4 }} theme="filled" />
                合作须知
               </div>
            </div>
            <div className='account-code'>{platformView[platformId]}号：{snsId}</div>
          </div>
          <div className='info-bottom-three'>
            <div className='base-info'>
              <OneLine title='账号标签' content={
                classification == '-' ? null : <FatLable backColor='#F3F8FD' color='#78A3CE' list={[classification]} />
              } />
              {/* <OneLine title='功能标签' content={
                <FatLable backColor='#FFEBEA' color='#FE6A60' list={['直播', '直播', '直播']} />
              } /> */}
              <OneLine title='受众信息' content={<div className='content-font'>
                <span>{isMale ? isMale == 1 ? '男性' : '女性' : <PopoverFormat content='性别' text='-' />}</span> <Divider type="vertical" />
                <span>{consumptionLevel ? `消费水平${consumptionLevel == 1 ? '低' : consumptionLevel == 2 ? '中' : '高'}` : <PopoverFormat content='消费水平' text='-' />}</span> <Divider type="vertical" />
                <span>{systemType ? systemType == 1 ? '安卓' : 'IOS' : <PopoverFormat content='浏览端' text='-' />}</span>
              </div>} />
              <OneLine title='简介' content={
                <div className='content-font' style={{ maxWidth: 300 }}>
                  <PopoverFormat popoverProps={{ overlayStyle: { width: 400 } }} text={<MultiClamp ellipsis="..." clamp={2}>{introduction}</MultiClamp>} content={introduction} />
                </div>}
              />
            </div>
            <div className='type-info'>
              <div className='type-info-row' >
                <OneType title="内容分类" content={classification} color='#ff4d4b' />
                <OneType title="接单数" content={orderAcceptanceNum} />
                <OneType title="响应时间" content={FieldMap.getSegmentByFloat(orderResponsePercentile)} last={`${orderResponseDuration ? FieldMap.getTime(orderResponseDuration) : '-'}`} />
              </div>
              <div className='type-info-row'>
                <OneType title="历史服务最多分类" content={orderMajorIndustryCategory || '-'} />
                <OneType title="接单率" content={FieldMap.getSegmentByFloat(orderAcceptanceRate)} last={orderAcceptanceRate ? numeral(orderAcceptanceRate).format('0%') : '-'} />
                <OneType title="平均订单完结周期" content={orderCompleteDuration ? numeral(orderCompleteDuration / 3600 / 24).format('0.00') : '-'} last='天' />
              </div>
            </div>
            <div className='release-info'>

              <div className='release-info-box'>
                {skuList.length > 0 ? skuList.slice(0, 4).map(one => <OneRelease key={one.skuId} title={one.skuTypeName} content={one.openQuotePrice} last={one.unitPrice} />) :
                  <Empty style={{ margin: '0px auto' }} />}
              </div>
              <div style={{ textAlign: 'center' }}>
                {isExistCar ? <Button className='add-select-car-button' type='primary' onClick={() => selectCarEdit(true)}>加入选号车</Button> :
                  <Button className='remove-select-car-button' onClick={() => selectCarEdit(false)}>移出选号车</Button>}
                <a onClick={() => setShowModal(true, {
                  content: <RecentPrice />, title: `近期应约（${accountDetail.historyPriceCount}）`, width: 1000
                })}>
                  近期应约（{accountDetail.historyPriceCount}）
                </a>
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
const OneRelease = ({ title = '-', content, last = '-' }) => {
  return <div className='release-info-three'>
    <div className='title'>{title}</div>
    <div className='two-line-flex'>
      <div className='content'>{`${content ? '¥' + numeral(content).format('0,0') : '-'}`}</div>
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
