import React, { useState, useEffect } from 'react'
import './ContentData.less'
import { CharTitle, DataBox } from "./chart";
import ButtonTab from '../base/ButtonTab'
import { formatWNumber } from "../util";
import api from '../../api'
import getQualityConfig, { keyToName } from '../constants/ContentQualityConfig'
import TopTenList from './TopTenList';
const dataFormate = (data = {}, type, day) => {
  const low = data[`media${type}Min${day}d`]
  const high = data[`media${type}Max${day}d`]
  const avg = data[`media${type}Avg${day}d`]
  const q1 = data[`media${type}LowerQuartileNum${day}d`]
  const q3 = data[`media${type}UpperQuartileNum${day}d`]
  return {
    x: `${day}天总视频`,
    low: low,
    q1: q1,
    median: data[`media${type}MedianNum${day}d`],
    q3: q3,
    high: high,
    textContent: `近${day}天视频：平均${type}量${formatWNumber(avg)}，数据集中分布在${formatWNumber(q1)} - ${formatWNumber(q3)}`,
    avg: avg,
    q3Lessq1: q3 - q1
  }
}
function ContentQuality(props) {
  const { platformId } = props
  const defaultKey = getQualityConfig(platformId).defaultKey
  const [dataBox, setDataBox] = useState({})
  const [checkedKey, setCheckedKey] = useState(defaultKey)
  useEffect(() => {
    getTrend()
  }, [])
  //获取趋势数据
  async function getTrend() {
    const { data } = await api.get(`/operator-gateway/accountDetail/v1/getTrend?accountId=${props.accountId}`)
    setDataBox({
      like: [dataFormate(data.boxContent, 'Like', 90), dataFormate(data.boxContent, 'Like', 28)],
      comment: [dataFormate(data.boxContent, 'Comment', 90), dataFormate(data.boxContent, 'Comment', 28)],
    })
  }
  function getContentMap() {
    let contentMap = {}
    getQualityConfig(platformId).quality.forEach(item => {
      contentMap[item.key] = <DataBox data={dataBox[item.key]} />
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
                buttonList={getQualityConfig(platformId).quality}
                onChange={(value) => setCheckedKey(value)}
                contentMap={getContentMap()}
              />
            </div>
            <RightDecide data={dataBox[checkedKey]} type={keyToName[checkedKey]} />
          </div>
          {/* 近10条数据 */}
          <TopTenList accountId={props.accountId} platformId={props.platformId} />
        </div>
      </div>
    </div>
  )
}

export default ContentQuality
const RightDecide = ({ data = [], type }) => {
  const data90 = data[0] || {}
  const data28 = data[1] || {}
  //箱子图文案判断
  const avgText = (data28.avg || 0) > (data90.avg || 0) ? '上升' : '下降'
  const q3Lessq1Text = (data28.q3Lessq1 || 0) < (data90.q3Lessq1 || 0) ? '更趋于稳定' : '波动性更大'
  return <div className='right-decide' >< div >
    <div className='right-title'><a>箱线图分析说明</a></div>
    <div className='left-content'>
      <p>内容表现</p>
      <div>近90天视频：平均{type}量{formatWNumber(data90.avg)}，
      数据集中分布在{formatWNumber(data90.q1)} - {formatWNumber(data90.q3)}
      </div>
      <div>近28天视频：平均{type}量{formatWNumber(data28.avg)}，
      数据集中分布在{formatWNumber(data28.q1)} - {formatWNumber(data28.q3)}
      </div>
    </div>
    <div className='left-content '>
      <p>趋势说明</p>
      <div>1.近期内容整体质量{avgText} </div>
      <div>2.视频的内容质量的{q3Lessq1Text}</div>
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
