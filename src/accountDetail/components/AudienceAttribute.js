import React, { Component } from 'react'
import './AudienceAttribute.less'
import { CharTitle, PieChart, Landscape, HistogramLine, ChinaMap } from "./chart";
class AudienceAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    console.log('受众属性数据加载啦啦啦啦')
    this.props.getAudienceAttribute()
  }
  render() {
    const { audienceAttributeInfo = {} } = this.props
    return (
      <div className='audience-attribute'>
        <div className='title-big'>受众属性</div>
        <div className='audience-attribute-charts'>
          <div className='left-three'>
            <div className='left-three-two'>
              <div className='one-line-item'>
                <CharTitle title='性别分布' />
                <PieChart data={audienceAttributeInfo.sex} />
              </div>
              <div className='one-line-item' >
                <CharTitle title='年龄分布' />
                <Landscape data={audienceAttributeInfo.age} />
              </div>
            </div>
            <div className='two-line-item'>
              <CharTitle title='TGL' />
              <HistogramLine height={300} data={audienceAttributeInfo.tgl} positionConfig='dateRange*call' lineText='TGL' boxText='兴趣爱好' />
            </div>

          </div>
          <div className='right-two'>
            <div className='right-two-item' >
              <CharTitle title='消费能力分布' />
              <PieChart data={audienceAttributeInfo.spendingPower} isThree={true} />
            </div>
            <div className='right-two-equit'>
              <CharTitle title='设备分布' />
              <PieChart data={audienceAttributeInfo.equipment} />
            </div>
          </div>
        </div>
        <div className='region-img'>
          <div className='china-map'>
            <CharTitle title='访问地区分布图' />
            <ChinaMap />
          </div>
          <div className='ranking'>
            <CharTitle title='城市' />
            <div style={{ marginTop: 24 }}>
              <Rnking list={[
                { name: '北京', value: '23123' },
                { name: '北京', value: '23123' },
                { name: '北京', value: '23123' },
                { name: '北京', value: '23123' },
                { name: '北京', value: '23123' }]} />
            </div>
          </div>
        </div>
      </div >
    );
  }
}
const Rnking = ({ list = [] }) => {
  return list.map((one, index) => <div className='rnking-box' key={index}>
    <div className={index < 3 ? 'number-blue' : 'number-gray'}>{index + 1}</div>
    <div className={index < 3 ? 'city-name-blod' : 'city-name'}>{one.name}</div>
    <div className={index < 3 ? 'city-name-blod' : 'city-name'}>{one.value}</div>
  </div>)
}
export default AudienceAttribute;
