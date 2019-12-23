import React, { useState, useEffect } from 'react'
import './ContentData.less'
import { CharTitle, DataBox } from "./chart";
import ButtonTab from '../base/ButtonTab'
import { formatWNumber } from "../util";
import api from '../../api'
import getQualityConfig, { keyToName } from '../constants/ContentQualityConfig'
import TopTenList from './TopTenList';
import AccountHabits from './AccountHabits'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

function ContentQuality(props) {
  const searchParam = qs.parse(props.location.search.substring(1))
  const defaultKey = getQualityConfig(searchParam.platformId).defaultKey
  const [dataBox, setDataBox] = useState({})
  const [checkedKey, setCheckedKey] = useState(defaultKey)
  useEffect(() => {
    getTrend()
  }, [])
  //获取趋势数据
  async function getTrend() {
    const { data } = await api.get(`/operator-gateway/accountDetail/v1/getContentQuality${props.location.search}`)
    setDataBox(data)
  }
  function getContentMap() {
    let contentMap = {}
    const config = getQualityConfig(searchParam.platformId)
    config.quality.forEach(item => {
      contentMap[item.key] = <DataBox data={dataBox[item.key]} afterText={config.afterText} />
    });
    return contentMap
  }
  return (
    <div>
      <div className='content-data'>
        <div className='title-big' >内容质量</div>
        <div className='content-char'>
          <CharTitle title='内容数据箱线图' />
          <div className='last-box-decide'>
            <div className='data-box-left'>
              <ButtonTab
                buttonList={getQualityConfig(searchParam.platformId).quality}
                onChange={(value) => setCheckedKey(value)}
                contentMap={getContentMap()}
              />
            </div>
            <RightDecide data={dataBox[checkedKey]} type={keyToName[checkedKey]} />
          </div>
          {/* 近10条数据 */}
          <TopTenList accountId={props.accountId} platformId={props.platformId} />
          {searchParam.groupType == 3 ? null : <AccountHabits />}
        </div>
      </div>
    </div>
  )
}

export default withRouter(ContentQuality)
const RightDecide = ({ data = [], type }) => {
  const data90 = data[0] || {}
  const data28 = data[1] || {}
  //箱子图文案判断
  const avgText = (data28.avg || 0) > (data90.avg || 0) ? '上升' : '下降'
  const upperQuartileLesslowerQuartileText = ((data28.upperQuartile - data28.lowerQuartile) || 0) < ((data90.upperQuartile - data90.lowerQuartile) || 0) ? '更趋于稳定' : '波动性更大'
  return <div className='right-decide' >< div >
    <div className='right-title'><a>箱线图分析说明</a></div>
    <div className='left-content'>
      <p>内容表现</p>
      <div>近90天视频：平均{type}量{formatWNumber(data90.avg)}，
      数据集中分布在{formatWNumber(data90.lowerQuartile)} - {formatWNumber(data90.upperQuartile)}
      </div>
      <div>近28天视频：平均{type}量{formatWNumber(data28.avg)}，
      数据集中分布在{formatWNumber(data28.lowerQuartile)} - {formatWNumber(data28.upperQuartile)}
      </div>
    </div>
    <div className='left-content '>
      <p>趋势说明</p>
      <div>1.近期内容整体质量{avgText} </div>
      <div>2.视频的内容质量的{upperQuartileLesslowerQuartileText}</div>
    </div>
  </div >
  </div>
}
const DecideBox = ({ img, leftText, middleText, middleText2, rightText }) => {
  return <div className='decide-box' >
    <div className='img-box'>
      <img width='100' src={require(`./img/${img}.png`)} />
    </div>
    <div className='text'>
      <span className='small-text'>箱体{leftText}</span>
      <span className='big-text'>{middleText}</span>
      <span className='small-text'>{middleText2}，代表博主</span>
      <span className='big-text'>内容质量{rightText}</span>
    </div>
  </div>
}
