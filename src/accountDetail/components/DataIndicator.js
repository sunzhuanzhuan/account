import React, { Component } from 'react'
import UpDownPercentage from "../base/UpDownPercentage";
import './DataIndicator.less'
import { PopoverFormat } from "../base/TitleAndDecide";
import Composite from "./Composite";
class DataIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='data-indicator'>
        <div className='title-big'>数据指标</div>
        <div className='content' >
          <div className='left-indicator'>
            <div className='fan-release'>
              <div className='fan-release-item'>
                <PopoverFormat
                  text={<div><HeadBox title={'总粉丝数'} number={123123} unit={'万'} percent={33} type={'up'} /></div>}
                  content='高于同分类同价格总粉丝数均值'
                />
                <PopoverFormat
                  text={<div> <ThreeBox title='粉丝互动率' number={'57%'} percent={9} type='up' isBig={true} /> </div>}
                  content='高于同分类同价格粉丝数互动率均值'
                />
                <ThreeBox title='粉丝互动数' number={'57%'} percent={9} type='up' isBig={true} />
              </div>
              <div className='fan-release-item'>
                <HeadBox title={'总粉丝数'} number={123123} unit={'万'} percent={33} type={'up'} />
                <ThreeBox title='90天发布数' number={'30条'} notPercent={true} />
                <ThreeBox title='28天粉丝增长率' number={'47%'} notPercent={true} />
              </div>
            </div>
            <div className='operate-four'>
              <OperateItem typeText='点赞' numberAvg='111' percentAvg='12' typeAvg='234' sumAvgNumber='123' sumAvgPercent='123' sumAvgType='123' numberSum='123' percentSum='123' typeSum="123" />
              <OperateItem typeText='转发' numberAvg='111' percentAvg='12' typeAvg='234' sumAvgNumber='123' sumAvgPercent='123' sumAvgType='123' numberSum='123' percentSum='123' typeSum="123" />
              <OperateItem typeText='评论' numberAvg='111' percentAvg='12' typeAvg='234' sumAvgNumber='123' sumAvgPercent='123' sumAvgType='123' numberSum='123' percentSum='123' typeSum="123" />
              <OperateItem typeText='播放' numberAvg='111' percentAvg='12' typeAvg='234' sumAvgNumber='123' sumAvgPercent='123' sumAvgType='123' numberSum='123' percentSum='123' typeSum="123" />
            </div>
          </div>
          <div className='right-composite'>
            <Composite />
          </div>
        </div>
      </div>
    );
  }
}
const HeadBox = ({ title, number, unit, percent, type, isLeft = false }) => {
  const unConfig = <UpDownPercentage percent={percent} type={type} isBackColor={true} />
  return <div className='head-box'>
    <div className={`${isLeft ? 'title-light' : 'title'}`}>{title}</div>
    <div className='head-box-flex'>
      <div className='number'>{number}</div>
      <div className='unit'>{unit}</div>
      {isLeft ? unConfig : ""}
    </div>
    {isLeft ? "" : unConfig}

  </div>
}
const ThreeBox = ({ title, number, percent, type, isBig = false, notPercent = false }) => {
  return <div className='three-avg-box' >
    <div className={notPercent ? 'big-title' : 'title'}>{title}</div>
    <div className={`${isBig ? 'big-number' : 'number'}`}>{number}</div>
    {notPercent ? null : <div className='down' >
      <UpDownPercentage percent={percent} type={type} />
    </div>}
  </div>
}
const OperateItem = ({ typeText, numberAvg, percentAvg, typeAvg, sumAvgNumber, sumAvgPercent, sumAvgType, numberSum, percentSum, typeSum }) => {
  const hoverHead = <HeadBox title='近30条视频均' isLeft={true} number={numberAvg} unit={'万'} percent={percentAvg} type={typeAvg} />

  return <div className='operate-item'>
    <div>{typeText}</div>
    <div className='back-box'>
      {typeText == '转发' ?
        <PopoverFormat
          text={<div>{hoverHead}</div>}
          content='低于同分类同价格近30条视频转发均值'
        />
        : hoverHead}
      <div className='avg-sum-flex'>
        <ThreeBox title='总平均' number={sumAvgNumber} percent={sumAvgPercent} type={sumAvgType} />
        <ThreeBox title='累计' number={numberSum} percent={percentSum} type={typeSum} />
      </div>
    </div>

  </div>
}

export default DataIndicator;
