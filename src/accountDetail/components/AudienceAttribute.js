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
    const { getAudienceAttribute, accountId } = this.props
    getAudienceAttribute({ accountId: accountId })
  }
  render() {
    const { audienceAttributeInfo = {} } = this.props
    const {
      kolVisitorAgeDrawList,//年龄
      kolVisitorProvinceDrawList = [], //地域
      kolVisitorGenderDrawList,//性别
      kolVisitorConsumptionDraw,//消费能力
      kolVisitorOsDraw, //设备
      kolVisitorOsPriceDraw,//手机价格
      kolVisitorInterestDrawList, //兴趣
      kolVisitorBehaviorWeekDraw, //活跃时间分布 -- 天（新增
      kolVisitorBehaviorHourDraw,//活跃时间分布 （新增）
      kolVisitorAppDraw,//App Top10
      kolProvinceLevelDraw
    } = audienceAttributeInfo

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
              <RingPie data={kolVisitorConsumptionDraw} padding={[70]} />
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
                1: <CityTable list={kolProvinceLevelDraw} />,
                2: <div>
                  <div className='city-top-title'>城市Top10</div>
                  <CityTable list={kolVisitorProvinceDrawList.slice(0, 10)} />
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
            positionConfig='name*value'
            textTitle='TGI' />
        </div>

        <div className='flex-between flex1-right-white mt20 '>
          <div className='flex4'>
            <div className=''>
              <CharTitle title='手机系统分布' />
              <RingPie data={kolVisitorOsDraw} height={240} padding={[30]} isOneLine={true} />
            </div>
            <div className=''>
              <CharTitle title='手机价格分布' />
              <RingPie data={kolVisitorOsPriceDraw} height={240} padding={[30]} isOneLine={true} />
            </div>
          </div>
          <div className='flex7'>
            <CharTitle title='App偏好TOP10' content='为体现用户特征，排行中去掉了一些大众化的常用app' />
            <LandscapeType data={kolVisitorAppDraw} />
          </div>
        </div>
        <div className='flex1-right-white mt20'>
          <CharTitle title='粉丝活跃' />
          <div className='fans-line-two'>
            <div className='fans-line-item'>
              <Histogram
                height={400}
                data={kolVisitorBehaviorHourDraw}
                positionConfig='name*value'
                textTitle='活跃时间分布 -- 天'
              />
            </div>
            <div className='fans-line-item'>
              <Histogram
                height={400}
                data={kolVisitorBehaviorWeekDraw}
                positionConfig='name*value'
                textTitle='活跃时间分布 -- 周'
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
    <div className={index < 3 ? 'city-name-blod percent-width' : 'city-name percent-width'}>{numeral(one.value || 0).format('0.0%')}</div>
    <div className={index < 3 ? 'city-name-blod percent-width' : 'city-name percent-width'}>{one.tgiValue}</div>
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

const CityTable = ({ type, list = [] }) => {

  const columns = [
    {
      title: type == 1 ? '城市县级' : '城市',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '占比',
      dataIndex: 'value',
      key: 'value',
      render: (text) => {
        return <div>{numeral(text).format('0.0%')}</div>
      }
    },
    {
      title: 'TGI',
      dataIndex: 'tgiValue',
      key: 'tgiValue',
      render: (text) => {
        return <div>{numeral(text).format('0.0')}</div>
      }
    },
  ];



  return <div className='city-table'>
    {columns.map(one => {
      return <div key={one.key} >
        <div className='title'>{one.title}</div>
        {list.map((item, index) => {
          return <div key={index} className='content'>{one.render ? one.render(item[one.dataIndex]) : item[one.dataIndex]}</div>
        })}
      </div>
    })}
  </div>
}
export default AudienceAttribute;
