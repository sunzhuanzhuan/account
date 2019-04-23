import React, { Component } from 'react'
import './AudienceAttribute.less'
import { CharTitle, PieChart, Landscape, HistogramLine, ChinaMap } from "./chart";
import numeral from 'numeral'
import { Empty } from 'antd';
class AudienceAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    console.log('受众属性数据加载啦啦啦啦')
    const { getAudienceAttribute, accountId, getQueryTgiList } = this.props
    getAudienceAttribute({ accountId: accountId })
    getQueryTgiList({ accountId: accountId })
  }
  render() {
    const { audienceAttributeInfo = {}, queryTgiList = {} } = this.props
    const {
      kolVisitorAgeDrawList,//年龄
      kolVisitorProvinceDrawList = [], //地域
      kolVisitorGenderDrawList //性别
    } = audienceAttributeInfo
    const {
      kolVisitorConsumptionDrawList,//消费能力
      kolVisitorOSDrawList, //设备
      kolVisitorInterestDrawList, //兴趣
    } = queryTgiList

    return (
      <div className='audience-attribute'>
        <div className='title-big'>受众属性</div>
        <div className='audience-attribute-charts'>
          <div className='left-three'>
            <div className='left-three-two'>
              <div className='one-line-item'>
                <CharTitle title='性别分布' />
                <PieChart data={kolVisitorGenderDrawList} />
              </div>
              <div className='one-line-item' >
                <CharTitle title='年龄分布' />
                <Landscape data={kolVisitorAgeDrawList} />
              </div>
            </div>
            <div className='two-line-item'>
              <CharTitle title='TGI' />
              <HistogramLine height={300} data={kolVisitorInterestDrawList}
                positionConfig='name*tgiValue'
                positionIntervalConfig='name*value'
                lineText='TGI'
                boxText='兴趣爱好'
                boxLeft={30}
                boxRight={70} />
            </div>

          </div>
          <div className='right-two'>
            <div className='right-two-item' >
              <CharTitle title='消费能力分布' />
              <PieChart data={kolVisitorConsumptionDrawList} isThree={true} />
            </div>
            <div className='right-two-equit'>
              <CharTitle title='设备分布' />
              <PieChart data={kolVisitorOSDrawList} />
            </div>
          </div>
        </div>
        {kolVisitorProvinceDrawList.length > 0 ? <div className='region-img'>

          <div className='china-map'>
            <CharTitle title='访问地区分布图' />
            <ChinaMap area={kolVisitorProvinceDrawList} />
          </div>
          <div className='ranking'>
            <CharTitle title='城市' />
            <div style={{ marginTop: 24 }}>
              <Rnking list={kolVisitorProvinceDrawList.slice(0, 6)} />
            </div>
          </div>
        </div> : <div className='region-img' style={{ display: 'block' }}>
            <CharTitle title='访问地区分布图' />
            <Empty style={{ height: 500, paddingTop: '20%' }} />
          </div>}
      </div >
    );
  }
}
const Rnking = ({ list = [] }) => {
  return list.map((one, index) => <div className='rnking-box' key={index}>
    <div className={index < 3 ? 'number-blue' : 'number-gray'}>{index + 1}</div>
    <div className={index < 3 ? 'city-name-blod' : 'city-name'}>{one.name}</div>
    <div className={index < 3 ? 'city-name-blod' : 'city-name'}>{numeral(one.value || 0).format('0.0%')}</div>
  </div>)
}
export default AudienceAttribute;
