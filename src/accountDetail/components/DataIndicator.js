import React, { Component } from 'react'
import UpDownPercentage from "../base/UpDownPercentage";
import './DataIndicator.less'

import CompositeRadar from "./chart/CompositeRadar";
import CharTitle from "./chart/CharTitle";
import ValueFormat from "../base/ValueFormat";
import numeral from 'numeral'
import { Divider, Empty } from "antd";
class DataIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { baseInfo = {} } = this.props
    const { feature = {}, base = {}, composite = {} } = baseInfo
    const { followerCount } = base
    const {
      wholeIndex, //综合指数
      wholeRankOnClassification, //类型排名
      mediaCount,
      followerCountRateOnClassificationPriceTag, //总粉丝数同别的对比
      mediaInteractionProportion, //粉丝互动率
      mediaInteractionAvg, //平均互动数
      mediaInteractionProportion30ItemRateOnClassificationPriceTag, //账号粉丝互动率 比 同行业同价位平均粉丝互动率
      mediaInteractionAvg30ItemRateOnClassificationPriceTag, //平均互动数
      //点赞
      mediaLikeAvg, // 行业互动点赞
      mediaLikeAvg30ItemRateOnClassificationPriceTag, //30条平均点赞 比同行业其他人多
      mediaLikeAvgRateOnClassificationPriceTag, //总平均点赞 比同行业其他人多
      mediaLikeSumRateOnClassificationPriceTag, //累计点赞比同行业其他人多

      //转发
      mediaRepostAvg, //近30条互动转发均值
      mediaRepostAvg30ItemRateOnClassificationPriceTag, //账号近30条平均转发比同行业同价位近30条平均转发
      mediaRepostAvgRateOnClassificationPriceTag, // 账号平均转发比同行业同价位平均单视频转发
      mediaRepostSumRateOnClassificationPriceTag, //账号平均转发比同行业同价位平均累计转发
      //评论
      mediaCommentAvg, //近30评论平均值
      mediaCommentAvg30ItemRateOnClassificationPriceTag, //账号近30条平均评论/同行业同价位近30条平均评论		 
      mediaCommentAvgRateOnClassificationPriceTag, //账号平均评论/同行业同价位平均单视频评论		 
      mediaCommentSumRateOnClassificationPriceTag, //账号平均评论/同行业同价位平均累计评论

      //播放
      mediaPlayAvg,
      mediaPlayAvg30ItemRateOnClassificationPriceTag, //账号近30条平均播放/同行业同价位近30条平均播放	Float	 
      mediaPlayAvgRateOnClassificationPriceTag, //	账号平均播放/同行业同价位平均单视频播放	Float	 
      mediaPlaySumRateOnClassificationPriceTag, //	账号平均播放/同行业同价位平均累计播放
      //     
      mediaCount90d = '-', //90天发布数	
      followerCountGrowthRate28d, //28天粉丝增长率	

    } = feature
    const { data, legend = ['', ''] } = composite
    return (
      <div className='data-indicator'>
        <div className='title-big'>数据指标</div>
        <div className='content' >
          <div className='right-composite'>
            <div className='composite-exponent'>
              <div className='head-center'>
                <div className='left-index'>
                  <div className='text'>
                    <CharTitle title='综合指数' color='#999' content='基于互动指数、黑马指数、内容传播指数、服务指数、配合指数、SNBT这6个指标加权计算综合指标。' />
                  </div>
                  <div className='score'>{numeral(wholeIndex).format('0')}</div>
                </div>
                <Divider type="vertical" style={{ height: 40, margin: '0px 20px' }} />
                <div className='lable'>{legend[1]}第{wholeRankOnClassification || '-'}名</div>
              </div>

              <div>
                {data ? <CompositeRadar data={data} legendType={legend} /> : <Empty style={{ marginTop: '10%' }} />}
              </div>
            </div>
          </div>
          <div className='left-indicator'>
            <div className='fan-release'>
              <div className='fan-release-item'>
                <div>
                  <HeadBox title={'总粉丝数'} number={followerCount || 21}
                    percent={followerCountRateOnClassificationPriceTag} typeContent='同分类同价格总粉丝数均值' />
                </div>
                <div> <ThreeBox title='粉丝互动率' number={numeral(mediaInteractionProportion).format('0.0%')}
                  percent={mediaInteractionProportion30ItemRateOnClassificationPriceTag} isBig={true}
                  typeContent='同分类同价格粉丝数互动率均值' /> </div>
                <ThreeBox title='粉丝互动数' number={
                  <ValueFormat value={mediaInteractionAvg > 0 ? mediaInteractionAvg : 0} unitClass='unit' />
                }
                  percent={mediaInteractionAvg30ItemRateOnClassificationPriceTag} isBig={true}
                  typeContent='同分类同价格粉丝互动数均值' />
              </div>
              <div className='fan-release-item'>
                <HeadBox title={'总发布数'} number={mediaCount || 900} noLast={true} />
                <ThreeBox title='90天发布数' number={`${mediaCount90d}条`} notPercent={true} />
                <ThreeBox title='28天粉丝增长率' number={followerCountGrowthRate28d ? numeral(followerCountGrowthRate28d).format('0.0%') : '-'} notPercent={true} />
              </div>
            </div>
            <div className='operate-four'>
              <OperateItem typeText='点赞'
                numberAvg={mediaLikeAvg} percentAvg={mediaLikeAvg30ItemRateOnClassificationPriceTag}
                sumAvgNumber={'123'} sumAvgPercent={mediaLikeAvgRateOnClassificationPriceTag}
                numberSum='123' percentSum={mediaLikeSumRateOnClassificationPriceTag}
                typeSum="123" />
              <OperateItem typeText='转发'
                numberAvg={mediaRepostAvg} percentAvg={mediaRepostAvg30ItemRateOnClassificationPriceTag}
                sumAvgNumber='123' sumAvgPercent={mediaRepostAvgRateOnClassificationPriceTag}
                numberSum='123' percentSum={mediaRepostSumRateOnClassificationPriceTag}
                typeSum="123" />
              <OperateItem typeText='评论'
                numberAvg={mediaCommentAvg} percentAvg={mediaCommentAvg30ItemRateOnClassificationPriceTag}
                sumAvgNumber='123' sumAvgPercent={mediaCommentAvgRateOnClassificationPriceTag}
                numberSum='123' percentSum={mediaCommentSumRateOnClassificationPriceTag}
                typeSum="123" />
              <OperateItem typeText='播放'
                numberAvg={mediaPlayAvg} percentAvg={mediaPlayAvg30ItemRateOnClassificationPriceTag}
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
const HeadBox = ({ title, number, percent, isLeft = false, noLast, typeContent }) => {
  const unConfig = noLast ? null : <UpDownPercentage percent={percent} isBackColor={true} typeContent={typeContent} />
  return <div className='head-box'>
    <div className={`${isLeft ? 'title-light' : 'title'}`}>{title}</div>
    <div className='head-box-flex'>
      {/* <div className='number'>{number}</div>
      <div className='unit'>{unit}</div> */}
      <ValueFormat value={number > 0 ? number : 0} valueClass='number' unitClass='unit' />
      {isLeft ? <div style={{ marginTop: 10, marginLeft: 3 }}>{unConfig} </div> : ""}
    </div>
    {isLeft ? "" : unConfig}
  </div>
}
const ThreeBox = ({ title, number, percent, isBig = false, notPercent = false, typeContent }) => {
  return <div className='three-avg-box' >
    <div className={notPercent ? 'big-title' : 'title'}>{title}</div>
    <div className={`${isBig ? 'big-number' : 'number'}`}>{number ? number : '-'}</div>
    {notPercent ? null : <div className='down' >
      <UpDownPercentage percent={percent} typeContent={typeContent} />
    </div>}
  </div>
}
const OperateItem = ({ typeText, numberAvg, percentAvg, sumAvgNumber, sumAvgPercent, numberSum, percentSum }) => {
  return <div className='operate-item'>
    <div>{typeText}</div>
    <div className='back-box'>
      <HeadBox title='近30条视频均' number={numberAvg} percent={percentAvg} typeContent={`同分类同价格近30条视频${typeText}均值`} />
      {/* <div className='avg-sum-flex'>
        <ThreeBox title='总平均' number={sumAvgNumber} percent={sumAvgPercent} />
        <ThreeBox title='累计' number={numberSum} percent={percentSum} />
      </div> */}
    </div>

  </div>
}

export default DataIndicator;

