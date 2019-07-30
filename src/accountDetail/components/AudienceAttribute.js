import React, { Component } from 'react'
import './AudienceAttribute.less'

import { CharTitle, LandscapeType, Landscape, Histogram, HistogramLine, ChinaMap, RingPie } from "./chart";
import numeral from 'numeral'
import ButtonTab from '../base/ButtonTab'
import { Empty, Progress } from 'antd';
class AudienceAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
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
        <div className='title-big'>受众属性<span style={{ fontSize: 13, color: '#999', fontWeight: 'none' }}>（数据取活跃粉丝分布数据）</span></div>
        <div className='audience-attribute-charts'>
          <div className='flex-between  flex1-right-white'>
            <div className='age-sex-gender' >
              <CharTitle title='年龄分布' />
              <HistogramLine data={kolVisitorAgeDrawList}
                positionConfig='name*tgiValue'
                height={260}
                positionIntervalConfig='name*value'
                lineText='TGI'
                boxText='占比'
                boxLeft={40}
                boxRight={40} />
            </div>
            <div className='age-sex-gender'>
              <CharTitle title='性别分布' />
              <RingPie data={kolVisitorGenderDrawList} padding={[70]} />
            </div>
            <div className='age-sex-gender' >
              <CharTitle title='消费能力分布' />
              <RingPie data={kolVisitorGenderDrawList} padding={[70]} />
            </div>
          </div>


        </div>
        {kolVisitorProvinceDrawList.length > 0 ? <div className='region-img'>
          <div className='china-map'>
            <CharTitle title='访问地区分布图' />
            <ChinaMap area={kolVisitorProvinceDrawList} />
          </div>
          <div className='ranking'>
            <ButtonTab buttonList={[{ key: 1, name: '城市线级' }, { key: 2, name: '城市排行' }]}
              contentMap={{
                1: <CityTable />,
                2: <div style={{ marginTop: 24 }}>
                  <Rnking list={kolVisitorProvinceDrawList.slice(0, 6)} />
                </div>
              }}
            />
          </div>
        </div> : <div className='region-img' style={{ display: 'block' }}>
            <CharTitle title='访问地区分布图' />
            <Empty style={{ height: 500, paddingTop: '20%' }} />
          </div>}

        <div className='flex1-right-white mt20'>
          <CharTitle title='粉丝兴趣' />
          <Histogram height={400}
            data={kolVisitorInterestDrawList}
            positionConfig='name*tgiValue'
            textTitle='TGI' />
        </div>

        <div className='flex-between flex1-right-white mt20 '>
          <div className='flex4'>
            <div className=''>
              <CharTitle title='手机系统分布' />
              <RingPie data={kolVisitorOSDrawList} height={240} />
            </div>
            <div className=''>
              <CharTitle title='手机价格分布' />
              <RingPie data={kolVisitorOSDrawList} height={240} />
            </div>
          </div>
          <div className='flex7'>
            <CharTitle title='App偏好TOP10' content='为体现用户特征，排行中去掉了一些大众化的常用app' />
            <LandscapeType data={kolVisitorAgeDrawList} />
          </div>
        </div>
        <div className='flex1-right-white mt20'>
          <CharTitle title='粉丝活跃' />
          <div className='fans-line-two'>
            <div className='fans-line-item'>
              <Histogram
                height={400}
                data={kolVisitorAgeDrawList}
                positionConfig='name*value'
                textTitle='活跃活跃时间分布 -- 天'
              />
            </div>
            <div className='fans-line-item'>
              <Histogram
                height={400}
                data={kolVisitorAgeDrawList}
                positionConfig='name*value'
                textTitle='活跃活跃时间分布 -- 周'
              />
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
    <div className={index < 3 ? 'city-name-blod' : 'city-name'}>{numeral(one.value || 0).format('0.0%')}</div>
  </div>)
}

const SexList = ({ list = [] }) => {
  return <div className='sex-list'>
    {list.map((one, index) => {
      const girl = index == 1
      return <div key={one.name}>
        <div className='sex-item'>
          <Progress type="circle" percent={one.value * 100} format={() => <div>男</div>} />
        </div>
        <div className='sex-name'>{girl ? '女' : '男'}性用户</div>
        <div className='sex-data'>
          <div>占比：</div>
          <div>{numeral(one.value).format('0%')}</div>
        </div>
        <div className='sex-data'>
          <div>TGI：</div>
          <div>126</div>
        </div>
      </div>
    })}
  </div>
}

const CityTable = ({ list = [{ name: '北京', age: 22 }, { name: '北京', age: 32 }] }) => {

  const columns = [
    {
      title: '城市县级',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '占比',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'TGI',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  return <div className='city-table'>
    {columns.map(one => {
      return <div key={one.key} >
        <div className='title'>{one.title}</div>
        {list.map((item, index) => {
          return <div key={index} className='content'>{item[one.dataIndex]}</div>
        })}
      </div>
    })}
  </div>
}
export default AudienceAttribute;
