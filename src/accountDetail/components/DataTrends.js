import React, { useEffect, useState } from 'react'
import './ContentData.less'
import { CharTitle, CurveLine } from "./chart";
import ButtonTab from '../base/ButtonTab'
import api from '../../api'
import getTrendConfig from '../constants/DataTrendsConfig'
import { withRouter } from 'react-router-dom'
import qs from 'qs'
function DataTrendsVideo(props) {
  const [trendInfo, setTrendInfo] = useState({})
  useEffect(() => {
    getTrend()
  }, [])
  //获取趋势数据
  async function getTrend() {
    const { data } = await api.get(`/operator-gateway/accountDetail/v1/getTrend${props.location.search}`)
    setTrendInfo(data)
  }
  const searchParam = qs.parse(props.location.search.substring(1))
  const trendConfig = getTrendConfig(searchParam.platformId)
  function getContentMap() {
    let contentMap = {}
    trendConfig.trend.forEach(item => {
      const data = trendInfo ? trendInfo[item.content.dataKey] : []
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
export default withRouter(DataTrendsVideo)

