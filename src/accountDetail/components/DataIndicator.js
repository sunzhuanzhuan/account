import React, { useState, useEffect } from 'react'
import UpDownPercentage from "../base/UpDownPercentage";
import './DataIndicator.less'
import { getWechat, wechatColumns, getSina, sinaColumns, getRedBook, redBookColumns } from '../constants/DataIndicatorConfig'
import CompositeRadar from "./chart/CompositeRadar";
import CharTitle from "./chart/CharTitle";
import ValueFormat from "../base/ValueFormat";
import numeral from 'numeral'
import { Divider, Empty, Tooltip, Table } from "antd";
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import api from '../../api'
function DataIndicator(props) {
  const [indicatorData, setIndicatorData] = useState({})
  const [dataIndex, setDataIndex] = useState({})
  const searchParams = qs.parse(props.location.search.substring(1))
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const { data } = await api.get('/operator-gateway/accountDetail/v1/getMediaStatistics' + props.location.search)
    setIndicatorData(data)
    setDataIndex(data && data.comprehensiveIndex || {})
  }
  const { baseInfo = {} } = props
  const { base = {}, } = baseInfo
  const {
    comprehensiveCommericalIndex, //综合指数
    hogwartsComprehensiveCommericalIndexRankOnClassification, //类型排名
  } = dataIndex
  const { legend = ['', ''] } = dataIndex

  function getChildren() {
    const groupType = searchParams.groupType
    switch (groupType) {
      case '1':
        return <WechatInfo feature={indicatorData.weixin} />
      case '2':
        return <SinaInfo feature={indicatorData.weibo} />
      case '4':
        return <RedBookInfo feature={indicatorData.xiaohongshu} />
      default:
        return <VideoInfo base={base} feature={indicatorData.video} />
    }
  }
  return (
    <div className='data-indicator'>
      <div className='title-big'>数据指标</div>
      <div className='content' >
        <div className='right-composite'>
          <div className='composite-exponent'>
            <div className='head-center'>
              <div className='left-index'>
                <div className='text'>
                  <CharTitle title='商业价值指数' color='#999' content='基于互动指数、内容传播指数、活跃度指数、健康指数、商业适应度指数、成长指数这6个指标加权计算综合指标。' />
                </div>
                <div className='score'>{comprehensiveCommericalIndex && numeral(comprehensiveCommericalIndex).format('0') || '-'}</div>
              </div>
              <Divider type="vertical" style={{ height: 40, margin: '0px 20px' }} />
              <div className='left-index'>
                <div className='text' style={{ marginTop: 7 }}>
                  <CharTitle title={`${legend[1] || '-'}分类排名`} color='#999' />
                </div>
                <div><span className='score'>{hogwartsComprehensiveCommericalIndexRankOnClassification ? `NO.${hogwartsComprehensiveCommericalIndexRankOnClassification}` : '-'}</span></div>
              </div>
            </div>

            <div>
              {dataIndex.data ? <CompositeRadar data={dataIndex.data} legendType={legend} /> : <Empty style={{ marginTop: '10%' }} />}
            </div>
          </div>
        </div>
        <div className='left-indicator'>
          {getChildren()}

        </div>
      </div>
    </div>)
}
export default withRouter(DataIndicator)
//微信信息
const WechatInfo = ({ feature = {} }) => {
  const data = getWechat(feature)
  return <div className='wechat-info'>
    <div className='wechat-sum'>
      {data.map(item => <ThreeNumber
        key={item.name}
        title={item.name}
        number={item.value}
        unit={item.unit}
        typeContent='同分类同价格28天粉丝增长率均值'
      />)}
    </div>
    <div className='wechat-table table-no-background-add-odd'>
      <Table columns={wechatColumns}
        dataSource={feature.list}
        pagination={false}
        rowKey='rowName'
      />
    </div>
  </div>
}
//微博信息
const SinaInfo = ({ feature = {} }) => {
  const data = getSina(feature)
  return <div className='sina-info'>
    <div className='sina-sum'>
      {data.map(item => <ThreeNumber
        key={item.name}
        title={item.name}
        number={item.value}
        unit={item.unit}
        typeContent='同分类同价格28天粉丝增长率均值'
      />)}
    </div>
    <div className='sina-table table-no-background-add-odd'>
      <Table columns={sinaColumns}
        dataSource={feature.list}
        pagination={false}
        rowKey='rowName'
      />
    </div>
  </div>
}
//小红书信息
const RedBookInfo = ({ feature = {} }) => {
  console.log("TCL: RedBookInfo -> feature", feature)

  const data = getRedBook(feature)
  return <div className='red-book-info'>
    <div className='red-book-sum'>
      {data.map(item => <ThreeNumber
        key={item.name}
        title={item.name}
        number={item.value}
        unit={item.unit}
        typeContent='同分类同价格28天粉丝增长率均值'
      />)}
    </div>
    <div className='red-book-table table-no-background-add-odd '>
      <Table columns={redBookColumns}
        dataSource={feature.list}
        pagination={false}
        rowKey='rowName'
      />
    </div>
  </div>
}
const VideoInfo = ({ feature = {}, base = {} }) => {
  return <>
    <div className='fan-release'>
      <div className='back-padding flex1'>
        <div className='bold-font-size-16'>粉丝数据</div>
        <div className='fan-release-item '>
          <HeadBox
            title={'总粉丝数'}
            number={feature.followerCount || 21}
            percent={feature.followerCountRateOnClassificationPriceTag} typeContent='同分类同价格总粉丝数均值' />
          <Divider type="vertical" className='height20-colorE3' />
          <ThreeNumber
            title='28天粉丝增长率'
            number={feature.followerCountGrowthRate28d ? numeral(feature.followerCountGrowthRate28d * 100).format('0.0') : '-'}
            unit={'%'}
            typeContent='同分类同价格28天粉丝增长率均值'
          />
          <Divider type="vertical" className='height20-colorE3' />
          <ThreeNumber
            title='粉丝互动率'
            number={feature.mediaInteractionProportion ? numeral(feature.mediaInteractionProportion * 100).format('0.0') : '-'}
            unit={'%'}
            percent={feature.mediaInteractionProportion30ItemRateOnClassificationPriceTag}
            typeContent='同分类同价格粉丝数互动率均值' />
        </div>
      </div>
      <div className='back-padding flex1'>
        <div className='bold-font-size-16'>视频数据</div>
        <div className='fan-release-item'>
          <ThreeNumber title='总发布数' number={feature.mediaCount} unit='个' />
          <Divider type="vertical" className='height20-colorE3' />
          <ThreeNumber title='爆款视频数' number={feature.hotMediaCount} unit='个' tips='近90天发布的爆款视频数' />
          <Divider type="vertical" className='height20-colorE3' />
          <ThreeNumber title='近28天发布频率' number={numeral(feature.mediaWeeklyFloatCount28d).format('0.0')} unit='个/周' />
        </div>
      </div>
    </div>
    <div className='operate-four'>
      {/* 快手抖音独有 */}
      {base.platformId == 115 ? <>
        <ThreeNumber title='真实观看率'
          number={numeral(feature.trueViewRatio * 100).format('0.0')}
          unit='%'
        />
        <Divider type="vertical" className='height20-colorE3' />
      </> : null}
      <OperateItem typeText='点赞'
        numberAvg={feature.mediaLikeAvg}
        percentAvg={feature.mediaLikeAvg30ItemRateOnClassificationPriceTag}
      />
      <Divider type="vertical" className='height20-colorE3' />
      <OperateItem typeText='转发'
        numberAvg={feature.mediaRepostAvg}
        percentAvg={feature.mediaRepostAvg30ItemRateOnClassificationPriceTag}
      />
      <Divider type="vertical" className='height20-colorE3' />
      <OperateItem typeText='评论'
        numberAvg={feature.mediaCommentAvg}
        percentAvg={feature.mediaCommentAvg30ItemRateOnClassificationPriceTag}
      />
      <Divider type="vertical" className='height20-colorE3' />
      <OperateItem typeText='播放'
        numberAvg={feature.mediaPlayAvg}
        percentAvg={feature.mediaPlayAvg30ItemRateOnClassificationPriceTag}
      />
    </div>
  </>
}

