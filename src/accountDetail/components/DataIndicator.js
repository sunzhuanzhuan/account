import React, { Component } from 'react'
import TitleAndDecide from "../base/TitleAndDecide";
import UpDownPercentage from "../base/UpDownPercentage";
import './DataIndicator.less'
import { Icon } from 'antd';
class DataIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='data-indicator'>
        <TitleAndDecide text='数据指标' />
        <div className='fan-release'>
          <div className='fan-release-item'>
            <div>
              <HeadBox title={'总粉丝数'} number={123123} unit={'万'} percent={33} type={'up'} />
            </div>
            <div className='rate-number'>
              <div className='rate-number-item'>
                <div>粉丝互动率 </div>
                <div className='rate-number-flex'>
                  <div>57%</div>
                  <UpDownPercentage type='up' percent='9' />
                </div>
              </div>
              <div className='rate-number-item'>
                <div>粉丝互动数</div>
                <div className='rate-number-flex'>
                  <div>1231</div>
                  <UpDownPercentage type='up' percent='19' />
                </div>
              </div>
            </div>
          </div>
          <div className='fan-release-item'>
            <div>
              <HeadBox title={'总发布数'} number={123123} unit={'万'} percent={33} type={'up'} />
            </div>
            <div className='rate-number'>
              <div className='rate-number-item'>
                <div>90天发布数 </div>
                <div>30条</div>
              </div>
              <div className='rate-number-item'>
                <div>28天粉丝增长率</div>
                <div>48%</div>
              </div>
            </div>
          </div>
        </div>
        <div className='operate-four'>
          <OperateItem icon='heart' typeText='点赞' numberAvg='111' percentAvg='12' typeAvg='234' sumAvgNumber='123' sumAvgPercent='123' sumAvgType='123' numberSum='123' percentSum='123' typeSum="123" />
          <OperateItem icon='heart' typeText='点赞' numberAvg='111' percentAvg='12' typeAvg='234' sumAvgNumber='123' sumAvgPercent='123' sumAvgType='123' numberSum='123' percentSum='123' typeSum="123" />
          <OperateItem icon='heart' typeText='点赞' numberAvg='111' percentAvg='12' typeAvg='234' sumAvgNumber='123' sumAvgPercent='123' sumAvgType='123' numberSum='123' percentSum='123' typeSum="123" />
          <OperateItem icon='heart' typeText='点赞' numberAvg='111' percentAvg='12' typeAvg='234' sumAvgNumber='123' sumAvgPercent='123' sumAvgType='123' numberSum='123' percentSum='123' typeSum="123" />
        </div>
      </div>
    );
  }
}
const HeadBox = ({ title, number, unit, percent, type }) => {
  return <div className='head-box'>
    <div className='title'>{title}</div>
    <div className='head-box-flex'>
      <div className='number'>{number}</div>
      <div className='unit'>{unit}</div>
      <UpDownPercentage percent={percent} type={type} />
    </div>
  </div>
}
const ThreeBox = ({ title, number, percent, type, marginLeft }) => {
  return <div className='three-avg-box' >
    <div className='title'>{title}</div>
    <div className='number'>{number}</div>
    <UpDownPercentage percent={percent} type={type} />
  </div>
}
const OperateItem = ({ icon, typeText, numberAvg, percentAvg, typeAvg, sumAvgNumber, sumAvgPercent, sumAvgType, numberSum, percentSum, typeSum }) => {
  return <div className='operate-item'>
    <div><Icon type={icon} />{typeText}</div>
    <div className='back-box'>
      <HeadBox title='近30条视频均' number={numberAvg} unit={'万'} percent={percentAvg} type={typeAvg} />
      <div className='avg-sum-flex'>
        <ThreeBox title='总平均' number={sumAvgNumber} percent={sumAvgPercent} type={sumAvgType} />
        <ThreeBox title='累计' number={numberSum} percent={percentSum} type={typeSum} />
      </div>
    </div>

  </div>
}

export default DataIndicator;
