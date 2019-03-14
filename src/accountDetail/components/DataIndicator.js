import React, { Component } from 'react'
import UpDownPercentage from "../base/UpDownPercentage";
import './DataIndicator.less'
import { PopoverFormat } from "../base/TitleAndDecide";
import CompositeRadar from "./chart/CompositeRadar";
import ValueFormat from "../base/ValueFormat";
import { Divider } from "antd";
class DataIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { baseInfo = {} } = this.props
    const { feature = {}, base = {}, composite = {} } = baseInfo

    const {
      wholeIndex, //综合指数
      wholeRankOnClassification, //类型排名
      videoCount,
      followerCountRateOnClassificationPriceTag, //总粉丝数同别的对比
      mediaInteractionProportionRateOnClassificationPriceTag, //账号粉丝互动率 比 同行业同价位平均粉丝互动率
      mediaInteractionRateOnClassificationPriceTag, //平均互动数
      //点赞
      mediaLikeAvg30itemOnClassification, // 行业互动点赞
      mediaLikeAvg30itemRateOnClassificationPriceTag, //30条平均点赞 比同行业其他人多
      mediaLikeAvgRateOnClassificationPriceTag, //总平均点赞 比同行业其他人多
      mediaLikeSumRateOnClassificationPriceTag, //累计点赞比同行业其他人多

      //转发
      mediaRepostAvg30itemOnClassification, //近30条互动转发均值
      mediaRepostAvg30itemRateOnClassificationPriceTag, //账号近30条平均转发比同行业同价位近30条平均转发
      mediaRepostAvgRateOnClassificationPriceTag, // 账号平均转发比同行业同价位平均单视频转发
      mediaRepostSumRateOnClassificationPriceTag, //账号平均转发比同行业同价位平均累计转发
      //评论
      mediaCommentAvg30itemRateOnClassification, //近30评论平均值
      mediaCommentAvg30itemRateOnClassificationPriceTag, //账号近30条平均评论/同行业同价位近30条平均评论		 
      mediaCommentAvgRateOnClassificationPriceTag, //账号平均评论/同行业同价位平均单视频评论		 
      mediaCommentSumRateOnClassificationPriceTag, //账号平均评论/同行业同价位平均累计评论

      //播放
      mediaPlayAvg,
      mediaPlayAvg30itemRateOnClassificationPriceTag, //账号近30条平均播放/同行业同价位近30条平均播放	Float	 
      mediaPlayAvgRateOnClassificationPriceTag, //	账号平均播放/同行业同价位平均单视频播放	Float	 
      mediaPlaySumRateOnClassificationPriceTag, //	账号平均播放/同行业同价位平均累计播放


    } = feature
    return (
      <div className='data-indicator'>
        <div className='title-big'>数据指标</div>
        <div className='content' >
          <div className='right-composite'>
            <div className='composite-exponent'>
              <div className='head-center'>
                <div className='left-index'>
                  <div className='text'>综合指数</div>
                  <div className='score'>{wholeIndex * 100}</div>
                </div>
                <Divider type="vertical" style={{ height: 40, margin: '0px 20px' }} />
                <div className='lable'>{wholeRankOnClassification}</div>
              </div>

              <div>
                <CompositeRadar data={composite.data} />
              </div>
            </div>
          </div>
          <div className='left-indicator'>
            <div className='fan-release'>
              <div className='fan-release-item'>
                <PopoverFormat
                  text={<div><HeadBox title={'总粉丝数'} number={123123} percent={followerCountRateOnClassificationPriceTag} /></div>}
                  content='高于同分类同价格总粉丝数均值'
                />
                <PopoverFormat
                  text={<div> <ThreeBox title='粉丝互动率' number={1} percent={mediaInteractionProportionRateOnClassificationPriceTag} isBig={true} /> </div>}
                  content='高于同分类同价格粉丝数互动率均值'
                />
                <ThreeBox title='粉丝互动数' number={mediaInteractionRateOnClassificationPriceTag} percent={0.9} isBig={true} />
              </div>
              <div className='fan-release-item'>
                <HeadBox title={'总发布数'} number={videoCount} percent={0.33} />
                <ThreeBox title='90天发布数' number={'30条'} notPercent={true} />
                <ThreeBox title='28天粉丝增长率' number={'47%'} notPercent={true} />
              </div>
            </div>
            <div className='operate-four'>
              <OperateItem typeText='点赞'
                numberAvg={mediaLikeAvg30itemOnClassification} percentAvg={mediaLikeAvg30itemRateOnClassificationPriceTag}
                sumAvgNumber={'123'} sumAvgPercent={mediaLikeAvgRateOnClassificationPriceTag}
                numberSum='123' percentSum={mediaLikeSumRateOnClassificationPriceTag}
                typeSum="123" />
              <OperateItem typeText='转发'
                numberAvg={mediaRepostAvg30itemOnClassification} percentAvg={mediaRepostAvg30itemRateOnClassificationPriceTag}
                sumAvgNumber='123' sumAvgPercent={mediaRepostAvgRateOnClassificationPriceTag}
                numberSum='123' percentSum={mediaRepostSumRateOnClassificationPriceTag}
                typeSum="123" />
              <OperateItem typeText='评论'
                numberAvg={mediaCommentAvg30itemRateOnClassification} percentAvg={mediaCommentAvg30itemRateOnClassificationPriceTag}
                sumAvgNumber='123' sumAvgPercent={mediaCommentAvgRateOnClassificationPriceTag}
                numberSum='123' percentSum={mediaCommentSumRateOnClassificationPriceTag}
                typeSum="123" />
              <OperateItem typeText='播放'
                numberAvg={mediaPlayAvg} percentAvg={mediaPlayAvg30itemRateOnClassificationPriceTag}
                sumAvgNumber='123' sumAvgPercent={mediaPlayAvgRateOnClassificationPriceTag}
                numberSum='123' percentSum={mediaPlaySumRateOnClassificationPriceTag}
                typeSum="123" />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
const HeadBox = ({ title, number, percent, isLeft = false }) => {

  const unConfig = <UpDownPercentage percent={percent} isBackColor={true} />
  return <div className='head-box'>
    <div className={`${isLeft ? 'title-light' : 'title'}`}>{title}</div>
    <div className='head-box-flex'>
      {/* <div className='number'>{number}</div>
      <div className='unit'>{unit}</div> */}
      <ValueFormat value={number} valueClass='number' unitClass='unit' />
      {isLeft ? <div style={{ marginTop: 9, marginLeft: 3 }}>{unConfig} </div> : ""}
    </div>
    {isLeft ? "" : unConfig}

  </div>
}
const ThreeBox = ({ title, number, percent, isBig = false, notPercent = false }) => {
  return <div className='three-avg-box' >
    <div className={notPercent ? 'big-title' : 'title'}>{title}</div>
    <div className={`${isBig ? 'big-number' : 'number'}`}>{number}</div>
    {notPercent ? null : <div className='down' >
      <UpDownPercentage percent={percent} />
    </div>}
  </div>
}
const OperateItem = ({ typeText, numberAvg, percentAvg, sumAvgNumber, sumAvgPercent, numberSum, percentSum }) => {
  const hoverHead = <HeadBox title='近30条视频均' isLeft={true} number={numberAvg} percent={percentAvg} />
  return <div className='operate-item'>
    <div>{typeText}</div>
    <div className='back-box'>
      {typeText == '转发' ?
        <PopoverFormat
          text={<div>{hoverHead}</div>}
          content='低于同分类同价格近30条视频转发均值'
        />
        : hoverHead}
      {/* <div className='avg-sum-flex'>
        <ThreeBox title='总平均' number={sumAvgNumber} percent={sumAvgPercent} />
        <ThreeBox title='累计' number={numberSum} percent={percentSum} />
      </div> */}
    </div>

  </div>
}

export default DataIndicator;