const HeadBox = ({ title, number, percent, isLeft = false, noLast, typeContent }) => {
  const unConfig = noLast ? null : <UpDownPercentage percent={percent} typeContent={typeContent} />
  return <div className='head-box'>
    <div className="title-light">{title}</div>
    <div className='head-box-flex'>
      <ValueFormat value={number > 0 ? number : 0} valueClass='number' unitClass='unit' />
      {isLeft ? <div style={{ marginTop: 10, marginLeft: 3 }}>{unConfig} </div> : ""}
    </div>
    {isLeft ? "" : unConfig}
  </div>
}
const OperateItem = ({ typeText, numberAvg, percentAvg }) => {
  return <div className='operate-item'>
    <div className='back-box'>
      <HeadBox title={`平均${typeText}`} number={numberAvg} percent={percentAvg} typeContent={`同分类同价格近30条视频${typeText}均值`} />
    </div>
  </div>
}
const ThreeNumber = ({ title, number, unit, percent, typeContent, tips }) => {
  return <div className='three-number'>
    <div className='font13-color9 text-center'>{tips ? <Tooltip title={tips}>
      {title}
    </Tooltip> : title}</div>
    <div className='font24-color3 text-center '>
      {number}
      <span className='font12-color3'>{unit}</span></div>
    {percent ? <div>
      <UpDownPercentage percent={percent} typeContent={typeContent} />
    </div> : null}

  </div>
}

