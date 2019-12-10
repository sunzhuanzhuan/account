import React, { useEffect, useState } from 'react'
import './ContentData.less'
import { CharTitle, CurveLine } from "./chart";
import ButtonTab from '../base/ButtonTab'
import api from '../../api'
import getTrendConfig from '../constants/DataTrendsConfig'
function DataTrendsVideo(props) {
  const [trendInfo, setTrendInfo] = useState({})
  useEffect(() => {
    getTrend()
  }, [])
  //获取趋势数据
  async function getTrend() {
    const { data } = await api.get(`/operator-gateway/accountDetail/v1/getTrend?accountId=${props.accountId}`)
    setTrendInfo(data)
  }
  const { baseInfo = {} } = props
  const { base = {} } = baseInfo
  const { platformId } = base
  const trendConfig = getTrendConfig(platformId)
  function getContentMap() {
    let contentMap = {}
    trendConfig.trend.forEach(item => {
      const data = trendInfo[item.content.dataKey]
      contentMap[item.key] = <div className='content-char'>
        <CharTitle title={item.content.title} content={item.content.content} />
        <CurveLine data={data}
          {...item.content}
        />
      </div>
    });
    return contentMap
  }
  return (
    <div className='content-data'>
      <div className='title-big' >数据趋势</div>
      <div className='content-char'>
        <ButtonTab
          buttonList={trendConfig.trend}
          contentMap={getContentMap()}
        />
      </div>
    </div>
  )
}
export default DataTrendsVideo

