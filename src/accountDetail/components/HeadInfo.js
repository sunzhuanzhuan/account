import React, { Component } from 'react'
import LookIndex from "./LookIndex";
import VerificationIcon from "../base/VerificationIcon";
import { PopoverFormat } from "../base/TitleAndDecide";
import ImgCircle from "../base/ImgCircle";

import "./HeadInfo.less"
import { Button, Divider, Empty, Icon, Popover, Table, } from 'antd';
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
    const { setShowModal, isExistCar, baseInfo = {}, selectCarEdit, actions, accountId, accountDetail, authVisble } = this.props
    const { base = {}, feature = {}, skuList = [] } = baseInfo
    const { gender, consumptionLevel, systemType, avatarUrl, areaName,
      snsName, snsId, followerCount, introduction, platformId = 0,
      url, qrCodeUrl, cooperationTips,
      verifiedStatusName,
      classificationList = [],
      isFamous, verifiedStatus
    } = base
    const { hogwartsComprehensiveCommericalIndexRank = 0, orderResponseDuration, orderResponsePercentile,
      orderAcceptanceNum = '-', orderAcceptanceRate, orderMajorIndustryCategory, orderCompleteDuration,
      isVerified, verificationReason, brandList = [], labelListRecordList = [] } = feature
    //排名处理
    const platformName = platformView[platformId] || '-'
    const wholeRankCN = `${platformName}NO.${hogwartsComprehensiveCommericalIndexRank}`

    return (
      <div className="head-info">
        <div className='head-avatar'>
          <div className="avatar-img">
            <ImgCircle url={avatarUrl} />
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

              {isVerified == 1 ? <div>
                <VerificationIcon
                  platformId={platformId}
                  status={verifiedStatus}
                />
                {verificationReason ? `（${verificationReason}）` : ''}
              </div> : null}

              <LookIndex url={url} qrCodeUrl={qrCodeUrl} platformName={platformName} />
              {authVisble ?
                <span><Divider type='vertical' />
                  <a href={`/account/manage/view/${platformId}?account_id=${accountId}`}><Icon type='search' style={{ paddingRight: 4 }} />账号维护页</a></span> : null}
              {/* <a style={{ marginLeft: 20, color: ' #1990FF' }} onClick={() => setShowModal(true, { content: <BloggerInfo />, title: '博主信息', width: 700 })}>
                <Icon type='user' />查看博主信息</a> */}
              <div className='cooperation-tips' onClick={() => setShowModal(true, {
                content: <div>{cooperationTips || '暂无数据'}</div>, title: '合作须知', width: 500
              })}>
                <Icon type="exclamation-circle" style={{ color: '#FAAD14', marginRight: 4 }} theme="filled" />
                合作须知
               </div>
            </div>
            <div className='account-code'>
              <span>ID：{snsId}</span>
              {gender == 1 || gender == 2 ?
                <img width='16' src={require(`./img/${gender == 1 ? 'male' : 'famle'}.png`)} />
                : null}
              <span style={{ marginLeft: 20 }}>{areaName}</span>
            </div>

          </div>
          <div className='info-bottom-three'>
            <div className='base-info'>
              <OneLine title='账号标签' content={
                classificationList.length > 0 ? <FatLable classificationList={classificationList} labelListRecordList={labelListRecordList} /> : null
              } />
              <OneLine title='关联品牌' content={
                brandList.length > 0 ? <div style={{ display: 'flex' }}>
                  <div className='green-tag'>{brandList[0].key}</div>
                  <a className='look' onClick={() => setShowModal(true, {
                    content: <div className='brand-list'>{brandList.map(one => <div color="cyan" key={one.key}>{one.key}</div>)}</div>, title: '全部品牌', width: 800
                  })}>  查看全部</a>
                </div> : '-'
              } />
              <OneLine title='认证信息' content={
                <div className='content-font'>
                  {verifiedStatusName ? verifiedStatusName : '-'}
                </div>}
              />
              <OneLine title='简介' content={
                <div className='content-font' style={{ maxWidth: 300 }}>
                  <PopoverFormat popoverProps={{ overlayStyle: { width: 400 } }} text={<MultiClamp ellipsis="..." clamp={2}>{introduction}</MultiClamp>} content={introduction} />
                </div>}
              />

            </div>
            <div className='type-info'>
              <div className='type-info-row' >
                <OneType title="内容分类" content={classificationList[0] && classificationList[0].name} color='#ff4d4b' />
                <OneType title="接单数" content={orderAcceptanceNum} />
                <OneType title="响应时间" content={FieldMap.getSegmentByFloat(orderResponsePercentile)} last={`${orderResponseDuration ? FieldMap.getTime(orderResponseDuration) : ''}`} />
              </div>
              <div className='type-info-row'>
                <OneType title="历史服务最多分类" content={orderMajorIndustryCategory || '-'} />
                <OneType title="接单率" content={FieldMap.getSegmentByFloat(orderAcceptanceRate)} last={orderAcceptanceRate ? numeral(orderAcceptanceRate).format('0%') : ''} />
                <OneType title="平均订单完结周期" content={orderCompleteDuration ? `${numeral(orderCompleteDuration / 3600 / 24).format('0.00')}天` : '-'} last={
                  <a style={{ fontSize: 13 }} onClick={() => setShowModal(true, {
                    content: <RecentPrice />, title: `近期应约（${accountDetail.historyPriceCount}）`, width: 1000
                  })}>
                    近期应约（{accountDetail.historyPriceCount}）
                </a>
                }
                />
              </div>
            </div>
            <div className='release-info'>
              {skuList.length > 0 ?
                platformId == 9 ? <WeChatTable data={skuList} isFamous={isFamous} /> : <SkuListBox skuList={skuList} />
                : <Empty style={{ margin: '0px auto' }} />}
              <div style={{ textAlign: 'center' }}>
                {isExistCar ? <Button className='add-select-car-button' type='primary' onClick={() => selectCarEdit(true)}>加入选号车</Button> :
                  <Button className='remove-select-car-button' onClick={() => selectCarEdit(false)}>移出选号车</Button>}
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
const OneType = ({ title, content, last, color, lastContent }) => {
  return <div className='type-info-flex'>
    <div className='title'>{title}</div>
    <div className='content' style={{ color: color }}>
      {content}
      <span className='last'>{last}</span>
    </div>

  </div>
}
const SkuListBox = ({ skuList }) => {
  return <div className='release-info-box'>
    {skuList.slice(0, 4).map((one, index) => {
      const isDefense = index == 0 && one.isPreventShielding == 1
      return <div className='release-info-three' key={one.skuId}>
        <div className='title'>{one.skuTypeName}{isDefense ?
          <Popover content='该参考报价为含防屏蔽的报价'>
            <span className='defense'>防</span>
          </Popover>
          : null}</div>
        <div className='two-line-flex'>
          <div className='content'>{getPrice(one.openQuotePrice)}</div>
          <PopoverFormat text={<div className='last'>{one.unitPrice}元/千粉丝</div>} content='平均每千粉丝单价' />
        </div>
      </div>
    })}
  </div>
}
const FatLable = ({ classificationList = [], labelListRecordList = [] }) => {
  const list = Array.from(new Set([...classificationList.map(one => one.name), ...labelListRecordList.map(one => one.labelName)]))
  return <div className='fat-lable-flex'>
    {list.map(one => <div
      className='fat-lable'
      key={one}>{one}</div>)}
  </div>
}
function getPrice(number) {
  return <div className='priceRed fs18'>
    {`${(number > 0 || number == 0) ? '¥' + numeral(number).format('0,0') : '-'}`}
  </div>
}
const WeChatTable = ({ data = [], isFamous }) => {
  const data2 = data.slice(4, 8) || []
  const data1 = data.slice(0, 4).map((one, index) => ({
    ...one,
    openQuotePrice2: data2[index]
  }))
  let columns = [
    {
      title: '',
      dataIndex: 'skuTypeName',
      key: 'skuTypeName',
    },


  ]
  if (isFamous == 1) {
    columns = [...columns, {
      title: '发布',
      dataIndex: 'openQuotePrice2',
      key: 'openQuotePrice2',
      render: (text) => getPrice(text && text.openQuotePrice)
    }, {
      title: '原创+发布',
      dataIndex: 'openQuotePrice',
      key: 'openQuotePrice',
      render: (text) => getPrice(text)
    }]
  }
  if (isFamous == 2) {
    columns = [...columns, {
      title: '发布',
      dataIndex: 'openQuotePrice',
      key: 'openQuotePrice',
      render: (text) => getPrice(text)
    }]
  }
  return <Table dataSource={data1} columns={columns}
    rowKey="skuId" className='table-no-background-add-odd wachat-table'
    pagination={false}
  />
}

export default HeadInfo;
